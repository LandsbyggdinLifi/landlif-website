import type { StructureResolver } from "sanity/structure";

type S = Parameters<StructureResolver>[0];

function singleton(S: S, title: string, id: string) {
  return S.listItem().title(title).id(id).child(
    S.document().schemaType("page").documentId(id)
  );
}

// Flat document list that includes both singleton pages (by _id) and
// dynamically created pages (by section field). Editors can create new
// pages from this list and they appear here automatically.
function sectionList(S: S, title: string, id: string, section: string, singletonIds: string[] = []) {
  const idClause = singletonIds.length > 0
    ? ` || _id in [${singletonIds.map((i) => `"${i}"`).join(", ")}]`
    : "";
  return S.listItem()
    .title(title)
    .id(id)
    .child(
      S.documentList()
        .title(title)
        .filter(`_type == "page" && (section == "${section}"${idClause})`)
        .defaultOrdering([
          { field: "sortOrder", direction: "asc" },
          { field: "_createdAt", direction: "asc" },
        ])
    );
}

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Landsbyggðin lifi")
    .items([
      S.listItem().title("Forsíða").id("siteSettings").child(
        S.document().schemaType("siteSettings").documentId("siteSettings")
      ),
      singleton(S, "Um okkur", "page-um-okkur"),
      S.divider(),

      // Samtökin
      S.listItem().title("Samtökin").child(
        S.list().title("Samtökin").items([
          singleton(S, "Markmið", "page-markmid"),
          singleton(S, "Lög", "page-log"),
          S.listItem().title("Stjórn og félagsmenn").id("samtokinSettings").child(
            S.document().schemaType("samtokinSettings").documentId("samtokinSettings")
          ),
        ])
      ),

      // Starfið — each sub-section is a flat document list
      S.listItem().title("Starfið").child(
        S.list().title("Starfið").items([
          singleton(S, "Stefnumörkun", "page-starfid-stefnumorkun"),

          sectionList(S, "Samstarf Erlendis", "section-samstarf-erlendis", "samstarf-erlendis", [
            "page-starfid-erlent-samstarf",
            "page-starfid-erp",
            "page-starfid-hela-norden",
          ]),

          sectionList(S, "Verkefni Erlendis", "section-verkefni-erlendis", "verkefni-erlendis", [
            "page-starfid-verkefni-erlendis",
          ]),

          sectionList(S, "Samstarf Innanlands", "section-samstarf-innanlands", "samstarf-innanlands", [
            "page-starfid-samstarf-innanlands",
          ]),

          sectionList(S, "Verkefni Innanlands", "section-verkefni-innanlands", "verkefni-innanlands", [
            "page-starfid-verkefni-innanlands",
            "page-starfid-heimsmarkmid",
            "page-starfid-animation-sdg",
            "page-starfid-rha",
          ]),

          sectionList(S, "Fundargerðir", "section-fundargerdir", "fundargerdir", [
            "page-starfid-fundargerdir",
            "page-starfid-adalfundir",
            "page-starfid-stjornarfundir",
          ]),

          singleton(S, "Skipulag íbúasamtaka", "page-starfid-skipulag-ibuasamtaka"),
          singleton(S, "Byggðastefna", "page-starfid-byggdastefna"),
        ])
      ),

      S.divider(),
      S.documentTypeListItem("newsPost").title("Fréttir"),
      S.documentTypeListItem("eventAlbum").title("Myndasöfn (viðburðir)"),
    ]);
