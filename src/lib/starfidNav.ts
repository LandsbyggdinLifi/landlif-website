export const starfidTopLinks = [
  { href: "/starfid/stefnumorkun", label: "Stefnumörkun" },
  { href: "/starfid/samstarf-erlendis", label: "Samstarf Erlendis" },
  { href: "/starfid/verkefni-erlendis", label: "Verkefni Erlendis" },
  { href: "/starfid/samstarf-innanlands", label: "Samstarf Innanlands" },
  { href: "/starfid/verkefni-innanlands", label: "Verkefni Innanlands" },
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
  "samstarf-erlendis": [
    { href: "/starfid/samstarf-erlendis", label: "Yfirlit" },
    { href: "/starfid/samstarf-erlendis/erlend-verkefni", label: "Erlend verkefni" },
    { href: "/starfid/samstarf-erlendis/european-rural-parliament", label: "European Rural Parliament" },
    { href: "/starfid/samstarf-erlendis/fidrildaverkefnid", label: "Fiðrildaverkefnið" },
    { href: "/starfid/samstarf-erlendis/finnskaverkefnid", label: "Finnskaverkefnið" },
    { href: "/starfid/samstarf-erlendis/hela-norden", label: "Hela norden skal leva" },
  ],
  "verkefni-erlendis": [
    { href: "/starfid/verkefni-erlendis", label: "Yfirlit" },
  ],
  "samstarf-innanlands": [
    { href: "/starfid/samstarf-innanlands", label: "Yfirlit" },
  ],
  "fundargerdir": [
    { href: "/starfid/fundargerdir", label: "Yfirlit" },
    { href: "/starfid/fundargerdir/adalfundir", label: "Aðalfundir" },
    { href: "/starfid/fundargerdir/stjornarfundir", label: "Stjórnarfundir" },
  ],
};
