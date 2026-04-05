"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";

type Photo = {
  src: string;
  alt: string;
  caption?: string;
};

interface Props {
  photos: Photo[];
}

export default function PhotoLightbox({ photos }: Props) {
  const [index, setIndex] = useState<number | null>(null);

  const close = useCallback(() => setIndex(null), []);
  const prev = useCallback(
    () => setIndex((i) => (i !== null ? (i - 1 + photos.length) % photos.length : null)),
    [photos.length]
  );
  const next = useCallback(
    () => setIndex((i) => (i !== null ? (i + 1) % photos.length : null)),
    [photos.length]
  );

  useEffect(() => {
    if (index === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [index, close, prev, next]);

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = index !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [index]);

  return (
    <>
      <div className="columns-2 md:columns-3 gap-3">
        {photos.map((photo, i) => (
          <div
            key={i}
            className="break-inside-avoid mb-3 rounded-lg overflow-hidden shadow-sm cursor-zoom-in"
            onClick={() => setIndex(i)}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              width={800}
              height={600}
              className="w-full object-cover hover:scale-105 transition-transform duration-300"
            />
            {photo.caption && (
              <p className="text-xs text-gray-500 px-3 py-2 bg-white">{photo.caption}</p>
            )}
          </div>
        ))}
      </div>

      {index !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={close}
        >
          {/* Prev */}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-3xl p-3 hover:text-gray-300 transition-colors select-none"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Fyrri mynd"
          >
            ‹
          </button>

          {/* Image */}
          <div
            className="relative max-w-[90vw] max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={photos[index].src}
              alt={photos[index].alt}
              width={1200}
              height={900}
              style={{ maxHeight: "85vh", maxWidth: "90vw", width: "auto", height: "auto" }}
              className="rounded"
              priority
            />
            {photos[index].caption && (
              <p className="text-center text-sm text-gray-300 mt-3">
                {photos[index].caption}
              </p>
            )}
            <p className="text-center text-xs text-gray-500 mt-1">
              {index + 1} / {photos.length}
            </p>
          </div>

          {/* Next */}
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-3xl p-3 hover:text-gray-300 transition-colors select-none"
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Næsta mynd"
          >
            ›
          </button>

          {/* Close */}
          <button
            className="absolute top-4 right-4 text-white text-2xl p-2 hover:text-gray-300 transition-colors"
            onClick={close}
            aria-label="Loka"
          >
            ✕
          </button>
        </div>
      )}
    </>
  );
}
