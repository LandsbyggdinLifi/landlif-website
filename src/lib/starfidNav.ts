export const starfidTopLinks = [
  { href: "/starfid/stefnumorkun", label: "Stefnum\u00F6rkun" },
  { href: "/starfid/verkefni-innanlands", label: "Verkefni innanlands" },
  { href: "/starfid/erlent-samstarf", label: "Erlent samstarf" },
  { href: "/starfid/fundargerdir", label: "Fundarger\u00F0ir" },
  { href: "/starfid/skipulag-ibuasamtaka", label: "Skipulag \u00EDb\u00FAasamtaka" },
  { href: "/starfid/byggdastefna", label: "Bygg\u00F0astefna" },
];

export const starfidSubNav: Record<string, { href: string; label: string }[]> = {
  "verkefni-innanlands": [
    { href: "/starfid/verkefni-innanlands", label: "Yfirlit" },
    { href: "/starfid/verkefni-innanlands/heimsmarkmid", label: "Heimsmarkmi\u00F0" },
    { href: "/starfid/verkefni-innanlands/animation-og-sdg", label: "Animation og SDG" },
    { href: "/starfid/verkefni-innanlands/rha", label: "Samstarf vi\u00F0 RHA" },
  ],
  "erlent-samstarf": [
    { href: "/starfid/erlent-samstarf", label: "Yfirlit" },
    { href: "/starfid/erlent-samstarf/erlend-verkefni", label: "Erlend verkefni" },
    { href: "/starfid/erlent-samstarf/european-rural-parliament", label: "European Rural Parliament" },
    { href: "/starfid/erlent-samstarf/fidrildaverkefnid", label: "Fi\u00F0rildaverkefni\u00F0" },
    { href: "/starfid/erlent-samstarf/finnskaverkefnid", label: "Finnskaverkefni\u00F0" },
    { href: "/starfid/erlent-samstarf/hela-norden", label: "Hela norden skal leva" },
  ],
  "fundargerdir": [
    { href: "/starfid/fundargerdir", label: "Yfirlit" },
    { href: "/starfid/fundargerdir/adalfundir", label: "A\u00F0alfundir" },
    { href: "/starfid/fundargerdir/stjornarfundir", label: "Stj\u00F3rnarfundir" },
  ],
};
