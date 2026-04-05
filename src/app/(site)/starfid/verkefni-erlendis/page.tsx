import type { Metadata } from "next";
import { client } from "@/sanity/client";
import { pageByIdQuery, starfidPagesBySectionQuery } from "@/sanity/queries";
import PortableTextRenderer from "@/components/PortableTextRenderer";
import StarfidLayout from "@/components/StarfidLayout";
import NavCards from "@/components/NavCards";

export const revalidate = 60;
export const metadata: Metadata = { title: "Verkefni Erlendis", description: "Erlend verkefni sem Landsbyggðin lifi tekur þátt í." };

type DynamicPage = { _id: string; title: string; slug: { current: string } };

export default async function Page() {
  const [page, dynamicPages] = await Promise.all([
    client.fetch(pageByIdQuery, { id: "page-starfid-verkefni-erlendis" }).catch(() => null),
    client.fetch(starfidPagesBySectionQuery, { section: "verkefni-erlendis" }).catch(() => []),
  ]);
  return (
    <StarfidLayout title={page?.title || "Verkefni Erlendis"} section="verkefni-erlendis" heroImage={page?.heroImage}>
      {page?.body ? (
        <PortableTextRenderer value={page.body} />
      ) : (
        <p className="text-gray-600 leading-relaxed mb-8">
          Hér birtast erlend verkefni sem Landsbyggðin lifi tekur þátt í.
        </p>
      )}
      {dynamicPages.length > 0 ? (
        <div className="mt-6">
          <NavCards cards={dynamicPages.map((p: DynamicPage) => ({
            href: `/starfid/verkefni-erlendis/${p.slug.current}`,
            label: p.title,
          }))} />
        </div>
      ) : (
        !page?.body && <p className="text-gray-400 text-sm mt-4">Engin verkefni skráð enn.</p>
      )}
    </StarfidLayout>
  );
}
