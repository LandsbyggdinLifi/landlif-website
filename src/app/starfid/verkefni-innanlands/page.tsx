import type { Metadata } from "next";
import Link from "next/link";
import { client } from "@/sanity/client";
import { samtokinPageQuery } from "@/sanity/queries";
import PortableTextRenderer from "@/components/PortableTextRenderer";
import StarfidLayout from "@/components/StarfidLayout";

export const revalidate = 60;
export const metadata: Metadata = { title: "Verkefni innanlands" };

export default async function Page() {
  const page = await client.fetch(samtokinPageQuery, { id: "page-starfid-verkefni-innanlands" }).catch(() => null);
  return (
    <StarfidLayout title={page?.title || "Verkefni innanlands"} section="verkefni-innanlands" heroImage={page?.heroImage}>
      {page?.body ? <PortableTextRenderer value={page.body} /> : (
        <div>
          <p className="text-gray-600 leading-relaxed mb-6">
            Landsbyggðin lifi hefur tekið þátt í ýmsum verkefnum innanlands. Meðal þeirra er könnun árið 2015 á búsetuskilyrðum ungs fólks, unnin í samvinnu við Rannsóknamiðstöð Háskólans á Akureyri.
          </p>
          <p className="text-gray-600 leading-relaxed mb-8">
            Samtökin taka reglulega þátt í byggðaþingum og fundum um dreifbýlismál um allt Ísland.
          </p>
          <h2 className="text-xl font-bold mb-4" style={{ color: "#394c75" }}>Tengd verkefni</h2>
          <div className="grid gap-3">
            {[
              { href: "/starfid/verkefni-innanlands/heimsmarkmid", label: "Heimsmarkmið Sameinuðu þjóðanna" },
              { href: "/starfid/verkefni-innanlands/animation-og-sdg", label: "Animation og SDG" },
              { href: "/starfid/verkefni-innanlands/rha", label: "Verkefni í samstarfi við RHA" },
            ].map((l) => (
              <Link key={l.href} href={l.href}
                className="flex items-center gap-2 p-4 rounded-lg border border-gray-100 hover:border-[#16a085] hover:shadow-sm transition-all text-[#394c75] font-medium">
                <span style={{ color: "#16a085" }}>→</span> {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </StarfidLayout>
  );
}
