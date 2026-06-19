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
    "Landlíf er þjóðlegt net einstaklinga og samtaka sem vinnur að styrkingu dreifbýlisins. Við tengim saman einstaklinga og félög sem eru skuldbundin til að efla efnahagslegt og menningarlegt líf á landsbyggðinni.";

  return (
    <>
      {/* Hero */}
      <section className="relative flex items-center text-white bg-moss-deep min-h-[600px]">
        {settings?.heroImage?.asset && (
          <Image
            src={urlFor(settings.heroImage).width(1600).height(900).url()}
            alt="Hero mynd"
            fill
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
          <p className="text-stone text-lg leading-relaxed">{missionText}</p>
        </div>
      </section>

      {/* Feature cards */}
      <section className="py-24 bg-paper">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {settings?.featureCards?.length
              ? settings.featureCards.map(
                  (card: { icon?: string; title: string; body?: string }) => (
                    <article
                      key={card.title}
                      className="rounded-2xl p-8 bg-white border border-stone/15 transition-shadow hover:shadow-md"
                    >
                      {card.icon && <div className="text-4xl mb-5">{card.icon}</div>}
                      <h3 className="font-serif text-xl font-semibold text-moss-deep mb-3">
                        {card.title}
                      </h3>
                      {card.body && (
                        <p className="text-stone text-[15px] leading-relaxed">
                          {card.body}
                        </p>
                      )}
                    </article>
                  )
                )
              : [
                  {
                    title: "Dreifbýlisþróun",
                    body: "Við styðjum verkefni sem styrkja atvinnulíf og þjónustu á landsbyggðinni.",
                    svg: (
                      <svg className="mb-5 w-10 h-10 text-amber" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                      </svg>
                    ),
                  },
                  {
                    title: "Samvinna",
                    body: "Við tengjum saman einstaklinga, sveitarfélög og fyrirtæki í sameiginlegum hagsmunum.",
                    svg: (
                      <svg className="mb-5 w-10 h-10 text-amber" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                      </svg>
                    ),
                  },
                  {
                    title: "Málsvara",
                    body: "Við tökum þátt í stefnumótun og berjumst fyrir réttindum landsbyggðarinnar.",
                    svg: (
                      <svg className="mb-5 w-10 h-10 text-amber" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46" />
                      </svg>
                    ),
                  },
                ].map((card) => (
                  <article
                    key={card.title}
                    className="rounded-2xl p-8 bg-white border border-stone/15 transition-shadow hover:shadow-md"
                  >
                    {card.svg}
                    <h3 className="font-serif text-xl font-semibold text-moss-deep mb-3">
                      {card.title}
                    </h3>
                    <p className="text-stone text-[15px] leading-relaxed">{card.body}</p>
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
              "Gakktu til liðs við okkur og styðtu uppbyggingu dreifbýlisins."}
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
