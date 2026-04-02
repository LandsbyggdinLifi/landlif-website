import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#394c75" }} className="text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-3">Landsbyggðin lifi</h3>
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
                <Link href="/" className="hover:text-white transition-colors">
                  Forsíða
                </Link>
              </li>
              <li>
                <Link
                  href="/um-okkur"
                  className="hover:text-white transition-colors"
                >
                  Um okkur
                </Link>
              </li>
              <li>
                <Link
                  href="/frettir"
                  className="hover:text-white transition-colors"
                >
                  Fréttir
                </Link>
              </li>
              <li>
                <Link
                  href="/hafa-samband"
                  className="hover:text-white transition-colors"
                >
                  Hafa samband
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-blue-200 mb-3">
              Samband
            </h4>
            <ul className="space-y-2 text-sm text-blue-100">
              <li>
                <a
                  href="mailto:landlif@landlif.is"
                  className="hover:text-white transition-colors"
                >
                  landlif@landlif.is
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-blue-700 mt-10 pt-6 text-xs text-blue-300 text-center">
          © {new Date().getFullYear()} Landsbyggðin lifi. Öll réttindi áskilin.
        </div>
      </div>
    </footer>
  );
}
