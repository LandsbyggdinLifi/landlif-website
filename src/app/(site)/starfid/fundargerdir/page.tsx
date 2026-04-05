import type { Metadata } from "next";
import { client } from "@/sanity/client";
import { pageByIdQuery } from "@/sanity/queries";
import PortableTextRenderer from "@/components/PortableTextRenderer";
import StarfidLayout from "@/components/StarfidLayout";
import NavCards from "@/components/NavCards";

export const revalidate = 60;
export const metadata: Metadata = { title: "Fundargerðir", description: "Fundargerðir stjórnarfunda og aðalfunda Landsbyggðar lifi." };

const staticCards = [
  { href: "/starfid/fundargerdir/adalfundir", label: "Aðalfundir" },
  { href: "/starfid/fundargerdir/stjornarfundir", label: "Stjórnarfundir" },
];

export default async function Page() {
  const page = await client.fetch(pageByIdQuery, { id: "page-starfid-fundargerdir" }).catch(() => null);
  return (
    <StarfidLayout title={page?.title || "Fundargerðir"} section="fundargerdir" heroImage={page?.heroImage}>
      {page?.body ? <PortableTextRenderer value={page.body} /> : (
        <div>
          <p className="text-gray-600 leading-relaxed mb-8">
            Hér má finna fundargerðir frá aðalfundum og stjórnarfundum samtakanna Landsbyggðin lifi.
          </p>
          <NavCards cards={staticCards} />
        </div>
      )}
    </StarfidLayout>
  );
}
