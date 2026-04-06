import type { Metadata } from "next";
import Link from "next/link";
import { client } from "@/sanity/client";
import { pageByIdQuery, starfidPagesBySectionQuery } from "@/sanity/queries";
import PortableTextRenderer from "@/components/PortableTextRenderer";
import StarfidLayout from "@/components/StarfidLayout";

export const revalidate = 60;
export const metadata: Metadata = { title: "Verkefni Erlendis", description: "Erlend verkefni sem Landsbyggðin lifi tekur þátt í." };

type DynamicPage = { _id: string; title: string; slug: { current: string } };

export default async function Page() {
  const [page, dynamicPages] = await Promise.all([
    client.fetch(pageByIdQuery, { id: "page-starfid-verkefni-erlendis" }).catch(() => null),
    client.fetch(starfidPagesBySectionQuery, { section: "verkefni-erlendis" }).catch(() => []),
  ]);

  const subNavLinks = [
    { href: "/starfid/verkefni-erlendis", label: "Yfirlit" },
    ...(dynamicPages as DynamicPage[]).map((p) => ({
      href: `/starfid/verkefni-erlendis/${p.slug.current}`,
      label: p.title,
    })),
  ];

  return (
    <StarfidLayout title={page?.title || "Verkefni Erlendis"} section="verkefni-erlendis" heroImage={page?.heroImage} subNavLinks={subNavLinks}>
      {page?.body ? (
        <PortableTextRenderer value={page.body} />
      ) : (
        <p className="text-gray-600 leading-relaxed mb-8">
          Hér birtast erlend verkefni sem Landsbyggðin lifi tekur þátt í.
        </p>
      )}
      {dynamicPages.length > 0 ? (
        <div className="mt-6">
          <div className="grid gap-3">
            {dynamicPages.map((p: DynamicPage) => (
              <Link key={p._id} href={`/starfid/verkefni-erlendis/${p.slug.current}`}
                className="flex items-center gap-2 p-4 rounded-lg border border-gray-100 hover:border-teal hover:shadow-sm transition-all text-navy font-medium">
                <span style={{ color: "var(--teal)" }}>→</span> {p.title}
              </Link>
            ))}
          </div>
        </div>
      ) : (
        !page?.body && <p className="text-gray-400 text-sm mt-4">Engin verkefni skráð enn.</p>
      )}
    </StarfidLayout>
  );
}
