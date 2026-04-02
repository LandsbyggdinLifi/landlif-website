import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Landlíf")
    .items([
      S.listItem()
        .title("Stillingar")
        .id("siteSettings")
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings")
        ),
      S.divider(),
      S.documentTypeListItem("newsPost").title("Fréttir"),
      S.documentTypeListItem("page").title("Síður"),
    ]);
