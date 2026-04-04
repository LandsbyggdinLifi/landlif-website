import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/client";
import { siteSettingsQuery, latestNewsQuery } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";
import NewsSection from "@/components/NewsSection";

export const revalidate = 60;

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
      <section
        className="relative flex items-center justify-center text-white"
        style={{ minHeight: "520px", backgroundColor: "var(--navy)" }}
      >
        {settings?.heroImage?.asset && (
          <Image
            src={urlFor(settings.heroImage).width(1600).height(800).url()}
            alt="Hero mynd"
            fill
            className="object-cover"
            priority
          />
        )}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(57,76,117,0.65)" }}
        />
        <div className="relative z-10 text-center max-w-3xl mx-auto px-6 py-24">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 drop-shadow">
            {heroHeading}
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-xl mx-auto leading-relaxed">
            {heroSubtext}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/um-okkur"
              className="inline-block px-7 py-3 rounded-full font-semibold text-sm transition-colors"
              style={{ backgroundColor: "var(--teal)", color: "white" }}
            >
              Um okkur
            </Link>
            <Link
              href="/frettir"
              className="inline-block px-7 py-3 rounded-full font-semibold text-sm border border-white text-white hover:bg-white hover:text-navy transition-colors"
            >
              Fréttir
            </Link>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section style={{ backgroundColor: "var(--gray-light)" }} className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2
            className="text-3xl font-bold mb-6"
            style={{ color: "var(--navy)" }}
          >
            {missionHeading}
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            {missionText}
          </p>
        </div>
      </section>

      {/* Feature cards */}
      {(() => {
        const cards = settings?.featureCards?.length
          ? settings.featureCards
          : [
              { icon: "🌾", title: "Dreifbýlisþróun", body: "Við styðjum verkefni sem styrkja atvinnulíf og þjónustu á landsbyggðinni." },
              { icon: "🤝", title: "Samvinna", body: "Við tengjum saman einstaklinga, sveitarfélög og fyrirtæki í sameiginlegum hagsmunum." },
              { icon: "📢", title: "Málsvara", body: "Við tökum þátt í stefnumótun og berjumst fyrir réttindum landsbyggðarinnar." },
            ];
        return (
          <section className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {cards.map((card: { icon?: string; title: string; body?: string }) => (
                  <div key={card.title} className="rounded-xl p-8 border border-gray-100 shadow-sm text-center">
                    {card.icon && <div className="text-4xl mb-4">{card.icon}</div>}
                    <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--navy)" }}>
                      {card.title}
                    </h3>
                    {card.body && <p className="text-gray-600 text-sm leading-relaxed">{card.body}</p>}
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      })()}

      {/* Latest news */}
      {latestNews?.length > 0 && <NewsSection posts={latestNews} />}

      {/* CTA */}
      <section
        className="py-20 text-white text-center"
        style={{ backgroundColor: "var(--teal)" }}
      >
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-4">
            {settings?.ctaHeading || "Vertu hluti af Landlífi"}
          </h2>
          <p className="text-green-100 mb-8 text-lg">
            {settings?.ctaText || "Gakktu til liðs við okkur og styðtu uppbyggingu dreifbýlisins."}
          </p>
          <Link
            href="/hafa-samband"
            className="inline-block px-8 py-3 rounded-full font-semibold text-sm bg-white transition-colors hover:bg-gray-100"
            style={{ color: "var(--teal)" }}
          >
            Hafa samband
          </Link>
        </div>
      </section>
    </>
  );
}
