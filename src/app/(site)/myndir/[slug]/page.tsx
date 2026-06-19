import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { client } from "@/sanity/client";
import { eventAlbumBySlugQuery, eventAlbumsQuery } from "@/sanity/queries";
import { urlFor, hotspotPosition } from "@/sanity/image";
import PhotoLightbox from "@/components/PhotoLightbox";

export const revalidate = 0;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const albums = await client.fetch(eventAlbumsQuery).catch(() => []);
  return albums.map((a: { slug: { current: string } }) => ({
    slug: a.slug.current,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const album = await client
    .fetch(eventAlbumBySlugQuery, { slug })
    .catch(() => null);
  if (!album) return { title: "Myndasafn" };
  const ogImage = album.coverImage?.asset
    ? urlFor(album.coverImage).width(1200).height(630).url()
    : "/logo.png";
  return {
    title: album.title,
    description: album.description || undefined,
    openGraph: {
      title: album.title,
      description: album.description || undefined,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
  };
}

type Photo = {
  asset: { _ref: string };
  caption?: string;
  alt?: string;
};

export default async function AlbumPage({ params }: Props) {
  const { slug } = await params;
  const album = await client
    .fetch(eventAlbumBySlugQuery, { slug })
    .catch(() => null);

  if (!album) notFound();

  const formattedDate = album.date
    ? new Date(album.date).toLocaleDateString("is-IS", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <>
      {/* Hero */}
      {album.coverImage?.asset ? (
        <div className="relative w-full" style={{ height: "360px" }}>
          <Image
            src={urlFor(album.coverImage).width(1600).height(720).url()}
            alt={album.title}
            fill
            className="object-cover"
            style={{ objectPosition: hotspotPosition(album.coverImage) }}
            priority
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to bottom, transparent 40%, rgba(36,58,46,0.8))" }}
          />
          <div className="absolute bottom-0 left-0 right-0 max-w-6xl mx-auto px-6 pb-8">
            {formattedDate && (
              <p className="text-white/70 text-sm mb-1">{formattedDate}</p>
            )}
            <h1 className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-white">{album.title}</h1>
          </div>
        </div>
      ) : (
        <section className="py-20 bg-moss-deep text-white">
          <div className="max-w-6xl mx-auto px-6">
            <span className="block w-12 h-px bg-amber mb-5" />
            {formattedDate && (
              <p className="text-white/70 text-sm mb-2">{formattedDate}</p>
            )}
            <h1 className="font-serif text-4xl sm:text-5xl font-semibold tracking-tight">{album.title}</h1>
          </div>
        </section>
      )}

      <section className="py-12 bg-paper">
        <div className="max-w-6xl mx-auto px-6">
          <Link
            href="/myndir"
            className="inline-flex items-center gap-1 text-sm mb-8 text-amber hover:text-amber-dark transition-colors"
          >
            ← Til baka í myndir
          </Link>

          {album.description && (
            <p className="text-stone text-base mb-10 max-w-2xl">{album.description}</p>
          )}

          {album.photos?.length > 0 ? (
            <PhotoLightbox
              photos={album.photos.map((photo: Photo) => ({
                src: urlFor(photo).width(1200).url(),
                alt: photo.alt || photo.caption || album.title,
                caption: photo.caption,
              }))}
            />
          ) : (
            <p className="text-stone text-center py-16">Engar myndir í þessu safni enn.</p>
          )}
        </div>
      </section>
    </>
  );
}
