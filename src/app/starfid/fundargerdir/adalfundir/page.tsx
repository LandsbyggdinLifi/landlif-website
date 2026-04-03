import type { Metadata } from "next";
import { client } from "@/sanity/client";
import { samtokinPageQuery } from "@/sanity/queries";
import PortableTextRenderer from "@/components/PortableTextRenderer";
import StarfidLayout from "@/components/StarfidLayout";

export const revalidate = 60;
export const metadata: Metadata = { title: "A\u00F0alfundir" };

export default async function Page() {
  const page = await client.fetch(samtokinPageQuery, { id: "page-starfid-adalfundir" }).catch(() => null);
  return (
    <StarfidLayout title={page?.title || "A\u00F0alfundir"} section="fundargerdir" heroImage={page?.heroImage}>
      {page?.body ? <PortableTextRenderer value={page.body} /> : (
        <div>
          <p className="text-gray-600 leading-relaxed mb-6">Fundargerðir aðalfunda Landsbyggðin lifi.</p>
          <ul className="space-y-3">
            {[
              "Fundargerð LBL 9. jan. 2025",
              "Aðalfundur samtakanna Landsbyggðin lifi árið 2023",
              "Aðalstjórnarmenn LBL 2023",
              "Aðalfundur LBL 2021 Netfundur",
              "Aðalfundur LBL-2019, fundargerð",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 text-gray-700 text-sm">
                <span style={{ color: "#16a085" }}>📄</span> {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </StarfidLayout>
  );
}
