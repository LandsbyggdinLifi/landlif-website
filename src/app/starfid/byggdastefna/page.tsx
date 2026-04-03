import type { Metadata } from "next";
import { client } from "@/sanity/client";
import { pageByIdQuery } from "@/sanity/queries";
import PortableTextRenderer from "@/components/PortableTextRenderer";
import StarfidLayout from "@/components/StarfidLayout";

export const revalidate = 60;
export const metadata: Metadata = { title: "Bygg\u00F0astefna" };

export default async function Page() {
  const page = await client.fetch(pageByIdQuery, { id: "page-starfid-byggdastefna" }).catch(() => null);
  return (
    <StarfidLayout title={page?.title || "Bygg\u00F0astefna"} heroImage={page?.heroImage}>
      {page?.body ? <PortableTextRenderer value={page.body} /> : (
        <div>
          <blockquote className="border-l-4 pl-4 italic text-gray-600 mb-6" style={{ borderColor: "#16a085" }}>
            &ldquo;Byggðastefna er ekki skrifuð fyrir dreifbýlið á Íslandi heldur landið allt.&rdquo;
          </blockquote>
          <p className="text-gray-600 leading-relaxed mb-6">
            Stefnan tryggir að íbúar skilji val sitt þegar þeir velja búsetu og fjárfestingarstaðsetningu. Hún snýst um heildstæða sýn á uppbyggingu samfélagsins um allt land.
          </p>
          <div className="mt-8 p-5 rounded-xl bg-gray-50 border border-gray-100">
            <p className="text-sm font-medium text-[#394c75] mb-1">Skjal til niðurhals</p>
            <p className="text-sm text-gray-600">Byggðastefna yfirfarið (PDF)</p>
          </div>
        </div>
      )}
    </StarfidLayout>
  );
}
