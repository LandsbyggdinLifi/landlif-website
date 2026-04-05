import type { StructureResolver } from "sanity/structure";

function singleton(S: Parameters<StructureResolver>[0], title: string, id: string) {
  return S.listItem().title(title).id(id).child(
    S.document().schemaType("page").documentId(id)
  );
}

function dynamicList(
  S: Parameters<StructureResolver>[0],
  title: string,
  id: string,
  section: string
) {
  return S.listItem()
    .title(title)
    .id(id)
    .child(
      S.documentList()
        .title(title)
        .filter(`_type == "page" && section == "${section}"`)
        .defaultOrdering([{ field: "_createdAt", direction: "asc" }])
    );
}

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Landsbygg\u00F0in lifi")
    .items([
      S.listItem().title("Fors\u00ED\u00F0a").id("siteSettings").child(
        S.document().schemaType("siteSettings").documentId("siteSettings")
      ),
      singleton(S, "Um okkur", "page-um-okkur"),
      S.divider(),

      // Samtökin
      S.listItem().title("Samt\u00F6kin").child(
        S.list().title("Samt\u00F6kin").items([
          singleton(S, "Markmi\u00F0", "page-markmid"),
          singleton(S, "L\u00F6g", "page-log"),
          S.listItem().title("Stj\u00F3rn og f\u00E9lagsmenn").id("samtokinSettings").child(
            S.document().schemaType("samtokinSettings").documentId("samtokinSettings")
          ),
        ])
      ),

      // Starfið
      S.listItem().title("Starfi\u00F0").child(
        S.list().title("Starfi\u00F0").items([
          singleton(S, "Stefnum\u00F6rkun", "page-starfid-stefnumorkun"),

          // Samstarf Erlendis
          S.listItem().title("Samstarf Erlendis").child(
            S.list().title("Samstarf Erlendis").items([
              singleton(S, "Yfirlit", "page-starfid-erlent-samstarf"),
              singleton(S, "Erlend verkefni", "page-starfid-erlend-verkefni"),
              singleton(S, "European Rural Parliament", "page-starfid-erp"),
              singleton(S, "Fi\u00F0rildaverkefni\u00F0", "page-starfid-fidrildaverkefnid"),
              singleton(S, "Finnskaverkefni\u00F0", "page-starfid-finnskaverkefnid"),
              singleton(S, "Hela norden skal leva", "page-starfid-hela-norden"),
              S.divider(),
              dynamicList(S, "N\u00fdjar undirs\u00ed\u00f0ur", "samstarf-erlendis-dynamic", "samstarf-erlendis"),
            ])
          ),

          // Verkefni Erlendis
          S.listItem().title("Verkefni Erlendis").child(
            S.list().title("Verkefni Erlendis").items([
              dynamicList(S, "Verkefni", "verkefni-erlendis-dynamic", "verkefni-erlendis"),
            ])
          ),

          // Samstarf Innanlands
          S.listItem().title("Samstarf Innanlands").child(
            S.list().title("Samstarf Innanlands").items([
              dynamicList(S, "Samstarf", "samstarf-innanlands-dynamic", "samstarf-innanlands"),
            ])
          ),

          // Verkefni Innanlands
          S.listItem().title("Verkefni Innanlands").child(
            S.list().title("Verkefni Innanlands").items([
              singleton(S, "Yfirlit", "page-starfid-verkefni-innanlands"),
              singleton(S, "Heimsmarkmi\u00F0", "page-starfid-heimsmarkmid"),
              singleton(S, "Animation og SDG", "page-starfid-animation-sdg"),
              singleton(S, "Samstarf vi\u00F0 RHA", "page-starfid-rha"),
              S.divider(),
              dynamicList(S, "N\u00fdjar undirs\u00ed\u00f0ur", "verkefni-innanlands-dynamic", "verkefni-innanlands"),
            ])
          ),

          S.listItem().title("Fundarger\u00F0ir").child(
            S.list().title("Fundarger\u00F0ir").items([
              singleton(S, "Yfirlit", "page-starfid-fundargerdir"),
              singleton(S, "A\u00F0alfundir", "page-starfid-adalfundir"),
              singleton(S, "Stj\u00F3rnarfundir", "page-starfid-stjornarfundir"),
            ])
          ),
          singleton(S, "Skipulag \u00EDb\u00FAasamtaka", "page-starfid-skipulag-ibuasamtaka"),
          singleton(S, "Bygg\u00F0astefna", "page-starfid-byggdastefna"),
          S.divider(),
          dynamicList(S, "N\u00fdjar s\u00ed\u00f0ur undir Starfi\u00F0", "starfid-top-dynamic", "starfid"),
        ])
      ),

      S.divider(),
      S.documentTypeListItem("newsPost").title("Fr\u00E9ttir"),
      S.documentTypeListItem("eventAlbum").title("Myndasöfn (viðburðir)"),
    ]);
