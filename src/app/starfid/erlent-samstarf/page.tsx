import type { Metadata } from "next";
import Link from "next/link";
import { client } from "@/sanity/client";
import { pageByIdQuery } from "@/sanity/queries";
import PortableTextRenderer from "@/components/PortableTextRenderer";
import StarfidLayout from "@/components/StarfidLayout";

export const revalidate = 60;
export const metadata: Metadata = { title: "Erlent samstarf", description: "Landsbyggðin lifi í alþjóðlegu samstarfi um dreifbýlismál og styrkingu landsbyggðar." };

export default async function Page() {
  const page = await client.fetch(pageByIdQuery, { id: "page-starfid-erlent-samstarf" }).catch(() => null);
  return (
    <StarfidLayout title={page?.title || "Erlent samstarf"} section="erlent-samstarf" heroImage={page?.heroImage}>
      {page?.body ? <PortableTextRenderer value={page.body} /> : (
        <div>
          <p className="text-gray-600 leading-relaxed mb-8">
            Landsbyggðin lifi er virk þátttakandi í alþjóðlegu samstarfi um dreifbýlismál. Samtökin eiga aðild að nokkrum alþjóðlegum samtökum og verkefnum.
          </p>
          <div className="grid gap-3">
            {[
              { href: "/starfid/erlent-samstarf/erlend-verkefni", label: "Erlend verkefni" },
              { href: "/starfid/erlent-samstarf/european-rural-parliament", label: "European Rural Parliament" },
              { href: "/starfid/erlent-samstarf/fidrildaverkefnid", label: "Fi\u00F0rildaverkefni\u00F0" },
              { href: "/starfid/erlent-samstarf/finnskaverkefnid", label: "Finnskaverkefni\u00F0" },
              { href: "/starfid/erlent-samstarf/hela-norden", label: "Hela norden skal leva" },
            ].map((l) => (
              <Link key={l.href} href={l.href}
                className="flex items-center gap-2 p-4 rounded-lg border border-gray-100 hover:border-teal hover:shadow-sm transition-all text-navy font-medium">
                <span style={{ color: "var(--teal)" }}>→</span> {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </StarfidLayout>
  );
}
