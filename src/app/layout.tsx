import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Landsbyggðin lifi",
    template: "%s | Landsbyggðin lifi",
  },
  description:
    "Landlíf – samtök um uppbyggingu og styrkingu dreifbýlis á Íslandi.",
  metadataBase: new URL("https://www.landlif.is"),
  openGraph: {
    siteName: "Landsbyggðin lifi",
    locale: "is_IS",
    type: "website",
    title: "Landsbyggðin lifi",
    description: "Landlíf – samtök um uppbyggingu og styrkingu dreifbýlis á Íslandi.",
    images: [{ url: "/logo.png", width: 652, height: 499, alt: "Landsbyggðin lifi" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="is" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:rounded focus:text-sm focus:font-semibold focus:text-white"
          style={{ backgroundColor: "var(--teal)" }}
        >
          Fara beint í efni
        </a>
        <Navbar />
        <main id="main-content" className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
