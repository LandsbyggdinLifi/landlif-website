import type { Metadata } from "next";
import { client } from "@/sanity/client";
import { pageByIdQuery } from "@/sanity/queries";
import PortableTextRenderer from "@/components/PortableTextRenderer";
import StarfidLayout from "@/components/StarfidLayout";

export const revalidate = 60;
export const metadata: Metadata = { title: "Stefnum\u00F6rkun", description: "Stefnum\u00F6rkun Landsbygg\u00F0ar lifi \u00ED m\u00E1lefnum dreifb\u00FDlis og landsbygg\u00F0ar." };

export default async function Page() {
  const page = await client.fetch(pageByIdQuery, { id: "page-starfid-stefnumorkun" }).catch(() => null);
  return (
    <StarfidLayout title={page?.title || "Stefnum\u00F6rkun"} heroImage={page?.heroImage}>
      {page?.body ? <PortableTextRenderer value={page.body} /> : (
        <div>
          <p className="text-ink/80 leading-relaxed mb-6">
            Stefnumörkun samtakanna Landsbyggðin lifi leggur áherslu á þrjú meginmarkmið í uppbyggingu dreifbýlis og þátttöku í stefnumótun fyrir framtíð Íslands.
          </p>
          <h2 className="font-serif text-xl font-semibold mb-4 text-moss-deep">Þrjú meginmarkmið</h2>
          <ol className="list-decimal list-inside space-y-3 text-ink/80 mb-8">
            <li>Vera tengiliður milli samtaka, einstaklinga og hópa með svipuð markmið</li>
            <li>Taka þátt í og afla þekkingar í gegnum alþjóðlegt samstarf við sambærileg samtök</li>
            <li>Vinna að málefnum sem eru sameiginlegur hagsmunir íbúa dreifbýlis</li>
          </ol>
          <h2 className="font-serif text-xl font-semibold mb-4 text-moss-deep">Skjöl</h2>
          <ul className="space-y-2 text-ink/80">
            <li>Stefnumörkun Landsbyggðin lifi 2018</li>
            <li>Byggðastefna yfirfarið</li>
          </ul>
        </div>
      )}
    </StarfidLayout>
  );
}
