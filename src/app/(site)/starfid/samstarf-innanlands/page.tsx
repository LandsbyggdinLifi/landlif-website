import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { client } from "@/sanity/client";
import { pageByIdQuery, starfidPagesBySectionQuery } from "@/sanity/queries";
import PortableTextRenderer from "@/components/PortableTextRenderer";
import StarfidLayout from "@/components/StarfidLayout";

export const revalidate = 60;
export const metadata: Metadata = { title: "Samstarf Innanlands", description: "Samstarf Landsbyggðar lifi við íslenskar stofnanir og samtök." };

type DynamicPage = { _id: string; title: string; navTitle?: string; slug: { current: string } };

export default async function Page() {
  const [page, dynamicPages] = await Promise.all([
    client.fetch(pageByIdQuery, { id: "page-starfid-samstarf-innanlands" }).catch(() => null),
    client.fetch(starfidPagesBySectionQuery, { section: "samstarf-innanlands" }).catch(() => []),
  ]);

  const pages = dynamicPages as DynamicPage[];

  if (pages.length > 0) {
    redirect(`/starfid/samstarf-innanlands/${pages[0].slug.current}`);
  }

  const subNavLinks = pages.map((p) => ({
    href: `/starfid/samstarf-innanlands/${p.slug.current}`,
    label: p.navTitle ?? p.title,
  }));

  return (
    <StarfidLayout title={page?.title || "Samstarf Innanlands"} section="samstarf-innanlands" heroImage={page?.heroImage} subNavLinks={subNavLinks} navLayout="horizontal">
      {page?.body ? (
        <PortableTextRenderer value={page.body} />
      ) : (
        <p className="text-ink/80 leading-relaxed">
          Hér birtast samstarfsverkefni Landsbyggðar lifi við íslenskar stofnanir og samtök.
        </p>
      )}
    </StarfidLayout>
  );
}
