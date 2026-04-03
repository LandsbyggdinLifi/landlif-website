import type { Metadata } from "next";
import { client } from "@/sanity/client";
import { pageByIdQuery } from "@/sanity/queries";
import PortableTextRenderer from "@/components/PortableTextRenderer";
import StarfidLayout from "@/components/StarfidLayout";

export const revalidate = 60;
export const metadata: Metadata = { title: "Stefnum\u00F6rkun" };

export default async function Page() {
  const page = await client.fetch(pageByIdQuery, { id: "page-starfid-stefnumorkun" }).catch(() => null);
  return (
    <StarfidLayout title={page?.title || "Stefnum\u00F6rkun"} heroImage={page?.heroImage}>
      {page?.body ? <PortableTextRenderer value={page.body} /> : (
        <div>
          <p className="text-gray-600 leading-relaxed mb-6">
            Stefnumörkun samtakanna Landsbyggðin lifi leggur áherslu á þrjú meginmarkmið í uppbyggingu dreifbýlis og þátttöku í stefnumótun fyrir framtíð Íslands.
          </p>
          <h2 className="text-xl font-bold mb-4" style={{ color: "#394c75" }}>Þrjú meginmarkmið</h2>
          <ol className="list-decimal list-inside space-y-3 text-gray-600 mb-8">
            <li>Vera tengiliður milli samtaka, einstaklinga og hópa með svipuð markmið</li>
            <li>Taka þátt í og afla þekkingar í gegnum alþjóðlegt samstarf við sambærileg samtök</li>
            <li>Vinna að málefnum sem eru sameiginlegur hagsmunir íbúa dreifbýlis</li>
          </ol>
          <h2 className="text-xl font-bold mb-4" style={{ color: "#394c75" }}>Skjöl</h2>
          <ul className="space-y-2 text-gray-600">
            <li>Stefnumörkun Landsbyggðin lifi 2018</li>
            <li>Byggðastefna yfirfarið</li>
          </ul>
        </div>
      )}
    </StarfidLayout>
  );
}
