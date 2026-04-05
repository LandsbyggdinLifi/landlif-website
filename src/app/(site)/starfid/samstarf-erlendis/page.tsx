import type { Metadata } from "next";
import { client } from "@/sanity/client";
import { pageByIdQuery, starfidPagesBySectionQuery } from "@/sanity/queries";
import PortableTextRenderer from "@/components/PortableTextRenderer";
import StarfidLayout from "@/components/StarfidLayout";
import NavCards from "@/components/NavCards";

export const revalidate = 60;
export const metadata: Metadata = { title: "Samstarf Erlendis", description: "Landsbyggðin lifi í alþjóðlegu samstarfi um dreifbýlismál og styrkingu landsbyggðar." };

type DynamicPage = { _id: string; title: string; slug: { current: string } };

const staticCards = [
  { href: "/starfid/samstarf-erlendis/european-rural-parliament", label: "European Rural Parliament" },
  { href: "/starfid/samstarf-erlendis/hela-norden", label: "Hela norden skal leva" },
];

export default async function Page() {
  const [page, dynamicPages] = await Promise.all([
    client.fetch(pageByIdQuery, { id: "page-starfid-erlent-samstarf" }).catch(() => null),
    client.fetch(starfidPagesBySectionQuery, { section: "samstarf-erlendis" }).catch(() => []),
  ]);
  return (
    <StarfidLayout title={page?.title || "Samstarf Erlendis"} section="samstarf-erlendis" heroImage={page?.heroImage}>
      {page?.body ? <PortableTextRenderer value={page.body} /> : (
        <div>
          <p className="text-gray-600 leading-relaxed mb-8">
            Landsbyggðin lifi er virk þátttakandi í alþjóðlegu samstarfi um dreifbýlismál. Samtökin eiga aðild að nokkrum alþjóðlegum samtökum og verkefnum.
          </p>
          <NavCards cards={staticCards} />
        </div>
      )}
      {dynamicPages.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-bold mb-4" style={{ color: "var(--navy)" }}>Fleiri verkefni</h2>
          <NavCards cards={dynamicPages.map((p: DynamicPage) => ({
            href: `/starfid/samstarf-erlendis/${p.slug.current}`,
            label: p.title,
          }))} />
        </div>
      )}
    </StarfidLayout>
  );
}
