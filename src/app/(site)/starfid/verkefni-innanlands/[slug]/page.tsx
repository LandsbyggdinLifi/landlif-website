import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { client } from "@/sanity/client";
import { starfidPageBySlugQuery } from "@/sanity/queries";
import PortableTextRenderer from "@/components/PortableTextRenderer";
import StarfidLayout from "@/components/StarfidLayout";

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await client
    .fetch(starfidPageBySlugQuery, { section: "verkefni-innanlands", slug })
    .catch(() => null);
  return { title: page?.title ?? "Verkefni Innanlands" };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const page = await client
    .fetch(starfidPageBySlugQuery, { section: "verkefni-innanlands", slug })
    .catch(() => null);

  if (!page) notFound();

  return (
    <StarfidLayout title={page.title} section="verkefni-innanlands" heroImage={page.heroImage}>
      {page.body ? (
        <PortableTextRenderer value={page.body} />
      ) : (
        <p className="text-gray-600 leading-relaxed">Efni vantar.</p>
      )}
    </StarfidLayout>
  );
}
