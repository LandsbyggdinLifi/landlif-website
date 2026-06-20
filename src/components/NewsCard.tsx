import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/image";
import { formatDateIs } from "@/lib/date";

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
  const date = formatDateIs(post.publishedAt);

  return (
    <Link
      href={`/frettir/${post.slug.current}`}
      className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-stone/15 shadow-sm hover:shadow-md transition-shadow"
    >
      {post.mainImage?.asset && (
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={urlFor(post.mainImage).width(600).height(400).url()}
            alt={post.mainImage.alt || post.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {isNew && (
            <span className="absolute top-3 left-3 bg-amber text-white text-xs font-semibold px-2.5 py-0.5 rounded-full">
              Nýtt
            </span>
          )}
        </div>
      )}
      {!post.mainImage?.asset && (
        <div className="relative h-48 w-full overflow-hidden bg-sand flex items-center justify-center">
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
          {date && <p className="text-xs text-stone">{date}</p>}
          {isNew && !post.mainImage?.asset && (
            <span className="bg-amber text-white text-xs font-semibold px-2.5 py-0.5 rounded-full">
              Nýtt
            </span>
          )}
        </div>
        <h3 className="font-serif text-xl font-semibold leading-snug mb-2 text-moss-deep group-hover:text-amber transition-colors">
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="text-sm text-stone line-clamp-3 flex-1">{post.excerpt}</p>
        )}
        <span className="mt-4 text-sm font-semibold text-amber inline-flex items-center gap-1">
          Lesa meira →
        </span>
      </div>
    </Link>
  );
}
