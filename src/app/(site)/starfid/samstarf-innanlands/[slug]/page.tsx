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

type SiblingPage = { _id: string; title: string; navTitle?: string; slug: { current: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await client
    .fetch(starfidPageBySlugQuery, { section: "samstarf-innanlands", slug })
    .catch(() => null);
  return { title: page?.title ?? "Samstarf Innanlands" };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const [page, siblings] = await Promise.all([
    client.fetch(starfidPageBySlugQuery, { section: "samstarf-innanlands", slug }).catch(() => null),
    client.fetch(starfidPagesBySectionQuery, { section: "samstarf-innanlands" }).catch(() => []),
  ]);

  if (!page) notFound();

  const subNavLinks = (siblings as SiblingPage[]).map((p) => ({
    href: `/starfid/samstarf-innanlands/${p.slug.current}`,
    label: p.navTitle ?? p.title,
  }));

  return (
    <StarfidLayout title={page.title} section="samstarf-innanlands" heroImage={page.heroImage} subNavLinks={subNavLinks} navLayout="horizontal">
      {page.body ? (
        <PortableTextRenderer value={page.body} />
      ) : (
        <p className="text-ink/80 leading-relaxed">Efni vantar.</p>
      )}
    </StarfidLayout>
  );
}
