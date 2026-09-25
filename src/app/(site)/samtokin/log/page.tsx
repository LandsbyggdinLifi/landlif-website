import type { Metadata } from "next";
import { client } from "@/sanity/client";
import { pageByIdQuery } from "@/sanity/queries";
import PortableTextRenderer from "@/components/PortableTextRenderer";
import SamtokinLayout from "@/components/SamtokinLayout";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Lög",
  description: "Lög samtakanna Landsbyggðin lifi.",
};

export default async function LogPage() {
  const page = await client
    .fetch(pageByIdQuery, { id: "page-log" })
    .catch(() => null);

  return (
    <SamtokinLayout title={page?.title || "Lög"} heroImage={page?.heroImage}>
      {page?.body ? (
        <PortableTextRenderer value={page.body} />
      ) : (
        <div>
          <p className="text-sm text-stone mb-8">
            Samþykkt á stofnfundi í Akureyri 12. júní 2001. Breytt á aðalfundum
            í Rím (Svarfaðardal) 5. júní 2004, á Hvanneyri 10. júní 2007, á
            Kópaskeri 23. ágúst 2008, á Ytri-Vík 6. nóvember 2010 og á
            Gerðuberg 20. október 2019.
          </p>
          {[
            { n: "1. grein", t: "Heiti", b: "Heiti samtakanna er \u201ELandsbyggðin lifi\u201C (skammstafað LBL)." },
            { n: "2. grein", t: "Markmið og starfsemi", b: "LBL er samstarfsvettvangur samtaka, hagsmunahópa og einstaklinga sem vinna að því að styrkja dreifbýlissamfélag um allt Ísland, í samvinnu við þróunarfélög, sveitarfélög og skyldar stofnanir." },
            { n: "3. grein", t: "Félagsmenn", b: "Samtök, hagsmunahópar og einstaklingar geta gengið í samtökin með umsókn og samþykki stjórnar." },
            { n: "4. grein", t: "Félagsgjald", b: "Árleg félagsgjöld eru ákveðin á aðalfundi." },
            { n: "5. grein", t: "Úrsögn", b: "Félagar geta sagt sig úr samtökunum skriflega; félagsréttur fellur niður við vanskil." },
            { n: "6. grein", t: "Reikningsár", b: "Reikningsár samtakanna fylgir almanaksárinu." },
            { n: "7. grein", t: "Aðalfundur", b: "Aðalfundur er haldinn annað hvert ár fyrir nóvember. Fulltrúar eru valdir eftir fjölda félagsmanna (einn fulltrúi fyrir 15 eða færri, tveir fyrir 16–40, þrír fyrir fleiri en 40). Dagskrá felur í sér forsetakosningar, ársreikninga, stefnumótun og breytingar sem krefjast 2/3 samþykkis." },
            { n: "8. grein", t: "Stjórn", b: "Sjö meðlimir (formaður, varaformaður, ritari, gjaldkeri og þrír meðlimir) auk fimm varamanna." },
            { n: "9. grein", t: "Endurskoðendur", b: "Tveir endurskoðendur auk eins vara eru valdir árlega." },
            { n: "10. grein", t: "Lögbreytingar", b: "Breytingar á lögum krefjast 2/3 samþykkis á aðalfundi." },
            { n: "11. grein", t: "Slit", b: "Slit samtakanna krefjast 2/3 samþykkis meðlima; eignir renna til uppbyggingar dreifbýlis." },
          ].map((a) => (
            <div key={a.n} className="mb-6">
              <h3 className="font-serif text-lg font-semibold text-moss-deep mb-1">{a.n} – {a.t}</h3>
              <p className="text-ink/80 leading-relaxed">{a.b}</p>
            </div>
          ))}
        </div>
      )}
    </SamtokinLayout>
  );
}
