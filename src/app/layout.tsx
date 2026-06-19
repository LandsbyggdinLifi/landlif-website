import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

// Body / UI typeface.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Display / heading typeface (variable serif with optical sizing).
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
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
    <html lang="is" className={`${inter.variable} ${fraunces.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
          {children}
          <Analytics />
          <SpeedInsights />
        </body>
    </html>
  );
}
