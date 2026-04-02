import type { Metadata } from "next";
import { client } from "@/sanity/client";
import { siteSettingsQuery } from "@/sanity/queries";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Hafa samband",
  description: "Hafðu samband við Landlíf.",
};

export default async function ContactPage() {
  const settings = await client.fetch(siteSettingsQuery).catch(() => null);

  return (
    <>
      <section
        className="py-20 text-white"
        style={{ backgroundColor: "#394c75" }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-4xl font-bold">Hafa samband</h1>
          <p className="text-blue-200 mt-2">
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
              style={{ color: "#394c75" }}
            >
              Upplýsingar
            </h2>
            <ul className="space-y-4 text-gray-700">
              {(settings?.email || "landlif@landlif.is") && (
                <li className="flex items-start gap-3">
                  <span
                    className="mt-0.5 flex-shrink-0 w-5 h-5 text-center"
                    style={{ color: "#16a085" }}
                  >
                    ✉
                  </span>
                  <a
                    href={`mailto:${settings?.email || "landlif@landlif.is"}`}
                    className="hover:underline"
                    style={{ color: "#16a085" }}
                  >
                    {settings?.email || "landlif@landlif.is"}
                  </a>
                </li>
              )}
              {settings?.phone && (
                <li className="flex items-start gap-3">
                  <span
                    className="mt-0.5 flex-shrink-0"
                    style={{ color: "#16a085" }}
                  >
                    ☎
                  </span>
                  <a
                    href={`tel:${settings.phone}`}
                    className="hover:underline"
                    style={{ color: "#16a085" }}
                  >
                    {settings.phone}
                  </a>
                </li>
              )}
              {settings?.address && (
                <li className="flex items-start gap-3">
                  <span
                    className="mt-0.5 flex-shrink-0"
                    style={{ color: "#16a085" }}
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
              style={{ color: "#394c75" }}
            >
              Sendu okkur skilaboð
            </h2>
            <form
              action={`mailto:${settings?.email || "landlif@landlif.is"}`}
              method="get"
              className="space-y-4"
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Nafn
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16a085]"
                  placeholder="Nafn þitt"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Netfang
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16a085]"
                  placeholder="netfang@example.is"
                />
              </div>
              <div>
                <label
                  htmlFor="body"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Skilaboð
                </label>
                <textarea
                  id="body"
                  name="body"
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16a085]"
                  placeholder="Hvernig getum við aðstoðað?"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-lg text-white font-semibold transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#16a085" }}
              >
                Senda skilaboð
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
