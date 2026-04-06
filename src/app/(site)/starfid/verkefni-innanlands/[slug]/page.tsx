import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { client } from "@/sanity/client";
import { starfidPageBySlugQuery, starfidPagesBySectionQuery } from "@/sanity/queries";
import PortableTextRenderer from "@/components/PortableTextRenderer";
import StarfidLayout from "@/components/StarfidLayout";

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

const staticLinks = [
  { href: "/starfid/verkefni-innanlands/heimsmarkmid", label: "Heimsmarkmið Sameinuðu þjóðanna" },
  { href: "/starfid/verkefni-innanlands/animation-og-sdg", label: "Animation og SDG" },
  { href: "/starfid/verkefni-innanlands/rha", label: "Verkefni í samstarfi við RHA" },
];

type SiblingPage = { _id: string; title: string; slug: { current: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await client
    .fetch(starfidPageBySlugQuery, { section: "verkefni-innanlands", slug })
    .catch(() => null);
  return { title: page?.title ?? "Verkefni Innanlands" };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const [page, siblings] = await Promise.all([
    client.fetch(starfidPageBySlugQuery, { section: "verkefni-innanlands", slug }).catch(() => null),
    client.fetch(starfidPagesBySectionQuery, { section: "verkefni-innanlands" }).catch(() => []),
  ]);

  if (!page) notFound();

  const subNavLinks = [
    { href: "/starfid/verkefni-innanlands", label: "Yfirlit" },
    ...staticLinks,
    ...(siblings as SiblingPage[]).map((p) => ({
      href: `/starfid/verkefni-innanlands/${p.slug.current}`,
      label: p.title,
    })),
  ];

  return (
    <StarfidLayout title={page.title} section="verkefni-innanlands" heroImage={page.heroImage} subNavLinks={subNavLinks}>
      {page.body ? (
        <PortableTextRenderer value={page.body} />
      ) : (
        <p className="text-gray-600 leading-relaxed">Efni vantar.</p>
      )}
    </StarfidLayout>
  );
}
