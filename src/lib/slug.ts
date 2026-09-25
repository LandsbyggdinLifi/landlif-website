/**
 * Next.js can hand a page component its dynamic `slug` param still
 * percent-encoded (e.g. "samstarfsa%C3%B0ila") while generateMetadata gets it
 * decoded. Slugs containing non-ASCII characters then fail to match Sanity and
 * the page 404s, so always decode before querying.
 */
export function decodeSlug(slug: string): string {
  try {
    return decodeURIComponent(slug);
  } catch {
    return slug;
  }
}
