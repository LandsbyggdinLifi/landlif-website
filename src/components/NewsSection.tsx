"use client";

import { useState } from "react";
import Link from "next/link";
import NewsCard from "@/components/NewsCard";
import { isRecent } from "@/lib/date";

type Post = {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt?: string;
  mainImage?: { asset: { _ref: string }; alt?: string };
};

export default function NewsSection({ posts }: { posts: Post[] }) {
  const [page, setPage] = useState(0);
  const perPage = 3;
  const totalPages = Math.ceil(posts.length / perPage);
  const visiblePosts = posts.slice(page * perPage, page * perPage + perPage);

  return (
    <section style={{ backgroundColor: "var(--gray-light)" }} className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between mb-10">
          <h2
            className="text-3xl font-bold"
            style={{ color: "var(--navy)" }}
          >
            Nýjustu fréttir
          </h2>
          <Link
            href="/frettir"
            className="text-sm font-medium"
            style={{ color: "var(--teal)" }}
          >
            Sjá allar fréttir →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {visiblePosts.map((post) => (
            <NewsCard key={post._id} post={post} isNew={isRecent(post.publishedAt)} />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              onClick={() => setPage((p) => p - 1)}
              disabled={page === 0}
              className="w-9 h-9 rounded-full flex items-center justify-center text-lg leading-none transition-opacity disabled:opacity-30 disabled:cursor-not-allowed"
              style={{ backgroundColor: "var(--teal)", color: "white" }}
              aria-label="Fyrri fréttir"
            >
              ‹
            </button>

            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className="w-2.5 h-2.5 rounded-full transition-colors"
                style={{
                  backgroundColor: i === page ? "var(--teal)" : "#9ca3af",
                }}
                aria-label={`Síða ${i + 1}`}
              />
            ))}

            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={page === totalPages - 1}
              className="w-9 h-9 rounded-full flex items-center justify-center text-lg leading-none transition-opacity disabled:opacity-30 disabled:cursor-not-allowed"
              style={{ backgroundColor: "var(--teal)", color: "white" }}
              aria-label="Næstu fréttir"
            >
              ›
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
