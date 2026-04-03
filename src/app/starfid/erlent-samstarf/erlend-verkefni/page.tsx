import type { Metadata } from "next";
import { client } from "@/sanity/client";
import { pageByIdQuery } from "@/sanity/queries";
import PortableTextRenderer from "@/components/PortableTextRenderer";
import StarfidLayout from "@/components/StarfidLayout";

export const revalidate = 60;
export const metadata: Metadata = { title: "Erlend verkefni", description: "Yfirlit yfir erlend verkefni sem Landsbyggðin lifi tekur þátt í." };

export default async function Page() {
  const page = await client.fetch(pageByIdQuery, { id: "page-starfid-erlend-verkefni" }).catch(() => null);
  return (
    <StarfidLayout title={page?.title || "Erlend verkefni"} section="erlent-samstarf" heroImage={page?.heroImage}>
      {page?.body ? <PortableTextRenderer value={page.body} /> : (
        <div>
          <h2 className="text-xl font-bold mb-3" style={{ color: "var(--navy)" }}>Signs Goes North</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            Tungumálalærdómsverkefni sem hjálpar innflytjendum að læra staðbundin tungumál og aðlagast samfélögum. Verkefnið nær til fimm borga: Rotterdam (Holland), Söderhamn og Bollnäs (Svíþjóð), Vejle (Danmörk) og Reykjavík (Ísland).
          </p>
          <p className="text-gray-600 leading-relaxed mb-6">
            Verkefnið styður nám í hollensku, sænsku, dönsku og íslensku. Það byggir á &ldquo;Signs-aðferðafræðinni&rdquo; sem þróuð var árið 2004 og hefur hlotið tvö Evrópsk tungumálaverðlaun.
          </p>
          <h2 className="text-xl font-bold mb-3 mt-8" style={{ color: "var(--navy)" }}>Land of Butterflies</h2>
          <p className="text-gray-600 leading-relaxed">
            Sérstakt alþjóðlegt verkefni sem tengir saman dreifbýlissvæði í Evrópu.
          </p>
        </div>
      )}
    </StarfidLayout>
  );
}
