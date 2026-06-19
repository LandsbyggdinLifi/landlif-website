"use client";

import { useRef } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/image";

type GalleryImage = {
  asset: { _ref: string };
  caption?: string;
  alt?: string;
};

export default function PhotoStrip({ images }: { images: GalleryImage[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "left" ? -340 : 340, behavior: "smooth" });
  };

  if (!images?.length) return null;

  return (
    <section className="py-16 bg-paper">
      <div className="max-w-6xl mx-auto px-6 mb-6 flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-widest text-amber">
          Myndir af viðburðum
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="w-8 h-8 rounded-full flex items-center justify-center text-lg leading-none shadow-sm border border-stone/20 text-moss-deep hover:border-amber transition-colors"
            aria-label="Fyrri myndir"
          >
            ‹
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-8 h-8 rounded-full flex items-center justify-center text-lg leading-none shadow-sm border border-stone/20 text-moss-deep hover:border-amber transition-colors"
            aria-label="Næstu myndir"
          >
            ›
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto px-6"
        style={{ scrollSnapType: "x mandatory", scrollbarWidth: "none" }}
      >
        {/* Left padding sentinel so first photo aligns with content */}
        <div className="flex-shrink-0 w-[calc((100vw-72rem)/2)] max-w-0 md:max-w-none" aria-hidden />
        {images.map((img, i) => (
          <div
            key={i}
            className="flex-shrink-0 relative rounded-2xl overflow-hidden group"
            style={{ width: 320, height: 220, scrollSnapAlign: "start" }}
          >
            <Image
              src={urlFor(img).width(640).height(440).url()}
              alt={img.alt || img.caption || "Viðburðarmynd"}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {img.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-moss-deep/70 text-white text-xs px-3 py-1.5">
                {img.caption}
              </div>
            )}
          </div>
        ))}
        <div className="flex-shrink-0 w-6" aria-hidden />
      </div>
    </section>
  );
}
