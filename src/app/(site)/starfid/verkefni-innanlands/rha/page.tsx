import type { Metadata } from "next";
import { client } from "@/sanity/client";
import { pageByIdQuery } from "@/sanity/queries";
import PortableTextRenderer from "@/components/PortableTextRenderer";
import StarfidLayout from "@/components/StarfidLayout";

export const revalidate = 60;
export const metadata: Metadata = { title: "Verkefni \u00ED samstarfi vi\u00F0 RHA", description: "Samstarfsverkefni Landsbygg\u00F0ar lifi og Rannsk\u00F3knamist\u00F6\u00F0var H\u00E1sk\u00F3lans \u00E1 Akureyri." };

export default async function Page() {
  const page = await client.fetch(pageByIdQuery, { id: "page-starfid-rha" }).catch(() => null);
  return (
    <StarfidLayout title={page?.title || "Verkefni \u00ED samstarfi vi\u00F0 RHA"} section="verkefni-innanlands" heroImage={page?.heroImage}>
      {page?.body ? <PortableTextRenderer value={page.body} /> : (
        <div>
          <h2 className="text-xl font-bold mb-4" style={{ color: "var(--navy)" }}>Netkönnun um búsetuskilyrði ungs fólks</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            Þetta verkefni var unnið í samvinnu við Rannsóknamiðstöð Háskólans á Akureyri (RHA). Markmið rannsóknarinnar var að safna gögnum um viðhorf yngri aldurshópa til búsetuskilyrða.
          </p>
          <p className="text-gray-600 leading-relaxed mb-6">
            Sérfræðingar rannsóknamiðstöðvarinnar unnu með forsvarmönnum samtakanna að þróun spurningalista sem var dreift í gegnum netkönnun. Samtökin nýttu tengslanet sitt til að afla netfanga einstaklinga á aldrinum 18–35 ára sem búa á eða tengjast dreifbýlissvæðum.
          </p>
        </div>
      )}
    </StarfidLayout>
  );
}
