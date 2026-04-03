/**
 * Seeds Starfið pages into Sanity
 * Usage: node scripts/seed-starfid.mjs
 */
import { createClient } from "@sanity/client";
import { readFileSync } from "fs";

function loadEnv() {
  try {
    const raw = readFileSync(".env.local", "utf-8");
    for (const line of raw.split("\n")) {
      const [key, ...rest] = line.split("=");
      if (key && rest.length) process.env[key.trim()] = rest.join("=").trim();
    }
  } catch {}
}
loadEnv();

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

function b(text, style = "normal") {
  return { _type: "block", _key: Math.random().toString(36).slice(2), style, markDefs: [],
    children: [{ _type: "span", _key: Math.random().toString(36).slice(2), text, marks: [] }] };
}
function li(text) {
  return { _type: "block", _key: Math.random().toString(36).slice(2), style: "normal",
    listItem: "bullet", level: 1, markDefs: [],
    children: [{ _type: "span", _key: Math.random().toString(36).slice(2), text, marks: [] }] };
}

const pages = [
  {
    _id: "page-starfid-stefnumorkun", _type: "page",
    title: "Stefnum\u00F6rkun",
    slug: { _type: "slug", current: "starfid-stefnumorkun" },
    body: [
      b("Stefnum\u00F6rkun Landsbygg\u00F0in lifi leggur \u00E1herslu \u00E1 \u00FErj\u00FA meginmarkmi\u00F0 \u00ED uppbygging dreifb\u00FDlis og \u00FE\u00E1ttt\u00F6ku \u00ED stefnum\u00F3tun fyrir framti\u00F0 \u00CDslands."),
      b("\u00DErj\u00FA meginmarkmi\u00F0", "h2"),
      li("Vera tengiliður milli samtaka, einstaklinga og hópa með svipuð markmið"),
      li("Taka þátt í og afla þekkingar í gegnum alþjóðlegt samstarf við sambærileg samtök"),
      li("Vinna að málefnum sem eru sameiginlegir hagsmunir íbúa dreifbýlis"),
      b("Skjöl", "h2"),
      li("Stefnumörkun Landsbyggðin lifi 2018"),
      li("Byggðastefna yfirfarið"),
    ],
  },
  {
    _id: "page-starfid-verkefni-innanlands", _type: "page",
    title: "Verkefni innanlands",
    slug: { _type: "slug", current: "starfid-verkefni-innanlands" },
    body: [
      b("Landsbygg\u00F0in lifi hefur teki\u00F0 \u00FE\u00E1tt \u00ED \u00FDmsum verkefnum innanlands."),
      b("Meðal þeirra er könnun árið 2015 á búsetuskilyrðum ungs fólks, unnin í samvinnu við Rannsóknamiðstöð Háskólans á Akureyri."),
      b("Samtökin taka reglulega þátt í byggðaþingum og fundum um dreifbýlismál um allt Ísland."),
    ],
  },
  {
    _id: "page-starfid-heimsmarkmid", _type: "page",
    title: "Heimsmarkmi\u00F0 Sameinuðu þjóðanna",
    slug: { _type: "slug", current: "starfid-heimsmarkmid" },
    body: [
      b("Ísland skuldbatt sig til 17 heimsmarkmiða Sameinuðu þjóðanna, sem voru samþykkt í september 2015 fyrir tímabilið 2016–2030. Markmiðin ná yfir 169 undirmarkmið er varða bæði innlent og alþjóðlegt samstarf."),
      b("Markmiðin eru samþætt og óaðskiljanleg og mynda jafnvægi á milli þriggja stoða sjálfbærrar þróunar; þeirrar efnahagslegu, félagslegu og umhverfislegu.", "blockquote"),
      b("Ramminn leggur áherslu á að enginn einstaklingur eða hópur verði skilinn eftir, sem krefst heildstæðrar mælingar frekar en meðaltala."),
    ],
  },
  {
    _id: "page-starfid-animation-sdg", _type: "page",
    title: "Animation og SDG",
    slug: { _type: "slug", current: "starfid-animation-sdg" },
    body: [
      b("Starf Landsbyggðin lifi er fjölbreytt og áhugavert. Meðlimir taka þátt í verkefnum með öðrum erlendum samtökum og senda reglulega fulltrúa á dreifbýlisþing um allt Evrópu."),
    ],
  },
  {
    _id: "page-starfid-rha", _type: "page",
    title: "Verkefni \u00ED samstarfi vi\u00F0 RHA",
    slug: { _type: "slug", current: "starfid-rha" },
    body: [
      b("Netkönnun um búsetuskilyrði ungs fólks", "h2"),
      b("Þetta verkefni var unnið í samvinnu við Rannsóknamiðstöð Háskólans á Akureyri (RHA). Markmið rannsóknarinnar var að safna gögnum um viðhorf yngri aldurshópa til búsetuskilyrða."),
      b("Sérfræðingar rannsóknamiðstöðvarinnar unnu með forsvarmönnum samtakanna að þróun spurningalista sem var dreift í gegnum netkönnun. Samtökin nýttu tengslanet sitt til að afla netfanga einstaklinga á aldrinum 18–35 ára sem búa á eða tengjast dreifbýlissvæðum."),
    ],
  },
  {
    _id: "page-starfid-erlent-samstarf", _type: "page",
    title: "Erlent samstarf",
    slug: { _type: "slug", current: "starfid-erlent-samstarf" },
    body: [
      b("Landsbyggðin lifi er virk þátttakandi í alþjóðlegu samstarfi um dreifbýlismál. Samtökin eiga aðild að nokkrum alþjóðlegum samtökum og verkefnum, þar á meðal Hela Norden skal leva, European Rural Parliament og fleiri."),
    ],
  },
  {
    _id: "page-starfid-erlend-verkefni", _type: "page",
    title: "Erlend verkefni",
    slug: { _type: "slug", current: "starfid-erlend-verkefni" },
    body: [
      b("Signs Goes North", "h2"),
      b("Tungumálalærdómsverkefni sem hjálpar innflytjendum að læra staðbundin tungumál og aðlagast samfélögum í Rotterdam, Söderhamn, Bollnäs, Vejle og Reykjavík. Verkefnið styður nám í hollensku, sænsku, dönsku og íslensku og byggir á Signs-aðferðafræðinni frá 2004."),
      b("Land of Butterflies", "h2"),
      b("Sérstakt alþjóðlegt verkefni sem tengir saman dreifbýlissvæði í Evrópu."),
    ],
  },
  {
    _id: "page-starfid-erp", _type: "page",
    title: "European Rural Parliament",
    slug: { _type: "slug", current: "starfid-erp" },
    body: [
      b("Landsbyggðin lifi á aðild að samtökum evrópskra dreifbýlissvæða. Fyrsta evrópska dreifbýlisþingið var haldið árið 2013 í Brussel. Þrjú þing hafa verið haldin með fulltrúum frá yfir 40 löndum og LBL fulltrúar hafa tekið þátt á öllum þingunum."),
    ],
  },
  {
    _id: "page-starfid-fidrildaverkefnid", _type: "page",
    title: "Fi\u00F0rildaverkefni\u00F0",
    slug: { _type: "slug", current: "starfid-fidrildaverkefnid" },
    body: [
      b("Fiðrildaverkefnið (Lands of Butterflies) er alþjóðlegt samstarfsverkefni dreifbýlissvæða í Evrópu. Landsbyggðin lifi tekur þátt í verkefninu sem fulltrúi íslensks dreifbýlis."),
    ],
  },
  {
    _id: "page-starfid-finnskaverkefnid", _type: "page",
    title: "Finnskaverkefni\u00F0",
    slug: { _type: "slug", current: "starfid-finnskaverkefnid" },
    body: [
      b("Finnskaverkefnið er alþjóðlegt samstarfsverkefni milli LBL og finnskra dreifbýlissamtaka. Samtökin senda reglulega fulltrúa á ráðstefnur tengdar verkefninu."),
    ],
  },
  {
    _id: "page-starfid-hela-norden", _type: "page",
    title: "Hela norden skal leva",
    slug: { _type: "slug", current: "starfid-hela-norden" },
    body: [
      b("Markmið er að vera netmiðstöð á Norðurlandasvæðinu til að styrkja staðbundna þróun með því að deila reynslu og þekkingu. Einnig að efla norrænt samstarf, sérstaklega á dreifbýlissvæðum.", "blockquote"),
      b("Fundarseta", "h2"),
      b("Tveir fundir eru haldnir árlega. Voarfundirnir skiptast á milli Norðurlandanna."),
      b("Þátttaka LBL", "h2"),
      b("Samtökin hafa tekið þátt í samstarfsverkefnum í gegnum þetta net, þar á meðal verkefninu Signs goes North sem notar skiltamerkingar í borgum til að styðja við aðlögun innflytjenda á Íslandi, í Danmörku, Svíþjóð og Hollandi."),
    ],
  },
  {
    _id: "page-starfid-fundargerdir", _type: "page",
    title: "Fundarger\u00F0ir",
    slug: { _type: "slug", current: "starfid-fundargerdir" },
    body: [
      b("Hér má finna fundargerðir frá aðalfundum og stjórnarfundum samtakanna Landsbyggðin lifi."),
    ],
  },
  {
    _id: "page-starfid-adalfundir", _type: "page",
    title: "A\u00F0alfundir",
    slug: { _type: "slug", current: "starfid-adalfundir" },
    body: [
      b("Fundargerðir aðalfunda Landsbyggðin lifi."),
      li("Fundargerð LBL 9. jan. 2025"),
      li("Aðalfundur samtakanna Landsbyggðin lifi árið 2023"),
      li("Aðalstjórnarmenn LBL 2023"),
      li("Aðalfundur LBL 2021 Netfundur"),
      li("Aðalfundur LBL-2019, fundargerð"),
    ],
  },
  {
    _id: "page-starfid-stjornarfundir", _type: "page",
    title: "Stj\u00F3rnarfundir",
    slug: { _type: "slug", current: "starfid-stjornarfundir" },
    body: [
      b("Fundargerðir stjórnarfunda Landsbyggðin lifi."),
      b("2025", "h3"),
      li("Stjórnarfundur 14. ágúst 2025"),
      li("Fundargerð 15. maí 2025"),
      li("Fundargerð 10. apríl 2025"),
      li("Fundargerð 13. mars 2025"),
      li("Fundargerð 13. febrúar 2025"),
    ],
  },
  {
    _id: "page-starfid-skipulag-ibuasamtaka", _type: "page",
    title: "Skipulag \u00EDb\u00FAasamtaka",
    slug: { _type: "slug", current: "starfid-skipulag-ibuasamtaka" },
    body: [
      b("Íbúasamtök er hugtak sem nær yfir ýmsar tegundir af frjálsum félagasamtökum sem beinast að búsetuháttum, samfélagsumhverfi og velferð borgaranna á landsvæðum sem eru landsvæðislega skilgreind."),
      b("Samtökin veita leiðsögn fyrir samfélagshópa sem skortir uppbyggingu og stefnu, og hjálpa þeim að takast á við sameiginlegar áskoranir með kerfisbundinni nálgun við þróun verkefna og lausna."),
    ],
  },
  {
    _id: "page-starfid-byggdastefna", _type: "page",
    title: "Bygg\u00F0astefna",
    slug: { _type: "slug", current: "starfid-byggdastefna" },
    body: [
      b("Byggðastefna er ekki skrifuð fyrir dreifbýlið á Íslandi heldur landið allt.", "blockquote"),
      b("Stefnan tryggir að íbúar skilji val sitt þegar þeir velja búsetu og fjárfestingarstaðsetningu. Hún snýst um heildstæða sýn á uppbyggingu samfélagsins um allt land."),
    ],
  },
];

async function main() {
  console.log("\n\uD83C\uDF31 Seeding Starfi\u00F0 pages into Sanity\n");
  for (const page of pages) {
    process.stdout.write(`  \u2022 ${page.title}\u2026 `);
    try {
      await client.createOrReplace(page);
      console.log("\u2713");
    } catch (err) {
      console.log("\u2717");
      console.error(`    ${err.message}`);
    }
  }
  console.log("\n\u2705 Done\n");
}

main().catch((err) => { console.error("\u274C", err.message); process.exit(1); });
