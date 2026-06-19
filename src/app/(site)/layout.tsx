import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:rounded focus:text-sm focus:font-semibold focus:text-white focus:bg-amber"
      >
        Fara beint í efni
      </a>
      <Navbar />
      <main id="main-content" className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
