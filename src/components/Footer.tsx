import Link from "next/link";
import { client } from "@/sanity/client";
import { siteSettingsQuery } from "@/sanity/queries";

export default async function Footer() {
  const settings = await client.fetch(siteSettingsQuery).catch(() => null);

  const email = settings?.email || "landlif@landlif.is";
  const phone = settings?.phone;
  const address = settings?.address;

  return (
    <footer style={{ backgroundColor: "var(--navy)" }} className="text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-3">
              {settings?.title || "Landsbyggðin lifi"}
            </h3>
            <p className="text-sm text-blue-100 leading-relaxed">
              Samtök um uppbyggingu og styrkingu dreifbýlis á Íslandi.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-blue-200 mb-3">
              Tenglar
            </h4>
            <ul className="space-y-2 text-sm text-blue-100">
              <li>
                <Link href="/" className="hover:text-white transition-colors">Forsíða</Link>
              </li>
              <li>
                <Link href="/um-okkur" className="hover:text-white transition-colors">Um okkur</Link>
              </li>
              <li>
                <Link href="/frettir" className="hover:text-white transition-colors">Fréttir</Link>
              </li>
              <li>
                <Link href="/hafa-samband" className="hover:text-white transition-colors">Hafa samband</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-blue-200 mb-3">
              Samband
            </h4>
            <ul className="space-y-2 text-sm text-blue-100">
              <li>
                <a href={`mailto:${email}`} className="hover:text-white transition-colors">
                  {email}
                </a>
              </li>
              {phone && (
                <li>
                  <a href={`tel:${phone}`} className="hover:text-white transition-colors">
                    {phone}
                  </a>
                </li>
              )}
              {address && <li>{address}</li>}
            </ul>
          </div>
        </div>
        <div className="border-t border-blue-700 mt-10 pt-6 text-xs text-blue-300 text-center">
          © {new Date().getFullYear()} {settings?.title || "Landsbyggðin lifi"}. Öll réttindi áskilin.
        </div>
      </div>
    </footer>
  );
}
