import type { Metadata } from "next";
import Link from "next/link";
import { client } from "@/sanity/client";
import { pageByIdQuery, starfidPagesBySectionQuery } from "@/sanity/queries";
import PortableTextRenderer from "@/components/PortableTextRenderer";
import StarfidLayout from "@/components/StarfidLayout";

export const revalidate = 60;
export const metadata: Metadata = { title: "Samstarf Erlendis", description: "Landsbyggðin lifi í alþjóðlegu samstarfi um dreifbýlismál og styrkingu landsbyggðar." };

type DynamicPage = { _id: string; title: string; slug: { current: string } };

const staticLinks = [
  { href: "/starfid/samstarf-erlendis/european-rural-parliament", label: "European Rural Parliament" },
  { href: "/starfid/samstarf-erlendis/hela-norden", label: "Hela norden skal leva" },
];

export default async function Page() {
  const [page, dynamicPages] = await Promise.all([
    client.fetch(pageByIdQuery, { id: "page-starfid-erlent-samstarf" }).catch(() => null),
    client.fetch(starfidPagesBySectionQuery, { section: "samstarf-erlendis" }).catch(() => []),
  ]);

  const subNavLinks = [
    { href: "/starfid/samstarf-erlendis", label: "Yfirlit" },
    ...staticLinks,
    ...(dynamicPages as DynamicPage[]).map((p) => ({
      href: `/starfid/samstarf-erlendis/${p.slug.current}`,
      label: p.title,
    })),
  ];

  return (
    <StarfidLayout title={page?.title || "Samstarf Erlendis"} section="samstarf-erlendis" heroImage={page?.heroImage} subNavLinks={subNavLinks}>
      {page?.body ? <PortableTextRenderer value={page.body} /> : (
        <div>
          <p className="text-gray-600 leading-relaxed mb-8">
            Landsbyggðin lifi er virk þátttakandi í alþjóðlegu samstarfi um dreifbýlismál. Samtökin eiga aðild að nokkrum alþjóðlegum samtökum og verkefnum.
          </p>
          <div className="grid gap-3">
            {staticLinks.map((l) => (
              <Link key={l.href} href={l.href}
                className="flex items-center gap-2 p-4 rounded-lg border border-gray-100 hover:border-teal hover:shadow-sm transition-all text-navy font-medium">
                <span style={{ color: "var(--teal)" }}>→</span> {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
      {dynamicPages.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-bold mb-4" style={{ color: "var(--navy)" }}>Fleiri verkefni</h2>
          <div className="grid gap-3">
            {dynamicPages.map((p: DynamicPage) => (
              <Link key={p._id} href={`/starfid/samstarf-erlendis/${p.slug.current}`}
                className="flex items-center gap-2 p-4 rounded-lg border border-gray-100 hover:border-teal hover:shadow-sm transition-all text-navy font-medium">
                <span style={{ color: "var(--teal)" }}>→</span> {p.title}
              </Link>
            ))}
          </div>
        </div>
      )}
    </StarfidLayout>
  );
}
