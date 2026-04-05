import type { Metadata } from "next";
import { client } from "@/sanity/client";
import { pageByIdQuery, starfidPagesBySectionQuery } from "@/sanity/queries";
import PortableTextRenderer from "@/components/PortableTextRenderer";
import StarfidLayout from "@/components/StarfidLayout";
import NavCards from "@/components/NavCards";

export const revalidate = 60;
export const metadata: Metadata = { title: "Verkefni Innanlands", description: "Yfirlit yfir verkefni Landsbyggðar lifi innanlands." };

type DynamicPage = { _id: string; title: string; slug: { current: string } };

const staticCards = [
  { href: "/starfid/verkefni-innanlands/heimsmarkmid", label: "Heimsmarkmið Sameinuðu þjóðanna" },
  { href: "/starfid/verkefni-innanlands/animation-og-sdg", label: "Animation og SDG" },
  { href: "/starfid/verkefni-innanlands/rha", label: "Verkefni í samstarfi við RHA" },
];

export default async function Page() {
  const [page, dynamicPages] = await Promise.all([
    client.fetch(pageByIdQuery, { id: "page-starfid-verkefni-innanlands" }).catch(() => null),
    client.fetch(starfidPagesBySectionQuery, { section: "verkefni-innanlands" }).catch(() => []),
  ]);
  return (
    <StarfidLayout title={page?.title || "Verkefni Innanlands"} section="verkefni-innanlands" heroImage={page?.heroImage}>
      {page?.body ? <PortableTextRenderer value={page.body} /> : (
        <div>
          <p className="text-gray-600 leading-relaxed mb-6">
            Landsbyggðin lifi hefur tekið þátt í ýmsum verkefnum innanlands. Meðal þeirra er könnun árið 2015 á búsetuskilyrðum ungs fólks, unnin í samvinnu við Rannsóknamiðstöð Háskólans á Akureyri.
          </p>
          <p className="text-gray-600 leading-relaxed mb-8">
            Samtökin taka reglulega þátt í byggðaþingum og fundum um dreifbýlismál um allt Ísland.
          </p>
          <h2 className="text-xl font-bold mb-4" style={{ color: "var(--navy)" }}>Tengd verkefni</h2>
          <NavCards cards={staticCards} />
        </div>
      )}
      {dynamicPages.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-bold mb-4" style={{ color: "var(--navy)" }}>Fleiri verkefni</h2>
          <NavCards cards={dynamicPages.map((p: DynamicPage) => ({
            href: `/starfid/verkefni-innanlands/${p.slug.current}`,
            label: p.title,
          }))} />
        </div>
      )}
    </StarfidLayout>
  );
}
