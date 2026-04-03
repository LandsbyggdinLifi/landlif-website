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
      S.listItem()
        .title("Samtökin")
        .child(
          S.list()
            .title("Samtökin")
            .items([
              S.listItem()
                .title("Markmið")
                .id("page-markmid")
                .child(
                  S.document().schemaType("page").documentId("page-markmid")
                ),
              S.listItem()
                .title("Lög")
                .id("page-log")
                .child(
                  S.document().schemaType("page").documentId("page-log")
                ),
              S.listItem()
                .title("Stjórn")
                .id("page-stjorn")
                .child(
                  S.document().schemaType("page").documentId("page-stjorn")
                ),
              S.listItem()
                .title("Félagsmenn")
                .id("page-felagsmenn")
                .child(
                  S.document().schemaType("page").documentId("page-felagsmenn")
                ),
            ])
        ),
      S.divider(),
      S.documentTypeListItem("newsPost").title("Fréttir"),
    ]);
