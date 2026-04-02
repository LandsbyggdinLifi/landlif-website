import type { Metadata } from "next";
import { client } from "@/sanity/client";
import { newsPostsQuery } from "@/sanity/queries";
import NewsCard from "@/components/NewsCard";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Fréttir",
  description: "Nýjustu fréttir frá Landlífi.",
};

export default async function NewsPage() {
  const posts = await client.fetch(newsPostsQuery).catch(() => []);

  return (
    <>
      {/* Header */}
      <section
        className="py-20 text-white"
        style={{ backgroundColor: "#394c75" }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-4xl font-bold">Fréttir</h1>
          <p className="text-blue-200 mt-2">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map(
                (post: Parameters<typeof NewsCard>[0]["post"]) => (
                  <NewsCard key={post._id} post={post} />
                )
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
