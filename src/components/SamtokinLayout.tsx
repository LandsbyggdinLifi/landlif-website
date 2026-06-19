import Image from "next/image";
import { urlFor } from "@/sanity/image";
import SamtokinSubNav from "@/components/SamtokinSubNav";

interface Props {
  title: string;
  heroImage?: { asset: { _ref: string } };
  children: React.ReactNode;
}

export default function SamtokinLayout({ title, heroImage, children }: Props) {
  return (
    <>
      {/* Hero */}
      <section
        className="relative flex items-end"
        style={{ minHeight: "220px", backgroundColor: "var(--navy)" }}
      >
        {heroImage?.asset && (
          <>
            <Image
              src={urlFor(heroImage).width(1600).height(440).url()}
              alt=""
              fill
              className="object-cover"
              priority
            />
            <div
              className="absolute inset-0"
              style={{ backgroundColor: "rgba(28,28,30,0.6)" }}
            />
          </>
        )}
        <div className="relative z-10 max-w-4xl mx-auto px-6 pb-10 pt-20 w-full">
          <p className="text-gray-400 text-sm mb-1">Samtökin</p>
          <h1 className="text-4xl font-bold text-white">{title}</h1>
        </div>
      </section>

      {/* Sub-nav */}
      <div style={{ backgroundColor: "var(--gray-light)" }} className="border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6">
          <SamtokinSubNav />
        </div>
      </div>

      {/* Content */}
      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-6">{children}</div>
      </section>
    </>
  );
}
