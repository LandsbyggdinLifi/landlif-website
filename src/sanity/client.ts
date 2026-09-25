import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "./env";

export const client = createClient({
  projectId: projectId || "placeholder",
  dataset,
  apiVersion,
  // Read from the live API rather than Sanity's edge CDN: Next.js already
  // caches pages (`revalidate` on each page), and the /api/revalidate webhook
  // clears that cache on publish. Skipping the CDN means a revalidation never
  // picks up a stale copy.
  useCdn: false,
});
