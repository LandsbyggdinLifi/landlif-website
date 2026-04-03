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
}

export default function NewsCard({ post }: NewsCardProps) {
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
        </div>
      )}
      {!post.mainImage?.asset && (
        <div className="relative h-48 w-full overflow-hidden bg-[#eff2f4] flex items-center justify-center">
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
        {date && (
          <p className="text-xs text-gray-400 mb-1">{date}</p>
        )}
        <h3
          className="font-semibold text-lg leading-snug mb-2 group-hover:text-[#16a085] transition-colors"
          style={{ color: "#394c75" }}
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
          style={{ color: "#16a085" }}
        >
          Lesa meira →
        </span>
      </div>
    </Link>
  );
}
