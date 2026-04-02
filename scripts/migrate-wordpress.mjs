/**
 * WordPress → Sanity migration script
 *
 * Usage:
 *   node scripts/migrate-wordpress.mjs
 *
 * Requires SANITY_API_TOKEN in .env.local (Editor role)
 */

import { createClient } from "@sanity/client";
import { htmlToBlocks } from "@sanity/block-tools";
import { Schema } from "@sanity/schema";
import { JSDOM } from "jsdom";
import { readFileSync } from "fs";

// ── Load .env.local ───────────────────────────────────────────────────────────
function loadEnv() {
  try {
    const raw = readFileSync(".env.local", "utf-8");
    for (const line of raw.split("\n")) {
      const [key, ...rest] = line.split("=");
      if (key && rest.length) process.env[key.trim()] = rest.join("=").trim();
    }
  } catch {
    // no .env.local — rely on existing env
  }
}
loadEnv();

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const TOKEN = process.env.SANITY_API_TOKEN;
const WP_BASE = "https://www.landlif.is/wp-json/wp/v2";

if (!PROJECT_ID) {
  console.error("❌  Missing NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local");
  process.exit(1);
}
if (!TOKEN) {
  console.error("❌  Missing SANITY_API_TOKEN in .env.local");
  console.error(
    "   Go to sanity.io/manage → your project → API → Tokens → Add API Token (Editor)"
  );
  process.exit(1);
}

// ── Sanity client ─────────────────────────────────────────────────────────────
const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: "2024-01-01",
  token: TOKEN,
  useCdn: false,
});

// ── Block content schema for htmlToBlocks ─────────────────────────────────────
const schema = Schema.compile({
  name: "migration",
  types: [
    {
      type: "object",
      name: "post",
      fields: [
        {
          name: "body",
          type: "array",
          of: [{ type: "block" }],
        },
      ],
    },
  ],
});
const blockContentType = schema
  .get("post")
  .fields.find((f) => f.name === "body").type;

// ── Fetch all WordPress posts (paginated) ─────────────────────────────────────
async function fetchAllPosts() {
  const perPage = 100;
  let page = 1;
  let all = [];

  while (true) {
    const url = `${WP_BASE}/posts?per_page=${perPage}&page=${page}&_fields=id,slug,title,content,excerpt,date,status`;
    console.log(`  Fetching page ${page}…`);
    const res = await fetch(url);
    if (!res.ok) break;

    const posts = await res.json();
    if (!posts.length) break;

    all = all.concat(posts);
    const total = parseInt(res.headers.get("X-WP-Total") || "0");
    console.log(`  Got ${all.length}/${total} posts`);

    if (all.length >= total) break;
    page++;
  }

  return all;
}

// ── Convert HTML to Portable Text ─────────────────────────────────────────────
function htmlToPortableText(html) {
  if (!html) return [];
  try {
    return htmlToBlocks(html, blockContentType, {
      parseHtml: (h) => new JSDOM(h).window.document,
    });
  } catch {
    // Fallback: plain text paragraph
    const text = new JSDOM(html).window.document.body.textContent?.trim() || "";
    if (!text) return [];
    return [
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text }],
        markDefs: [],
      },
    ];
  }
}

// ── Strip HTML tags (for excerpt) ─────────────────────────────────────────────
function stripHtml(html) {
  return (
    new JSDOM(html || "").window.document.body.textContent?.trim() || ""
  );
}

// ── Check for existing posts (avoid duplicates) ───────────────────────────────
async function getExistingSlugs() {
  const existing = await client.fetch(
    `*[_type == "newsPost"]{ "slug": slug.current }`
  );
  return new Set(existing.map((p) => p.slug));
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  console.log("\n🚀 Starting WordPress → Sanity migration\n");
  console.log("Fetching posts from WordPress…");
  const wpPosts = await fetchAllPosts();
  console.log(`\n✓ Fetched ${wpPosts.length} WordPress posts\n`);

  console.log("Checking existing Sanity posts…");
  const existingSlugs = await getExistingSlugs();
  console.log(`  ${existingSlugs.size} posts already in Sanity\n`);

  const toImport = wpPosts.filter(
    (p) => !existingSlugs.has(p.slug) && p.status === "publish"
  );
  console.log(`📦 Importing ${toImport.length} new posts…\n`);

  let success = 0;
  let failed = 0;

  for (const post of toImport) {
    const slug = post.slug;
    const title = post.title?.rendered || slug;

    try {
      process.stdout.write(`  • ${title.slice(0, 60)}… `);

      const body = htmlToPortableText(post.content?.rendered || "");
      const excerpt = stripHtml(post.excerpt?.rendered || "").slice(0, 300);

      const doc = {
        _type: "newsPost",
        _id: `wp-${post.id}`,
        title,
        slug: { _type: "slug", current: slug },
        publishedAt: post.date
          ? new Date(post.date).toISOString()
          : new Date().toISOString(),
        excerpt: excerpt || undefined,
        body,
      };

      await client.createOrReplace(doc);
      console.log("✓");
      success++;
    } catch (err) {
      console.log("✗");
      console.error(`    Error: ${err.message}`);
      failed++;
    }
  }

  console.log(`\n─────────────────────────────`);
  console.log(`✅  Imported:  ${success} posts`);
  if (existingSlugs.size > 0)
    console.log(`⏭   Skipped:   ${existingSlugs.size} (already existed)`);
  if (failed > 0) console.log(`❌  Failed:    ${failed} posts`);
  console.log(`─────────────────────────────\n`);
}

main().catch((err) => {
  console.error("\n❌ Migration failed:", err.message);
  process.exit(1);
});
