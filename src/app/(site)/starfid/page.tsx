import type { Metadata } from "next";
import Link from "next/link";
import { client } from "@/sanity/client";
import { starfidPagesBySectionQuery } from "@/sanity/queries";
import StarfidLayout from "@/components/StarfidLayout";

export const revalidate = 0;
export const metadata: Metadata = { title: "Starfið", description: "Yfirlit yfir starfsemi Landsbyggðar lifi." };

type DynamicPage = { _id: string; title: string; slug: { current: string } };

const sections = [
  { href: "/starfid/samstarf-erlendis", label: "Samstarf Erlendis" },
  { href: "/starfid/verkefni-erlendis", label: "Verkefni Erlendis" },
  { href: "/starfid/samstarf-innanlands", label: "Samstarf Innanlands" },
  { href: "/starfid/verkefni-innanlands", label: "Verkefni Innanlands" },
  { href: "/starfid/fundargerdir", label: "Fundargerðir" },
  { href: "/starfid/stefnumorkun", label: "Stefnumörkun" },
  { href: "/starfid/skipulag-ibuasamtaka", label: "Skipulag íbúasamtaka" },
  { href: "/starfid/byggdastefna", label: "Byggðastefna" },
];

export default async function StarfidPage() {
  const dynamicPages: DynamicPage[] = await client
    .fetch(starfidPagesBySectionQuery, { section: "starfid" })
    .catch(() => []);

  return (
    <StarfidLayout title="Starfið">
      <div>
        <div className="grid gap-3">
          {sections.map((l) => (
            <Link key={l.href} href={l.href}
              className="flex items-center gap-2 p-4 rounded-lg border border-stone/15 hover:border-amber hover:shadow-sm transition-all text-moss-deep font-medium">
              <span className="text-amber">→</span> {l.label}
            </Link>
          ))}
        </div>
        {dynamicPages.length > 0 && (
          <div className="mt-10">
            <h2 className="font-serif text-xl font-semibold mb-4 text-moss-deep">Fleiri síður</h2>
            <div className="grid gap-3">
              {dynamicPages.map((p) => (
                <Link key={p._id} href={`/starfid/${p.slug.current}`}
                  className="flex items-center gap-2 p-4 rounded-lg border border-stone/15 hover:border-amber hover:shadow-sm transition-all text-moss-deep font-medium">
                  <span className="text-amber">→</span> {p.title}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </StarfidLayout>
  );
}
