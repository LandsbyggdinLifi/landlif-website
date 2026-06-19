import Link from "next/link";
import { client } from "@/sanity/client";
import { siteSettingsQuery } from "@/sanity/queries";

export default async function Footer() {
  const settings = await client.fetch(siteSettingsQuery).catch(() => null);

  const email = settings?.email || "landlif@landlif.is";
  const phone = settings?.phone;
  const address = settings?.address;

  return (
    <footer className="bg-moss-deep text-white border-t-[3px] border-amber">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-serif text-xl font-semibold mb-3">
              {settings?.title || "Landsbyggðin lifi"}
            </h3>
            <p className="text-sm text-white/70 leading-relaxed">
              Samtök um uppbyggingu og styrkingu dreifbýlis á Íslandi.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-amber mb-3">
              Tenglar
            </h4>
            <ul className="space-y-2 text-sm text-white/75">
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
                <Link href="/myndir" className="hover:text-white transition-colors">Myndir</Link>
              </li>
              <li>
                <Link href="/hafa-samband" className="hover:text-white transition-colors">Hafa samband</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-amber mb-3">
              Samband
            </h4>
            <ul className="space-y-2 text-sm text-white/75">
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
        <div className="border-t border-white/15 mt-10 pt-6 text-xs text-white/55 text-center flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© {new Date().getFullYear()} {settings?.title || "Landsbyggðin lifi"}. Öll réttindi áskilin.</span>
          <Link
            href="/studio"
            className="hover:text-white transition-colors"
          >
            Stjórnborð
          </Link>
        </div>
      </div>
    </footer>
  );
}
