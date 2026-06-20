import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/client";
import { siteSettingsQuery, latestNewsQuery } from "@/sanity/queries";
import { urlFor, hotspotPosition } from "@/sanity/image";
import NewsSection from "@/components/NewsSection";
import PhotoStrip from "@/components/PhotoStrip";

export const revalidate = 0;

async function getData() {
  const [settings, latestNews] = await Promise.all([
    client.fetch(siteSettingsQuery).catch(() => null),
    client.fetch(latestNewsQuery).catch(() => []),
  ]);
  return { settings, latestNews };
}

export default async function HomePage() {
  const { settings, latestNews } = await getData();

  const heroHeading = settings?.heroHeading || "Landlíf";
  const heroSubtext =
    settings?.heroSubtext ||
    "Samtök sem vinna að uppbyggingu og styrkingu dreifbýlis á Íslandi.";
  const missionHeading = settings?.missionHeading || "Hlutverk okkar";
  const missionText =
    settings?.missionText ||
    "Landlíf er þjóðlegt net einstaklinga og samtaka sem vinnur að styrkingu dreifbýlisins. Við tengjum saman einstaklinga og félög sem eru skuldbundin til að efla efnahagslegt og menningarlegt líf á landsbyggðinni.";

  return (
    <>
      {/* Hero */}
      <section className="relative flex items-center text-white bg-moss-deep min-h-[600px]">
        {settings?.heroImage?.asset && (
          <Image
            src={urlFor(settings.heroImage).width(1600).height(900).url()}
            alt="Hero mynd"
            fill
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: hotspotPosition(settings.heroImage) }}
            priority
          />
        )}
        {/* Organic gradient veil for legibility, anchored low */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(36,58,46,0.94) 0%, rgba(36,58,46,0.55) 55%, rgba(36,58,46,0.30) 100%)",
          }}
        />
        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 sm:px-8 py-28">
          <div className="max-w-2xl">
            <span className="block w-12 h-px bg-amber mb-7" />
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight leading-[1.05] mb-6">
              {heroHeading}
            </h1>
            <p className="text-lg sm:text-xl text-white/85 mb-9 max-w-xl leading-relaxed">
              {heroSubtext}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/um-okkur"
                className="inline-block px-8 py-3.5 rounded-full font-semibold text-sm bg-amber text-white hover:bg-amber-dark transition-colors"
              >
                Um okkur
              </Link>
              <Link
                href="/frettir"
                className="inline-block px-8 py-3.5 rounded-full font-semibold text-sm border border-white/70 text-white hover:bg-white hover:text-moss-deep transition-colors"
              >
                Fréttir
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-sand py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <span className="block w-12 h-px bg-amber mx-auto mb-7" />
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-moss-deep mb-6">
            {missionHeading}
          </h2>
          <p className="text-stone text-lg leading-relaxed whitespace-pre-line">{missionText}</p>
        </div>
      </section>

      {/* Feature cards */}
      <section className="py-24 bg-paper">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(settings?.featureCards?.length
              ? settings.featureCards
              : [
                  {
                    title: "Dreifbýlisþróun",
                    body: "Við styðjum verkefni sem styrkja atvinnulíf og þjónustu á landsbyggðinni.",
                  },
                  {
                    title: "Samvinna",
                    body: "Við tengjum saman einstaklinga, sveitarfélög og fyrirtæki í sameiginlegum hagsmunum.",
                  },
                  {
                    title: "Málsvara",
                    body: "Við tökum þátt í stefnumótun og berjumst fyrir réttindum landsbyggðarinnar.",
                  },
                ]
            ).map((card: { title: string; body?: string }) => (
              <article
                key={card.title}
                className="rounded-2xl p-8 bg-white border border-stone/15 transition-shadow hover:shadow-md"
              >
                <span className="block w-12 h-px bg-amber mb-6" />
                <h3 className="font-serif text-xl font-semibold text-moss-deep mb-3">
                  {card.title}
                </h3>
                {card.body && (
                  <p className="text-stone text-[15px] leading-relaxed">{card.body}</p>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Photo strip */}
      {settings?.galleryImages?.length > 0 && <PhotoStrip images={settings.galleryImages} />}

      {/* Latest news */}
      {latestNews?.length > 0 && <NewsSection posts={latestNews} />}

      {/* CTA */}
      <section className="py-24 bg-moss-deep text-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <span className="block w-12 h-px bg-amber mx-auto mb-7" />
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight mb-4">
            {settings?.ctaHeading || "Vertu hluti af Landlífi"}
          </h2>
          <p className="text-white/80 mb-9 text-lg leading-relaxed">
            {settings?.ctaText ||
              "Gakktu til liðs við okkur og styddu uppbyggingu dreifbýlisins."}
          </p>
          <Link
            href="/hafa-samband"
            className="inline-block px-8 py-3.5 rounded-full font-semibold text-sm bg-amber text-white hover:bg-amber-dark transition-colors"
          >
            Hafa samband
          </Link>
        </div>
      </section>
    </>
  );
}
