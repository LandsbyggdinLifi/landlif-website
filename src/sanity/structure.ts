import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Landsbyggðin lifi")
    .items([
      S.listItem()
        .title("Stillingar")
        .id("siteSettings")
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings")
        ),
      S.listItem()
        .title("Um okkur")
        .id("page-um-okkur")
        .child(
          S.document().schemaType("page").documentId("page-um-okkur")
        ),
      S.divider(),
      S.documentTypeListItem("newsPost").title("Fréttir"),
    ]);
