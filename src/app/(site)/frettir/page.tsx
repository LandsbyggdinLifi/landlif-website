import type { Metadata } from "next";
import Link from "next/link";
import { client } from "@/sanity/client";
import { newsPostsPagedQuery, newsPostsCountQuery } from "@/sanity/queries";
import NewsCard from "@/components/NewsCard";
import { isRecent } from "@/lib/date";

export const revalidate = 60;

const PER_PAGE = 9;

interface Props {
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Number(pageParam ?? 1));
  return {
    title: page > 1 ? `Fréttir – Síða ${page}` : "Fréttir",
    description: "Nýjustu fréttir frá Landlífi.",
  };
}

export default async function NewsPage({ searchParams }: Props) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Number(pageParam ?? 1));
  const offset = (page - 1) * PER_PAGE;

  const [posts, total] = await Promise.all([
    client.fetch(newsPostsPagedQuery, { offset }).catch(() => []),
    client.fetch(newsPostsCountQuery).catch(() => 0),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / PER_PAGE));

  return (
    <>
      {/* Header */}
      <section
        className="py-20 text-white"
        style={{ backgroundColor: "var(--navy)" }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-4xl font-bold">Fréttir</h1>
          <p className="text-gray-300 mt-2">
            Nýjustu fréttir og tilkynningar frá Landlífi
          </p>
        </div>
      </section>

      {/* Posts grid */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          {posts.length === 0 ? (
            <div className="text-center py-24 text-gray-400">
              <p className="text-lg">Engar fréttir fundust.</p>
              <p className="text-sm mt-2">
                Bættu við fréttum í Sanity Studio.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map(
                  (post: Parameters<typeof NewsCard>[0]["post"]) => (
                    <NewsCard key={post._id} post={post} isNew={isRecent(post.publishedAt)} />
                  )
                )}
              </div>

              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-6 mt-14">
                  {page > 1 ? (
                    <Link
                      href={`/frettir?page=${page - 1}`}
                      className="text-sm font-medium px-4 py-2 rounded-lg border transition-colors hover:border-teal"
                      style={{ color: "var(--navy)", borderColor: "#d1d5db" }}
                    >
                      ← Fyrri
                    </Link>
                  ) : (
                    <span className="text-sm font-medium px-4 py-2 rounded-lg border border-gray-200 text-gray-300 cursor-not-allowed">
                      ← Fyrri
                    </span>
                  )}

                  <span className="text-sm text-gray-500">
                    Síða {page} af {totalPages}
                  </span>

                  {page < totalPages ? (
                    <Link
                      href={`/frettir?page=${page + 1}`}
                      className="text-sm font-medium px-4 py-2 rounded-lg border transition-colors hover:border-teal"
                      style={{ color: "var(--navy)", borderColor: "#d1d5db" }}
                    >
                      Næsta →
                    </Link>
                  ) : (
                    <span className="text-sm font-medium px-4 py-2 rounded-lg border border-gray-200 text-gray-300 cursor-not-allowed">
                      Næsta →
                    </span>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
