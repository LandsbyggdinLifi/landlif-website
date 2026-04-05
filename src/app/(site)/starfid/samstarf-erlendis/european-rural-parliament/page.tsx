import type { Metadata } from "next";
import { client } from "@/sanity/client";
import { pageByIdQuery } from "@/sanity/queries";
import PortableTextRenderer from "@/components/PortableTextRenderer";
import StarfidLayout from "@/components/StarfidLayout";

export const revalidate = 60;
export const metadata: Metadata = { title: "European Rural Parliament", description: "Þátttaka Landsbyggðar lifi í European Rural Parliament, alþjóðlegri ráðstefnu um dreifbýlismál." };

export default async function Page() {
  const page = await client.fetch(pageByIdQuery, { id: "page-starfid-erp" }).catch(() => null);
  return (
    <StarfidLayout title={page?.title || "European Rural Parliament"} section="samstarf-erlendis" heroImage={page?.heroImage}>
      {page?.body ? <PortableTextRenderer value={page.body} /> : (
        <div>
          <p className="text-gray-600 leading-relaxed mb-6">
            Landsbyggðin lifi á aðild að samtökum evrópskra dreifbýlissvæða. Fyrsta evrópska dreifbýlisþingið var haldið árið 2013 í samvinnu við Evrópusambandið í Brussel. Þrjú þing hafa verið haldin og hafa fulltrúar frá yfir 40 löndum tekið þátt. LBL fulltrúar hafa tekið þátt á öllum þingunum.
          </p>
          <a
            href="https://www.europeanruralparliament.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: "var(--teal)" }}
          >
            Heimasíða ERP →
          </a>
        </div>
      )}
    </StarfidLayout>
  );
}
