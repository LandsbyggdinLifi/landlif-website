/**
 * Seeds Samtökin pages into Sanity
 * Usage: node scripts/seed-samtokin.mjs
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

function block(text, style = "normal") {
  return {
    _type: "block",
    _key: Math.random().toString(36).slice(2),
    style,
    children: [{ _type: "span", _key: Math.random().toString(36).slice(2), text, marks: [] }],
    markDefs: [],
  };
}

function bulletList(items) {
  return items.map((text) => ({
    _type: "block",
    _key: Math.random().toString(36).slice(2),
    style: "normal",
    listItem: "bullet",
    level: 1,
    children: [{ _type: "span", _key: Math.random().toString(36).slice(2), text, marks: [] }],
    markDefs: [],
  }));
}

const pages = [
  {
    _id: "page-markmid",
    _type: "page",
    title: "Markmið",
    slug: { _type: "slug", current: "markmid" },
    body: [
      block("\u201ELandsbyggðin lifi\u201C \u2013 þetta er markmið samtakanna.", "h2"),
      block(
        "Samtökin leggja áherslu á að tengja saman fólk og byggja upp sterk samtök. Þau starfa sem samstarfsvettvangur einstaklinga og sjálfstæðra hagsmunahópa sem eru skuldbundin til að styrkja og þróa heimabyggð sína, og stuðla að samræmdri uppbyggingu landsbyggðarinnar um allt land – bæði í efnahagslegum og menningarlegum skilningi."
      ),
      block(
        "Samtökin taka þátt í verkefnum með erlendum samtökum og senda reglulega fulltrúa á dreifbýlisráðstefnur um allt Evrópu."
      ),
    ],
  },
  {
    _id: "page-log",
    _type: "page",
    title: "Lög",
    slug: { _type: "slug", current: "log" },
    body: [
      block(
        "Samþykkt á stofnfundi í Akureyri 12. júní 2001. Breytt á aðalfundum í Rím (Svarfaðardal) 5. júní 2004, á Hvanneyri 10. júní 2007, á Kópaskeri 23. ágúst 2008, á Ytri-Vík 6. nóvember 2010 og á Gerðuberg 20. október 2019."
      ),
      block("1. grein – Heiti", "h3"),
      block("Heiti samtakanna er \u201ELandsbyggðin lifi\u201C (skammstafað LBL)."),
      block("2. grein – Markmið og starfsemi", "h3"),
      block("LBL er samstarfsvettvangur samtaka, hagsmunahópa og einstaklinga sem vinna að því að styrkja dreifbýlissamfélag um allt Ísland, í samvinnu við þróunarfélög, sveitarfélög og skyldar stofnanir."),
      block("3. grein – Félagsmenn", "h3"),
      block("Samtök, hagsmunahópar og einstaklingar geta gengið í samtökin með umsókn og samþykki stjórnar."),
      block("4. grein – Félagsgjald", "h3"),
      block("Árleg félagsgjöld eru ákveðin á aðalfundi."),
      block("5. grein – Úrsögn", "h3"),
      block("Félagar geta sagt sig úr samtökunum skriflega; félagsréttur fellur niður við vanskil."),
      block("6. grein – Reikningsár", "h3"),
      block("Reikningsár samtakanna fylgir almanaksárinu."),
      block("7. grein – Aðalfundur", "h3"),
      block("Aðalfundur er haldinn annað hvert ár fyrir nóvember. Fulltrúar eru valdir eftir fjölda félagsmanna (einn fulltrúi fyrir 15 eða færri, tveir fyrir 16–40, þrír fyrir fleiri en 40). Dagskrá felur í sér forsetakosningar, ársreikninga, stefnumótun og breytingar sem krefjast 2/3 samþykkis."),
      block("8. grein – Stjórn", "h3"),
      block("Sjö meðlimir (formaður, varaformaður, ritari, gjaldkeri og þrír meðlimir) auk fimm varamanna."),
      block("9. grein – Endurskoðendur", "h3"),
      block("Tveir endurskoðendur auk eins vara eru valdir árlega."),
      block("10. grein – Lögbreytingar", "h3"),
      block("Breytingar á lögum krefjast 2/3 samþykkis á aðalfundi."),
      block("11. grein – Slit", "h3"),
      block("Slit samtakanna krefjast 2/3 samþykkis meðlima; eignir renna til uppbyggingar dreifbýlis."),
    ],
  },
  {
    _id: "page-stjorn",
    _type: "page",
    title: "Stjórn",
    slug: { _type: "slug", current: "stjorn" },
    body: [
      block("Aðal- og varastjórnarmenn eru valdir á aðalfundi samtakanna."),
      block("Aðalstjórn", "h2"),
      block("Hildur Þórðardóttir – Formaður, Reykjavík"),
      block("Stefanía Vigdís Gísladóttir – Varaformaður"),
      block("Vigfús Ingvar Ingvarsson – Ritari, Egilsstöðum"),
      block("Sigríður Svavarsdóttir – Gjaldkeri"),
      block("Guðrún T. Gísladóttir – Meðlimur"),
      block("Ómar Ragnarsson – Meðlimur"),
      block("Varastjórn", "h2"),
      block("Bjarni Þór Haraldsson – Egilsstöðum"),
      block("Björgvin Hjörleifsson – Dalvík"),
      block("Hafrún Káradóttir – Reykjavík"),
    ],
  },
  {
    _id: "page-felagsmenn",
    _type: "page",
    title: "Félagsmenn",
    slug: { _type: "slug", current: "felagsmenn" },
    body: [
      block("Framfarafélög og einstaklingar", "h2"),
      ...bulletList([
        "Framfarafélag Dalvíkurbyggðar",
        "Framfarafélag Fljótdalshéraðs",
        "Framfarafélagi Reisn",
        "Framfarafélag Vestfjarða",
        "Framfarafélag Öxarfjarðar",
      ]),
      block("Auk þess eru um tvö hundruð einstaklingsmeðlimir í samtökunum."),
      block("Gerast meðlimur", "h2"),
      block("Viltu styðja uppbyggingu landsbyggðarinnar? Hafðu samband við okkur í gegnum sambandseyðublaðið."),
    ],
  },
];

async function main() {
  console.log("\n🌱 Seeding Samtökin pages into Sanity\n");

  for (const page of pages) {
    process.stdout.write(`  • ${page.title}… `);
    try {
      await client.createOrReplace(page);
      console.log("✓");
    } catch (err) {
      console.log("✗");
      console.error(`    ${err.message}`);
    }
  }

  console.log("\n✅ Done\n");
}

main().catch((err) => {
  console.error("❌", err.message);
  process.exit(1);
});
