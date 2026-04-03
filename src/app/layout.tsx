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
    default: "Landlíf",
    template: "%s | Landlíf",
  },
  description:
    "Landlíf – samtök um uppbyggingu og styrkingu dreifbýlis á Íslandi.",
  metadataBase: new URL("https://www.landlif.is"),
  openGraph: {
    siteName: "Landlíf",
    locale: "is_IS",
    type: "website",
    title: "Landlíf",
    description: "Landlíf – samtök um uppbyggingu og styrkingu dreifbýlis á Íslandi.",
    images: [{ url: "/logo.png", width: 652, height: 499, alt: "Landlíf" }],
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
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
