import type { Metadata } from "next";
import { client } from "@/sanity/client";
import { pageByIdQuery } from "@/sanity/queries";
import PortableTextRenderer from "@/components/PortableTextRenderer";
import StarfidLayout from "@/components/StarfidLayout";

export const revalidate = 60;
export const metadata: Metadata = { title: "Animation og SDG", description: "Verkefni Landsbyggðar lifi tengd heimsmarkmiðum og animation." };

export default async function Page() {
  const page = await client.fetch(pageByIdQuery, { id: "page-starfid-animation-sdg" }).catch(() => null);
  return (
    <StarfidLayout title={page?.title || "Animation og SDG"} section="verkefni-innanlands" heroImage={page?.heroImage}>
      {page?.body ? <PortableTextRenderer value={page.body} /> : (
        <div>
          <p className="text-gray-600 leading-relaxed mb-6">
            Starf Landsbyggðin lifi er fjölbreytt og áhugavert. Meðlimir taka þátt í verkefnum með öðrum erlendum samtökum og senda reglulega fulltrúa á dreifbýlisþing um allt Evrópu.
          </p>
        </div>
      )}
    </StarfidLayout>
  );
}
