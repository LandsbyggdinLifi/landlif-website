import type { Metadata } from "next";
import Link from "next/link";
import { client } from "@/sanity/client";
import { pageByIdQuery } from "@/sanity/queries";
import PortableTextRenderer from "@/components/PortableTextRenderer";
import StarfidLayout from "@/components/StarfidLayout";

export const revalidate = 60;
export const metadata: Metadata = { title: "Fundarger\u00F0ir" };

export default async function Page() {
  const page = await client.fetch(pageByIdQuery, { id: "page-starfid-fundargerdir" }).catch(() => null);
  return (
    <StarfidLayout title={page?.title || "Fundarger\u00F0ir"} section="fundargerdir" heroImage={page?.heroImage}>
      {page?.body ? <PortableTextRenderer value={page.body} /> : (
        <div>
          <p className="text-gray-600 leading-relaxed mb-8">
            Hér má finna fundargerðir frá aðalfundum og stjórnarfundum samtakanna Landsbyggðin lifi.
          </p>
          <div className="grid gap-3">
            {[
              { href: "/starfid/fundargerdir/adalfundir", label: "A\u00F0alfundir" },
              { href: "/starfid/fundargerdir/stjornarfundir", label: "Stj\u00F3rnarfundir" },
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
