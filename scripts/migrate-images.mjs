/**
 * WordPress featured images → Sanity migration script
 *
 * Usage:
 *   node scripts/migrate-images.mjs
 *
 * Requires SANITY_API_TOKEN in .env.local (Editor role)
 */

import { createClient } from "@sanity/client";
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
    // rely on existing env
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
  process.exit(1);
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: "2024-01-01",
  token: TOKEN,
  useCdn: false,
});

// ── Fetch all WP posts with featured_media IDs ───────────────────────────────
async function fetchAllWpPosts() {
  const perPage = 100;
  let page = 1;
  let all = [];

  while (true) {
    const url = `${WP_BASE}/posts?per_page=${perPage}&page=${page}&_fields=id,slug,featured_media`;
    const res = await fetch(url);
    if (!res.ok) break;
    const posts = await res.json();
    if (!posts.length) break;
    all = all.concat(posts);
    const total = parseInt(res.headers.get("X-WP-Total") || "0");
    if (all.length >= total) break;
    page++;
  }

  return all;
}

// ── Fetch image URL for a media ID ───────────────────────────────────────────
const mediaCache = {};
async function getMediaUrl(mediaId) {
  if (mediaCache[mediaId] !== undefined) return mediaCache[mediaId];
  try {
    const res = await fetch(`${WP_BASE}/media/${mediaId}?_fields=source_url,media_details`);
    if (!res.ok) { mediaCache[mediaId] = null; return null; }
    const data = await res.json();
    const url =
      data.media_details?.sizes?.full?.source_url ||
      data.source_url ||
      null;
    mediaCache[mediaId] = url;
    return url;
  } catch {
    mediaCache[mediaId] = null;
    return null;
  }
}

// ── Extract featured image URL from post ─────────────────────────────────────
async function getFeaturedImageUrl(post) {
  if (!post.featured_media || post.featured_media === 0) return null;
  return getMediaUrl(post.featured_media);
}

// ── Download image as buffer ──────────────────────────────────────────────────
async function downloadImage(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  const arrayBuffer = await res.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

// ── Get content type from URL ─────────────────────────────────────────────────
function contentTypeFromUrl(url) {
  const ext = url.split("?")[0].split(".").pop()?.toLowerCase();
  const map = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    gif: "image/gif",
    webp: "image/webp",
    svg: "image/svg+xml",
  };
  return map[ext] || "image/jpeg";
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  console.log("\n🖼️  Starting featured image migration\n");

  console.log("Fetching WordPress posts with featured images…");
  const wpPosts = await fetchAllWpPosts();
  const withImages = wpPosts.filter((p) => p.featured_media > 0);
  console.log(
    `✓ ${wpPosts.length} total posts, ${withImages.length} have featured images\n`
  );

  // Fetch all Sanity posts to match by slug
  console.log("Fetching Sanity posts…");
  const sanityPosts = await client.fetch(
    `*[_type == "newsPost"]{ _id, "slug": slug.current, mainImage }`
  );
  const sanityBySlug = Object.fromEntries(sanityPosts.map((p) => [p.slug, p]));
  console.log(`✓ ${sanityPosts.length} posts in Sanity\n`);

  const alreadyHasImage = sanityPosts.filter((p) => p.mainImage?.asset).length;
  if (alreadyHasImage > 0) {
    console.log(`⏭  ${alreadyHasImage} posts already have a mainImage — skipping those\n`);
  }

  let success = 0;
  let skipped = 0;
  let failed = 0;

  for (const wpPost of withImages) {
    const sanityPost = sanityBySlug[wpPost.slug];
    if (!sanityPost) {
      skipped++;
      continue;
    }
    // Skip if already has an image
    if (sanityPost.mainImage?.asset) {
      skipped++;
      continue;
    }

    const imageUrl = await getFeaturedImageUrl(wpPost);
    if (!imageUrl) { skipped++; continue; }
    const filename = imageUrl.split("/").pop()?.split("?")[0] || "image.jpg";

    process.stdout.write(`  • ${filename.slice(0, 50)}… `);

    try {
      const buffer = await downloadImage(imageUrl);
      const contentType = contentTypeFromUrl(imageUrl);

      // Upload to Sanity
      const asset = await client.assets.upload("image", buffer, {
        filename,
        contentType,
      });

      // Patch the newsPost with the uploaded image
      await client
        .patch(sanityPost._id)
        .set({
          mainImage: {
            _type: "image",
            asset: {
              _type: "reference",
              _ref: asset._id,
            },
          },
        })
        .commit();

      console.log("✓");
      success++;
    } catch (err) {
      console.log("✗");
      console.error(`    Error: ${err.message}`);
      failed++;
    }
  }

  console.log(`\n─────────────────────────────`);
  console.log(`✅  Imported:  ${success} images`);
  console.log(`⏭   Skipped:   ${skipped} (no match or already had image)`);
  if (failed > 0) console.log(`❌  Failed:    ${failed}`);
  console.log(`─────────────────────────────\n`);
}

main().catch((err) => {
  console.error("\n❌ Migration failed:", err.message);
  process.exit(1);
});
