/**
 * Inline body image migration script
 *
 * Finds <img> URLs inside WordPress post content that were imported as
 * Portable Text, downloads each image, uploads it to Sanity, and rewrites
 * the URL references in the body blocks so they survive the WP cutover.
 *
 * Usage:
 *   node scripts/migrate-inline-images.mjs
 */

import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
import { JSDOM } from "jsdom";

function loadEnv() {
  try {
    const raw = readFileSync(".env.local", "utf-8");
    for (const line of raw.split("\n")) {
      const [key, ...rest] = line.split("=");
      if (key && rest.length) process.env[key.trim()] = rest.join("=").trim();
    }
  } catch {}
}
loadEnv();

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const WP_BASE = "https://www.landlif.is/wp-json/wp/v2";

// ── Fetch WP posts with full content ─────────────────────────────────────────
async function fetchWpPosts() {
  const res = await fetch(
    `${WP_BASE}/posts?per_page=100&_fields=id,slug,content`
  );
  return res.json();
}

// ── Extract inline image URLs from HTML ───────────────────────────────────────
function extractInlineImages(html) {
  if (!html) return [];
  const doc = new JSDOM(html).window.document;
  return [...doc.querySelectorAll("img")]
    .map((img) => img.src)
    .filter((src) => src?.startsWith("http"));
}

// ── Strip query params to get clean URL ──────────────────────────────────────
function cleanUrl(url) {
  return url.split("?")[0];
}

function contentTypeFromUrl(url) {
  const ext = cleanUrl(url).split(".").pop()?.toLowerCase();
  const map = { jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png", gif: "image/gif", webp: "image/webp" };
  return map[ext] || "image/jpeg";
}

// ── Upload a URL to Sanity, return asset _ref ─────────────────────────────────
const uploadCache = {};
async function uploadImageUrl(url) {
  const key = cleanUrl(url);
  if (uploadCache[key]) return uploadCache[key];

  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} fetching ${url}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  const filename = key.split("/").pop() || "image.jpg";

  const asset = await client.assets.upload("image", buffer, {
    filename,
    contentType: contentTypeFromUrl(url),
  });

  uploadCache[key] = asset._id;
  return asset._id;
}

// ── Recursively walk Portable Text blocks and replace image URLs ──────────────
function rewriteUrlsInBlocks(blocks, urlToRef) {
  return blocks.map((block) => {
    // Portable Text image block with a url field (from htmlToBlocks)
    if (block._type === "image" && block.url && urlToRef[cleanUrl(block.url)]) {
      return {
        _type: "image",
        _key: block._key,
        asset: { _type: "reference", _ref: urlToRef[cleanUrl(block.url)] },
      };
    }
    // span marks with links pointing to images
    if (block.children) {
      return {
        ...block,
        children: block.children.map((child) => {
          if (child._type === "span") return child;
          return child;
        }),
      };
    }
    return block;
  });
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  console.log("\n📷  Starting inline image migration\n");

  console.log("Fetching WordPress posts…");
  const wpPosts = await fetchWpPosts();
  const wpBySlug = Object.fromEntries(wpPosts.map((p) => [p.slug, p]));

  console.log("Fetching Sanity posts with body…");
  const sanityPosts = await client.fetch(
    `*[_type == "newsPost"]{ _id, "slug": slug.current, body }`
  );

  // Find posts that have inline images in WP
  const targets = [];
  for (const sp of sanityPosts) {
    const wp = wpBySlug[sp.slug];
    if (!wp) continue;
    const imgs = extractInlineImages(wp.content?.rendered || "");
    if (imgs.length > 0) targets.push({ sanity: sp, imgs });
  }

  console.log(`\nFound ${targets.length} posts with inline images:\n`);
  targets.forEach((t) =>
    console.log(`  • ${t.sanity.slug} (${t.imgs.length} images)`)
  );

  // Collect all unique image URLs
  const allUrls = [...new Set(targets.flatMap((t) => t.imgs))];
  console.log(`\nUploading ${allUrls.length} unique images to Sanity…\n`);

  const urlToRef = {};
  for (const url of allUrls) {
    const clean = cleanUrl(url);
    const filename = clean.split("/").pop() || "image";
    process.stdout.write(`  • ${filename.slice(0, 50)}… `);
    try {
      const ref = await uploadImageUrl(url);
      urlToRef[clean] = ref;
      console.log("✓");
    } catch (err) {
      console.log("✗");
      console.error(`    ${err.message}`);
    }
  }

  // Now patch each Sanity post — replace image blocks that have a URL
  console.log("\nPatching Sanity posts…\n");
  let patched = 0;

  for (const { sanity } of targets) {
    if (!sanity.body?.length) continue;

    const newBody = rewriteUrlsInBlocks(sanity.body, urlToRef);
    const changed = JSON.stringify(newBody) !== JSON.stringify(sanity.body);

    if (!changed) {
      // Body images may be in marks/links — append them as image blocks after body
      // Build list of images that aren't already in the body
      const wp = wpBySlug[sanity.slug];
      const imgs = extractInlineImages(wp.content?.rendered || "");
      const uploadedImgs = imgs
        .map((url) => urlToRef[cleanUrl(url)])
        .filter(Boolean);

      if (uploadedImgs.length === 0) continue;

      // Append as image blocks at end of body
      const imageBlocks = uploadedImgs.map((ref) => ({
        _type: "image",
        _key: `img_${ref.replace("image-", "").slice(0, 8)}`,
        asset: { _type: "reference", _ref: ref },
      }));

      await client
        .patch(sanity._id)
        .set({ body: [...sanity.body, ...imageBlocks] })
        .commit();

      console.log(`  ✓ ${sanity.slug} (appended ${imageBlocks.length} images)`);
      patched++;
    } else {
      await client.patch(sanity._id).set({ body: newBody }).commit();
      console.log(`  ✓ ${sanity.slug} (inline refs rewritten)`);
      patched++;
    }
  }

  console.log(`\n─────────────────────────────`);
  console.log(`✅  Images uploaded: ${Object.keys(urlToRef).length}`);
  console.log(`✅  Posts patched:   ${patched}`);
  console.log(`─────────────────────────────\n`);
}

main().catch((err) => {
  console.error("\n❌", err.message);
  process.exit(1);
});
