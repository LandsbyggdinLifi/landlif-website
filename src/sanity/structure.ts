import type { StructureResolver } from "sanity/structure";

function singleton(S: Parameters<StructureResolver>[0], title: string, id: string) {
  return S.listItem().title(title).id(id).child(
    S.document().schemaType("page").documentId(id)
  );
}

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Landsbygg\u00F0in lifi")
    .items([
      S.listItem().title("Forsíða").id("siteSettings").child(
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
          S.listItem().title("Verkefni innanlands").child(
            S.list().title("Verkefni innanlands").items([
              singleton(S, "Yfirlit", "page-starfid-verkefni-innanlands"),
              singleton(S, "Heimsmarkmi\u00F0", "page-starfid-heimsmarkmid"),
              singleton(S, "Animation og SDG", "page-starfid-animation-sdg"),
              singleton(S, "Samstarf vi\u00F0 RHA", "page-starfid-rha"),
            ])
          ),
          S.listItem().title("Erlent samstarf").child(
            S.list().title("Erlent samstarf").items([
              singleton(S, "Yfirlit", "page-starfid-erlent-samstarf"),
              singleton(S, "Erlend verkefni", "page-starfid-erlend-verkefni"),
              singleton(S, "European Rural Parliament", "page-starfid-erp"),
              singleton(S, "Fi\u00F0rildaverkefni\u00F0", "page-starfid-fidrildaverkefnid"),
              singleton(S, "Finnskaverkefni\u00F0", "page-starfid-finnskaverkefnid"),
              singleton(S, "Hela norden skal leva", "page-starfid-hela-norden"),
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
        ])
      ),

      S.divider(),
      S.documentTypeListItem("newsPost").title("Fr\u00E9ttir"),
      S.documentTypeListItem("eventAlbum").title("Myndasöfn (viðburðir)"),
    ]);
