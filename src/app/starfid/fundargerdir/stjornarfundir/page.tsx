import type { Metadata } from "next";
import { client } from "@/sanity/client";
import { pageByIdQuery } from "@/sanity/queries";
import PortableTextRenderer from "@/components/PortableTextRenderer";
import StarfidLayout from "@/components/StarfidLayout";

export const revalidate = 60;
export const metadata: Metadata = { title: "Stj\u00F3rnarfundir" };

export default async function Page() {
  const page = await client.fetch(pageByIdQuery, { id: "page-starfid-stjornarfundir" }).catch(() => null);
  return (
    <StarfidLayout title={page?.title || "Stj\u00F3rnarfundir"} section="fundargerdir" heroImage={page?.heroImage}>
      {page?.body ? <PortableTextRenderer value={page.body} /> : (
        <div>
          <p className="text-gray-600 leading-relaxed mb-6">Fundargerðir stjórnarfunda Landsbyggðin lifi.</p>
          <h3 className="font-semibold text-navy mb-3">2025</h3>
          <ul className="space-y-2 mb-6">
            {[
              "Stjórnarfundur 14. ágúst 2025",
              "Fundargerð 15. maí 2025",
              "Fundargerð 10. apríl 2025",
              "Fundargerð 13. mars 2025",
              "Fundargerð 13. febrúar 2025",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 text-gray-700 text-sm">
                <span style={{ color: "var(--teal)" }}>📄</span> {item}
              </li>
            ))}
          </ul>
          <p className="text-sm text-gray-400">Eldri fundargerðir eru aðgengilegar í beiðni.</p>
        </div>
      )}
    </StarfidLayout>
  );
}
