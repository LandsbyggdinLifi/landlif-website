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
      <section className="relative flex items-end bg-moss-deep min-h-[260px]">
        {heroImage?.asset && (
          <>
            <Image
              src={urlFor(heroImage).width(1600).height(520).url()}
              alt=""
              fill
              className="object-cover"
              priority
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(36,58,46,0.92) 0%, rgba(36,58,46,0.45) 100%)",
              }}
            />
          </>
        )}
        <div className="relative z-10 max-w-4xl mx-auto px-6 pb-10 pt-24 w-full">
          <p className="text-amber text-xs font-semibold uppercase tracking-widest mb-2">
            Samtökin
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-semibold tracking-tight text-white">
            {title}
          </h1>
        </div>
      </section>

      {/* Sub-nav */}
      <div className="bg-sand border-b border-stone/15">
        <div className="max-w-4xl mx-auto px-6">
          <SamtokinSubNav />
        </div>
      </div>

      {/* Content */}
      <section className="py-14 bg-paper">
        <div className="max-w-3xl mx-auto px-6">{children}</div>
      </section>
    </>
  );
}
