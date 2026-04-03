import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { client } from "@/sanity/client";
import { newsPostBySlugQuery, newsPostsQuery } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";
import PortableTextRenderer from "@/components/PortableTextRenderer";

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await client.fetch(newsPostsQuery).catch(() => []);
  return posts.map((p: { slug: { current: string } }) => ({
    slug: p.slug.current,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await client
    .fetch(newsPostBySlugQuery, { slug })
    .catch(() => null);
  if (!post) return { title: "Frétt" };
  const ogImage = post.mainImage?.asset
    ? urlFor(post.mainImage).width(1200).height(630).url()
    : "/logo.png";
  return {
    title: post.title,
    description: post.excerpt || undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt || undefined,
      type: "article",
      publishedTime: post.publishedAt || undefined,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
  };
}

export default async function NewsPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await client
    .fetch(newsPostBySlugQuery, { slug })
    .catch(() => null);

  if (!post) notFound();

  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("is-IS", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <article>
      {/* Hero image */}
      {post.mainImage?.asset ? (
        <div className="relative w-full" style={{ height: "400px" }}>
          <Image
            src={urlFor(post.mainImage).width(1600).height(800).url()}
            alt={post.mainImage.alt || post.title}
            fill
            className="object-cover"
            priority
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.4))" }}
          />
        </div>
      ) : (
        <div
          className="w-full flex items-center justify-center"
          style={{ height: "200px", backgroundColor: "var(--navy)" }}
        />
      )}

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-12">
        <Link
          href="/frettir"
          className="inline-flex items-center gap-1 text-sm mb-8"
          style={{ color: "var(--teal)" }}
        >
          ← Til baka í fréttir
        </Link>

        {date && (
          <p className="text-sm text-gray-400 mb-3">{date}</p>
        )}
        <h1
          className="text-3xl sm:text-4xl font-bold leading-tight mb-6"
          style={{ color: "var(--navy)" }}
        >
          {post.title}
        </h1>

        {post.excerpt && (
          <p className="text-lg text-gray-500 border-l-4 pl-4 mb-8 italic"
            style={{ borderColor: "var(--teal)" }}>
            {post.excerpt}
          </p>
        )}

        {post.body && <PortableTextRenderer value={post.body} />}
      </div>
    </article>
  );
}
