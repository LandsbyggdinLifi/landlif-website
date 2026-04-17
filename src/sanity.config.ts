import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemas";
import { structure } from "./sanity/structure";
import { apiVersion, dataset, projectId } from "./sanity/env";

const sectionTemplates = [
  { id: "page-samstarf-erlendis", title: "Samstarf Erlendis – ný síða", schemaType: "page", value: { section: "samstarf-erlendis" } },
  { id: "page-verkefni-erlendis", title: "Verkefni Erlendis – ný síða", schemaType: "page", value: { section: "verkefni-erlendis" } },
  { id: "page-samstarf-innanlands", title: "Samstarf Innanlands – ný síða", schemaType: "page", value: { section: "samstarf-innanlands" } },
  { id: "page-verkefni-innanlands", title: "Verkefni Innanlands – ný síða", schemaType: "page", value: { section: "verkefni-innanlands" } },
  { id: "page-fundargerdir", title: "Fundargerðir – ný síða", schemaType: "page", value: { section: "fundargerdir" } },
];

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  schema: {
    types: schemaTypes,
    templates: (prev) => [...prev, ...sectionTemplates],
  },
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
