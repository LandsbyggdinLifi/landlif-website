import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/image";

interface NewsCardProps {
  post: {
    _id: string;
    title: string;
    slug: { current: string };
    publishedAt: string;
    excerpt?: string;
    mainImage?: { asset: { _ref: string }; alt?: string };
  };
  isNew?: boolean;
}

export default function NewsCard({ post, isNew = false }: NewsCardProps) {
  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("is-IS", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <Link
      href={`/frettir/${post.slug.current}`}
      className="group flex flex-col bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
    >
      {post.mainImage?.asset && (
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={urlFor(post.mainImage).width(600).height(400).url()}
            alt={post.mainImage.alt || post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {isNew && (
            <span
              className="absolute top-3 left-3 text-white text-xs font-semibold px-2 py-0.5 rounded-full"
              style={{ backgroundColor: "var(--orange)" }}
            >
              Nýtt
            </span>
          )}
        </div>
      )}
      {!post.mainImage?.asset && (
        <div className="relative h-48 w-full overflow-hidden bg-gray-light flex items-center justify-center">
          <Image
            src="/logo.png"
            alt="Landsbyggðin lifi"
            width={120}
            height={92}
            className="h-20 w-auto opacity-40"
          />
        </div>
      )}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-1">
          {date && <p className="text-xs text-gray-400">{date}</p>}
          {isNew && !post.mainImage?.asset && (
            <span
              className="text-white text-xs font-semibold px-2 py-0.5 rounded-full"
              style={{ backgroundColor: "var(--orange)" }}
            >
              Nýtt
            </span>
          )}
        </div>
        <h3
          className="font-semibold text-lg leading-snug mb-2 group-hover:text-teal transition-colors"
          style={{ color: "var(--navy)" }}
        >
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="text-sm text-gray-600 line-clamp-3 flex-1">
            {post.excerpt}
          </p>
        )}
        <span
          className="mt-4 text-sm font-medium inline-flex items-center gap-1"
          style={{ color: "var(--teal)" }}
        >
          Lesa meira →
        </span>
      </div>
    </Link>
  );
}
