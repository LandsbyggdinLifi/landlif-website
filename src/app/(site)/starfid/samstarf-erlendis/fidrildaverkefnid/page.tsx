import type { Metadata } from "next";
import { client } from "@/sanity/client";
import { pageByIdQuery } from "@/sanity/queries";
import PortableTextRenderer from "@/components/PortableTextRenderer";
import StarfidLayout from "@/components/StarfidLayout";

export const revalidate = 60;
export const metadata: Metadata = { title: "Fi\u00F0rildaverkefni\u00F0", description: "Fi\u00F0rildaverkefni\u00F0 \u2013 alþj\u00F3\u00F0legt samstarfsverkefni um n\u00E1tt\u00FAru og dreifb\u00FDli." };

export default async function Page() {
  const page = await client.fetch(pageByIdQuery, { id: "page-starfid-fidrildaverkefnid" }).catch(() => null);
  return (
    <StarfidLayout title={page?.title || "Fi\u00F0rildaverkefni\u00F0"} section="samstarf-erlendis" heroImage={page?.heroImage}>
      {page?.body ? <PortableTextRenderer value={page.body} /> : (
        <div>
          <p className="text-gray-600 leading-relaxed mb-6">
            Fiðrildaverkefnið (Lands of Butterflies) er alþjóðlegt samstarfsverkefni dreifbýlissvæða í Evrópu. Landsbyggðin lifi tekur þátt í verkefninu sem fulltrúi íslensks dreifbýlis.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Samtökin senda reglulega fulltrúa á ráðstefnur og fundi tengda verkefninu um allt Evrópu.
          </p>
        </div>
      )}
    </StarfidLayout>
  );
}
