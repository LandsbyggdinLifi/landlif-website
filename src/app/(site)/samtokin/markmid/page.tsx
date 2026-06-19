import type { Metadata } from "next";
import { client } from "@/sanity/client";
import { pageByIdQuery } from "@/sanity/queries";
import PortableTextRenderer from "@/components/PortableTextRenderer";
import SamtokinLayout from "@/components/SamtokinLayout";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Markmið",
  description: "Markmið samtakanna Landsbyggðin lifi.",
};

export default async function MarkmiðPage() {
  const page = await client
    .fetch(pageByIdQuery, { id: "page-markmid" })
    .catch(() => null);

  return (
    <SamtokinLayout title={page?.title || "Markmið"} heroImage={page?.heroImage}>
      {page?.body ? (
        <PortableTextRenderer value={page.body} />
      ) : (
        <div>
          <p className="text-ink/80 text-lg leading-relaxed mb-6">
            „Landsbyggðin lifi“ – þetta er markmið samtakanna.
          </p>
          <p className="text-ink/80 leading-relaxed mb-6">
            Samtökin leggja áherslu á að tengja saman fólk og byggja upp sterk
            samtök. Þau starfa sem samstarfsvettvangur einstaklinga og sjálfstæðra
            hagsmunahópa sem eru skuldbundin til að styrkja og þróa heimabyggð
            sína, og stuðla að samræmdri uppbyggingu landsbyggðarinnar um allt land
            – bæði í efnahagslegum og menningarlegum skilningi.
          </p>
          <p className="text-ink/80 leading-relaxed mb-6">
            Samtökin taka þátt í verkefnum með erlendum samtökum og senda reglulega
            fulltrúa á dreifbýlisráðstefnur um allt Evrópu.
          </p>
        </div>
      )}
    </SamtokinLayout>
  );
}
