export const starfidTopLinks = [
  { href: "/starfid/stefnumorkun", label: "Stefnumörkun" },
  { href: "/starfid/verkefni-innanlands", label: "Verkefni innanlands" },
  { href: "/starfid/erlent-samstarf", label: "Erlent samstarf" },
  { href: "/starfid/fundargerdir", label: "Fundargerðir" },
  { href: "/starfid/skipulag-ibuasamtaka", label: "Skipulag íbúasamtaka" },
  { href: "/starfid/byggdastefna", label: "Byggðastefna" },
];

export const starfidSubNav: Record<string, { href: string; label: string }[]> = {
  "verkefni-innanlands": [
    { href: "/starfid/verkefni-innanlands", label: "Yfirlit" },
    { href: "/starfid/verkefni-innanlands/heimsmarkmid", label: "Heimsmarkmið" },
    { href: "/starfid/verkefni-innanlands/animation-og-sdg", label: "Animation og SDG" },
    { href: "/starfid/verkefni-innanlands/rha", label: "Samstarf við RHA" },
  ],
  "erlent-samstarf": [
    { href: "/starfid/erlent-samstarf", label: "Yfirlit" },
    { href: "/starfid/erlent-samstarf/erlend-verkefni", label: "Erlend verkefni" },
    { href: "/starfid/erlent-samstarf/european-rural-parliament", label: "European Rural Parliament" },
    { href: "/starfid/erlent-samstarf/fidrildaverkefnid", label: "Fiðrildaverkefnið" },
    { href: "/starfid/erlent-samstarf/finnskaverkefnid", label: "Finnskaverkefnið" },
    { href: "/starfid/erlent-samstarf/hela-norden", label: "Hela norden skal leva" },
  ],
  "fundargerdir": [
    { href: "/starfid/fundargerdir", label: "Yfirlit" },
    { href: "/starfid/fundargerdir/adalfundir", label: "Aðalfundir" },
    { href: "/starfid/fundargerdir/stjornarfundir", label: "Stjórnarfundir" },
  ],
};
