import type { Metadata } from "next";
import Image from "next/image";
import { client } from "@/sanity/client";
import { aboutPageQuery } from "@/sanity/queries";
import { urlFor, hotspotPosition } from "@/sanity/image";
import PortableTextRenderer from "@/components/PortableTextRenderer";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Um okkur",
  description: "Kynntu þér Landlíf – samtök um uppbyggingu dreifbýlis á Íslandi.",
};

export default async function AboutPage() {
  const page = await client
    .fetch(aboutPageQuery)
    .catch(() => null);

  return (
    <>
      {/* Hero */}
      <section className="relative flex items-end bg-moss-deep min-h-[300px]">
        {page?.heroImage?.asset && (
          <>
            <Image
              src={urlFor(page.heroImage).width(1600).height(600).url()}
              alt=""
              fill
              className="object-cover"
              style={{ objectPosition: hotspotPosition(page.heroImage) }}
              priority
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(36,58,46,0.92) 0%, rgba(36,58,46,0.45) 100%)",
              }}
            />
          </>
        )}
        <div className="relative z-10 max-w-4xl mx-auto px-6 pb-12 pt-24 w-full">
          <span className="block w-12 h-px bg-amber mb-5" />
          <h1 className="font-serif text-4xl sm:text-5xl font-semibold tracking-tight text-white">
            {page?.title || "Um okkur"}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-paper">
        <div className="max-w-3xl mx-auto px-6">
          {page?.body ? (
            <PortableTextRenderer value={page.body} />
          ) : (
            <div className="prose max-w-none">
              <p className="text-ink/80 text-lg leading-relaxed mb-6">
                Landlíf er þjóðlegt net einstaklinga og samtaka sem vinnur
                að uppbyggingu og styrkingu dreifbýlis á Íslandi.
              </p>
              <p className="text-ink/80 leading-relaxed mb-6">
                Markmið okkar er að tengja saman einstaklinga, sveitarfélög
                og fyrirtæki sem skuldbundin eru til að efla efnahagslegt og
                menningarlegt líf á landsbyggðinni. Við tökum þátt í
                stefnumótun og berjumst fyrir réttindum þeirra sem búa og
                starfa á dreifbýlissvæðum.
              </p>
              <h2 className="font-serif text-2xl font-semibold mt-10 mb-4 text-moss-deep">
                Saga samtakanna
              </h2>
              <p className="text-ink/80 leading-relaxed mb-6">
                Landlíf var stofnað af hópi einstaklinga sem þekktu til
                þarfa landsbyggðarinnar og vildu stuðla að jákvæðri þróun í
                dreifbýli. Frá upphafi hefur samtakin lagt áherslu á samvinnu
                og grasrótarþátttöku.
              </p>
              <h2 className="font-serif text-2xl font-semibold mt-10 mb-4 text-moss-deep">
                Starfsemi
              </h2>
              <ul className="list-disc list-inside space-y-2 text-ink/80 mb-6">
                <li>Málstofa og ráðstefnur um dreifbýlismál</li>
                <li>Stuðningur við grasrótarverkefni á landsbyggðinni</li>
                <li>Þátttaka í stefnumótunarvinnu á ríkis- og sveitarstjórnarstigi</li>
                <li>Tengslanet einstaklinga og félaga með sameiginlega hagsmuni</li>
              </ul>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
