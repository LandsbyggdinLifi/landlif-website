import type { Metadata } from "next";
import { client } from "@/sanity/client";
import { siteSettingsQuery } from "@/sanity/queries";
import ContactForm from "@/components/ContactForm";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Hafa samband",
  description: "Hafðu samband við Landlíf.",
};

export default async function ContactPage() {
  const settings = await client.fetch(siteSettingsQuery).catch(() => null);
  const email = settings?.email || "landlif@landlif.is";

  return (
    <>
      <section className="py-20 bg-moss-deep text-white">
        <div className="max-w-6xl mx-auto px-6">
          <span className="block w-12 h-px bg-amber mb-5" />
          <h1 className="font-serif text-4xl sm:text-5xl font-semibold tracking-tight">
            Hafa samband
          </h1>
          <p className="text-white/70 mt-3">Við heyrum gjarnan frá þér</p>
        </div>
      </section>

      <section className="py-16 bg-paper">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact info */}
          <div>
            <h2 className="font-serif text-2xl font-semibold mb-6 text-moss-deep">
              Upplýsingar
            </h2>
            <ul className="space-y-4 text-ink/80">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex-shrink-0 w-5 h-5 text-center text-amber">
                  ✉
                </span>
                <a href={`mailto:${email}`} className="text-moss hover:text-amber transition-colors">
                  {email}
                </a>
              </li>
              {settings?.phone && (
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 flex-shrink-0 text-amber">☎</span>
                  <a href={`tel:${settings.phone}`} className="text-moss hover:text-amber transition-colors">
                    {settings.phone}
                  </a>
                </li>
              )}
              {settings?.address && (
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 flex-shrink-0 text-amber">📍</span>
                  <span>{settings.address}</span>
                </li>
              )}
            </ul>
          </div>

          {/* Simple contact form */}
          <div>
            <h2 className="font-serif text-2xl font-semibold mb-6 text-moss-deep">
              Sendu okkur skilaboð
            </h2>
            <ContactForm email={email} />
          </div>
        </div>
      </section>
    </>
  );
}
