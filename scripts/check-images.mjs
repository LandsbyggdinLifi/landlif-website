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

async function fetchAllWpPosts() {
  const res = await fetch(`${WP_BASE}/posts?per_page=100&_fields=id,slug,content,featured_media`);
  return res.json();
}

function extractInlineImages(html) {
  if (!html) return [];
  const doc = new JSDOM(html).window.document;
  return [...doc.querySelectorAll("img")]
    .map((img) => img.src)
    .filter((src) => src && src.startsWith("http"));
}

async function main() {
  console.log("\n🔍 Checking for missing and recoverable images\n");

  const [sanityPosts, wpPosts] = await Promise.all([
    client.fetch(`*[_type == "newsPost"]{ _id, title, "slug": slug.current, mainImage, body }`),
    fetchAllWpPosts(),
  ]);

  const wpBySlug = Object.fromEntries(wpPosts.map((p) => [p.slug, p]));

  // 1. Posts missing a featured image but WP has one
  const missingFeatured = sanityPosts.filter((p) => {
    if (p.mainImage?.asset) return false;
    const wp = wpBySlug[p.slug];
    return wp && wp.featured_media > 0;
  });

  // 2. Posts missing a featured image and WP has none either
  const noImageAnywhere = sanityPosts.filter((p) => {
    if (p.mainImage?.asset) return false;
    const wp = wpBySlug[p.slug];
    return !wp || !wp.featured_media;
  });

  // 3. Inline images in WP post content
  const inlineImageMap = [];
  for (const wp of wpPosts) {
    const imgs = extractInlineImages(wp.content?.rendered || "");
    if (imgs.length > 0) {
      inlineImageMap.push({ slug: wp.slug, images: imgs });
    }
  }

  console.log("── Featured images ─────────────────────────────────");
  console.log(`✅  Posts with mainImage in Sanity: ${sanityPosts.filter(p => p.mainImage?.asset).length}`);

  if (missingFeatured.length > 0) {
    console.log(`\n⚠️  Posts missing mainImage but WP has one (${missingFeatured.length}):`);
    missingFeatured.forEach((p) => console.log(`   - ${p.slug}`));
  } else {
    console.log(`\n✅  No posts are missing a recoverable featured image`);
  }

  if (noImageAnywhere.length > 0) {
    console.log(`\nℹ️  Posts with no image anywhere (${noImageAnywhere.length}):`);
    noImageAnywhere.forEach((p) => console.log(`   - ${p.slug}`));
  }

  console.log("\n── Inline body images ──────────────────────────────");
  const totalInline = inlineImageMap.reduce((sum, p) => sum + p.images.length, 0);
  console.log(`📷  ${totalInline} inline images found across ${inlineImageMap.length} posts`);
  if (inlineImageMap.length > 0) {
    console.log("\n   These images still point to the old WordPress site.");
    console.log("   They will break when landlif.is is taken down.");
    inlineImageMap.slice(0, 5).forEach((p) => {
      console.log(`\n   ${p.slug} (${p.images.length} images):`);
      p.images.slice(0, 2).forEach((url) => console.log(`     ${url}`));
    });
    if (inlineImageMap.length > 5) console.log(`   … and ${inlineImageMap.length - 5} more posts`);
  }

  console.log("\n────────────────────────────────────────────────────\n");
}

main().catch((err) => {
  console.error("❌", err.message);
  process.exit(1);
});
