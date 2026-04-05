import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

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
          {children}
          <Analytics />
        </body>
    </html>
  );
}
