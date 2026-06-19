import type { Metadata } from "next";
import { client } from "@/sanity/client";
import { pageByIdQuery } from "@/sanity/queries";
import PortableTextRenderer from "@/components/PortableTextRenderer";
import StarfidLayout from "@/components/StarfidLayout";

export const revalidate = 0;
export const metadata: Metadata = {
  title: "Byggðastefna",
  description: "Byggðastefna og áherslur Landsbyggðar lifi í þágu dreifbýlis á Íslandi.",
};

export default async function Page() {
  const page = await client.fetch(pageByIdQuery, { id: "page-starfid-byggdastefna" }).catch(() => null);
  return (
    <StarfidLayout title={page?.title || "Byggðastefna"} heroImage={page?.heroImage}>
      {page?.body ? (
        <PortableTextRenderer value={page.body} />
      ) : (
        <p className="text-ink/80 leading-relaxed">
          Landsbyggðin lifi vinnur að byggðastefnu sem styrkir búsetu, atvinnulíf og
          þjónustu um allt land. Efni þessarar síðu verður birt þegar það hefur verið
          skráð í Sanity Studio.
        </p>
      )}
    </StarfidLayout>
  );
}
