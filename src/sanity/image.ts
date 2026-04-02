import { createImageUrlBuilder } from "@sanity/image-url";
import { dataset, projectId } from "./env";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const builder = createImageUrlBuilder({ projectId, dataset } as any);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  return builder.image(source);
}
