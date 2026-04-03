import type { Metadata } from "next";
import { client } from "@/sanity/client";
import { samtokinPageQuery } from "@/sanity/queries";
import PortableTextRenderer from "@/components/PortableTextRenderer";
import StarfidLayout from "@/components/StarfidLayout";

export const revalidate = 60;
export const metadata: Metadata = { title: "Finnskaverkefni\u00F0" };

export default async function Page() {
  const page = await client.fetch(samtokinPageQuery, { id: "page-starfid-finnskaverkefnid" }).catch(() => null);
  return (
    <StarfidLayout title={page?.title || "Finnskaverkefni\u00F0"} section="erlent-samstarf" heroImage={page?.heroImage}>
      {page?.body ? <PortableTextRenderer value={page.body} /> : (
        <div>
          <p className="text-gray-600 leading-relaxed mb-6">
            Finnskaverkefnið er alþjóðlegt samstarfsverkefni milli LBL og finnskra dreifbýlissamtaka. Landsbyggðin lifi tekur þátt í verkefninu sem fulltrúi íslensks dreifbýlis.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Samtökin senda reglulega fulltrúa á ráðstefnur tengdar verkefninu.
          </p>
        </div>
      )}
    </StarfidLayout>
  );
}
