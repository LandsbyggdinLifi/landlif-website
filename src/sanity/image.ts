import { createImageUrlBuilder } from "@sanity/image-url";
import { dataset, projectId } from "./env";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const builder = createImageUrlBuilder({ projectId, dataset } as any);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  return builder.image(source);
}

// Returns a CSS objectPosition string based on Sanity hotspot data.
// Falls back to "center" if no hotspot is set.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function hotspotPosition(image?: { hotspot?: { x: number; y: number } }): string {
  if (!image?.hotspot) return "center";
  return `${image.hotspot.x * 100}% ${image.hotspot.y * 100}%`;
}
