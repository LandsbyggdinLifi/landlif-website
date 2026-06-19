import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/client";
import { eventAlbumsQuery } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Myndir",
  description: "Myndasöfn af viðburðum Landlífs.",
};

type Album = {
  _id: string;
  title: string;
  slug: { current: string };
  date?: string;
  description?: string;
  coverImage?: { asset: { _ref: string } };
};

export default async function GalleryPage() {
  const albums: Album[] = await client.fetch(eventAlbumsQuery).catch(() => []);

  return (
    <>
      <section
        className="py-20 text-white"
        style={{ backgroundColor: "var(--navy)" }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-4xl font-bold">Myndir</h1>
          <p className="text-gray-300 mt-2">Myndasöfn af viðburðum Landlífs</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          {albums.length === 0 ? (
            <div className="text-center py-24 text-gray-400">
              <p className="text-lg">Engin myndasöfn fundust.</p>
              <p className="text-sm mt-2">Bættu við myndasöfnum í Sanity Studio.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {albums.map((album) => {
                const formattedDate = album.date
                  ? new Date(album.date).toLocaleDateString("is-IS", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : null;

                return (
                  <Link
                    key={album._id}
                    href={`/myndir/${album.slug.current}`}
                    className="group flex flex-col bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                  >
                    <div className="relative h-48 w-full overflow-hidden bg-gray-light">
                      {album.coverImage?.asset ? (
                        <Image
                          src={urlFor(album.coverImage).width(600).height(400).url()}
                          alt={album.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Image
                            src="/logo.png"
                            alt="Landsbyggðin lifi"
                            width={120}
                            height={92}
                            className="h-16 w-auto opacity-30"
                          />
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      {formattedDate && (
                        <p className="text-xs text-gray-400 mb-1">{formattedDate}</p>
                      )}
                      <h2
                        className="font-semibold text-lg leading-snug group-hover:text-teal transition-colors"
                        style={{ color: "var(--navy)" }}
                      >
                        {album.title}
                      </h2>
                      {album.description && (
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                          {album.description}
                        </p>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
