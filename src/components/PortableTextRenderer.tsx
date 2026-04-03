import { PortableText, type PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/sanity/image";

const components: PortableTextComponents = {
  types: {
    file: ({ value }) => {
      if (!value?.url) return null;
      const label = value.title || value.originalFilename || "Sækja skjal";
      return (
        <a
          href={value.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 my-4 p-4 rounded-xl border border-gray-200 hover:border-teal hover:shadow-sm transition-all group"
        >
          <span className="text-2xl">📄</span>
          <span className="text-sm font-medium text-navy group-hover:text-teal transition-colors">
            {label}
          </span>
          <span className="ml-auto text-xs text-gray-400">PDF</span>
        </a>
      );
    },
    image: ({ value }) => {
      if (!value?.asset?._ref) return null;
      return (
        <figure className="my-8">
          <div className="relative w-full aspect-video rounded-lg overflow-hidden">
            <Image
              src={urlFor(value).width(1200).url()}
              alt={value.alt || ""}
              fill
              className="object-cover"
            />
          </div>
          {value.alt && (
            <figcaption className="text-center text-sm text-gray-500 mt-2">
              {value.alt}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  block: {
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold text-navy mt-8 mb-4">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold text-navy mt-8 mb-3">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold text-navy mt-6 mb-2">{children}</h3>
    ),
    normal: ({ children }) => (
      <p className="text-gray-700 leading-relaxed mb-4">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-teal pl-4 italic text-gray-600 my-6">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside space-y-1 mb-4 text-gray-700">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside space-y-1 mb-4 text-gray-700">
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target={value?.href?.startsWith("http") ? "_blank" : undefined}
        rel={value?.href?.startsWith("http") ? "noopener noreferrer" : undefined}
        className="text-teal underline hover:text-[#0d7a63]"
      >
        {children}
      </a>
    ),
  },
};

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any[];
}

export default function PortableTextRenderer({ value }: Props) {
  return <PortableText value={value} components={components} />;
}
