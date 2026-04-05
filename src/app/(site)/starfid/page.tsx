import type { Metadata } from "next";
import { client } from "@/sanity/client";
import { starfidPagesBySectionQuery } from "@/sanity/queries";
import StarfidLayout from "@/components/StarfidLayout";
import NavCards from "@/components/NavCards";

export const revalidate = 60;
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
];

export default async function StarfidPage() {
  const dynamicPages: DynamicPage[] = await client
    .fetch(starfidPagesBySectionQuery, { section: "starfid" })
    .catch(() => []);

  return (
    <StarfidLayout title="Starfið">
      <div>
        <NavCards cards={sections} />
        {dynamicPages.length > 0 && (
          <div className="mt-10">
            <h2 className="text-xl font-bold mb-4" style={{ color: "var(--navy)" }}>Fleiri síður</h2>
            <NavCards cards={dynamicPages.map((p) => ({
              href: `/starfid/${p.slug.current}`,
              label: p.title,
            }))} />
          </div>
        )}
      </div>
    </StarfidLayout>
  );
}
