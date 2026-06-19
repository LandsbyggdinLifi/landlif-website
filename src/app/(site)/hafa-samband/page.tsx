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
      <section
        className="py-20 text-white"
        style={{ backgroundColor: "var(--navy)" }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-4xl font-bold">Hafa samband</h1>
          <p className="text-gray-300 mt-2">
            Við heyrum gjarnan frá þér
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact info */}
          <div>
            <h2
              className="text-2xl font-bold mb-6"
              style={{ color: "var(--navy)" }}
            >
              Upplýsingar
            </h2>
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start gap-3">
                <span
                  className="mt-0.5 flex-shrink-0 w-5 h-5 text-center"
                  style={{ color: "var(--teal)" }}
                >
                  ✉
                </span>
                <a
                  href={`mailto:${email}`}
                  className="hover:underline"
                  style={{ color: "var(--teal)" }}
                >
                  {email}
                </a>
              </li>
              {settings?.phone && (
                <li className="flex items-start gap-3">
                  <span
                    className="mt-0.5 flex-shrink-0"
                    style={{ color: "var(--teal)" }}
                  >
                    ☎
                  </span>
                  <a
                    href={`tel:${settings.phone}`}
                    className="hover:underline"
                    style={{ color: "var(--teal)" }}
                  >
                    {settings.phone}
                  </a>
                </li>
              )}
              {settings?.address && (
                <li className="flex items-start gap-3">
                  <span
                    className="mt-0.5 flex-shrink-0"
                    style={{ color: "var(--teal)" }}
                  >
                    📍
                  </span>
                  <span>{settings.address}</span>
                </li>
              )}
            </ul>
          </div>

          {/* Simple contact form */}
          <div>
            <h2
              className="text-2xl font-bold mb-6"
              style={{ color: "var(--navy)" }}
            >
              Sendu okkur skilaboð
            </h2>
            <ContactForm email={email} />
          </div>
        </div>
      </section>
    </>
  );
}
