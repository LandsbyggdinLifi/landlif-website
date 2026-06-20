import type { Metadata } from "next";
import { client } from "@/sanity/client";
import { pageByIdQuery } from "@/sanity/queries";
import PortableTextRenderer from "@/components/PortableTextRenderer";
import StarfidLayout from "@/components/StarfidLayout";

export const revalidate = 0;
export const metadata: Metadata = { title: "Skipulag \u00EDb\u00FAasamtaka", description: "Lei\u00F0beiningar og g\u00F6gn um skipulag \u00EDb\u00FAasamtaka \u00E1 landsbygg\u00F0inni." };

export default async function Page() {
  const page = await client.fetch(pageByIdQuery, { id: "page-starfid-skipulag-ibuasamtaka" }).catch(() => null);
  return (
    <StarfidLayout title={page?.title || "Skipulag \u00EDb\u00FAasamtaka"} heroImage={page?.heroImage}>
      {page?.body ? <PortableTextRenderer value={page.body} /> : (
        <div>
          <p className="text-ink/80 leading-relaxed mb-6">
            &ldquo;Íbúasamtök&rdquo; er hugtak sem nær yfir ýmsar tegundir af frjálsum félagasamtökum sem beinast að búsetuháttum, samfélagsumhverfi og velferð borgaranna á landsvæðum sem eru landsvæðislega skilgreind.
          </p>
          <p className="text-ink/80 leading-relaxed mb-6">
            Samtökin veita leiðsögn fyrir samfélagshópa sem skortir uppbyggingu og stefnu, og hjálpa þeim að takast á við sameiginlegar áskoranir með kerfisbundinni nálgun við þróun verkefna og lausna.
          </p>
          <div className="mt-8 p-5 rounded-xl bg-sand/50 border border-stone/15">
            <p className="text-sm font-medium text-moss-deep mb-1">Skjal til niðurhals</p>
            <p className="text-sm text-stone">Skipulagning starfsemi íbúasamtaka 2017</p>
          </div>
        </div>
      )}
    </StarfidLayout>
  );
}
