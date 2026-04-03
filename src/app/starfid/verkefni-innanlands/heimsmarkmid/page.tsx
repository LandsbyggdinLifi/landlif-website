import type { Metadata } from "next";
import { client } from "@/sanity/client";
import { pageByIdQuery } from "@/sanity/queries";
import PortableTextRenderer from "@/components/PortableTextRenderer";
import StarfidLayout from "@/components/StarfidLayout";

export const revalidate = 60;
export const metadata: Metadata = { title: "Heimsmarkmi\u00F0 Sameinuðu þjóðanna" };

export default async function Page() {
  const page = await client.fetch(pageByIdQuery, { id: "page-starfid-heimsmarkmid" }).catch(() => null);
  return (
    <StarfidLayout title={page?.title || "Heimsmarkmi\u00F0 Sameinuðu þjóðanna"} section="verkefni-innanlands" heroImage={page?.heroImage}>
      {page?.body ? <PortableTextRenderer value={page.body} /> : (
        <div>
          <p className="text-gray-600 leading-relaxed mb-6">
            Ísland skuldbatt sig til 17 heimsmarkmiða Sameinuðu þjóðanna, sem voru samþykkt í september 2015 fyrir tímabilið 2016–2030. Markmiðin ná yfir 169 undirmarkmið er varða bæði innlent og alþjóðlegt samstarf.
          </p>
          <blockquote className="border-l-4 pl-4 italic text-gray-600 my-6" style={{ borderColor: "#16a085" }}>
            &ldquo;Markmiðin eru samþætt og óaðskiljanleg og mynda jafnvægi á milli þriggja stoða sjálfbærrar þróunar; þeirrar efnahagslegu, félagslegu og umhverfislegu.&rdquo;
          </blockquote>
          <p className="text-gray-600 leading-relaxed">
            Ramminn leggur áherslu á að enginn einstaklingur eða hópur verði skilinn eftir, sem krefst heildstæðrar mælingar frekar en meðaltala.
          </p>
        </div>
      )}
    </StarfidLayout>
  );
}
