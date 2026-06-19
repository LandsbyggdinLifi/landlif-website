import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { client } from "@/sanity/client";
import { pageByIdQuery, starfidPagesBySectionQuery } from "@/sanity/queries";
import PortableTextRenderer from "@/components/PortableTextRenderer";
import StarfidLayout from "@/components/StarfidLayout";

export const revalidate = 0;
export const metadata: Metadata = { title: "Verkefni Erlendis", description: "Erlend verkefni sem Landsbyggðin lifi tekur þátt í." };

type DynamicPage = { _id: string; title: string; navTitle?: string; slug: { current: string } };

export default async function Page() {
  const [page, dynamicPages] = await Promise.all([
    client.fetch(pageByIdQuery, { id: "page-starfid-verkefni-erlendis" }).catch(() => null),
    client.fetch(starfidPagesBySectionQuery, { section: "verkefni-erlendis" }).catch(() => []),
  ]);

  const pages = dynamicPages as DynamicPage[];

  if (pages.length > 0) {
    redirect(`/starfid/verkefni-erlendis/${pages[0].slug.current}`);
  }

  const subNavLinks = pages.map((p) => ({
    href: `/starfid/verkefni-erlendis/${p.slug.current}`,
    label: p.navTitle ?? p.title,
  }));

  return (
    <StarfidLayout title={page?.title || "Verkefni Erlendis"} section="verkefni-erlendis" heroImage={page?.heroImage} subNavLinks={subNavLinks} navLayout="horizontal">
      {page?.body ? (
        <PortableTextRenderer value={page.body} />
      ) : (
        <p className="text-ink/80 leading-relaxed">
          Hér birtast erlend verkefni sem Landsbyggðin lifi tekur þátt í.
        </p>
      )}
    </StarfidLayout>
  );
}
