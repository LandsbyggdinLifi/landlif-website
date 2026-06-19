import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "./env";

export const client = createClient({
  projectId: projectId || "placeholder",
  dataset,
  apiVersion,
  // Pre-launch: read live from the API (not the edge CDN) so published
  // changes show up immediately. Combined with `revalidate = 0` on pages,
  // every request fetches fresh. Revisit (CDN + ISR/webhook) before launch.
  useCdn: false,
});
