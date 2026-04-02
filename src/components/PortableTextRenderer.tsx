import { PortableText, type PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/sanity/image";

const components: PortableTextComponents = {
  types: {
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
      <h1 className="text-3xl font-bold text-[#394c75] mt-8 mb-4">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold text-[#394c75] mt-8 mb-3">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold text-[#394c75] mt-6 mb-2">{children}</h3>
    ),
    normal: ({ children }) => (
      <p className="text-gray-700 leading-relaxed mb-4">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[#16a085] pl-4 italic text-gray-600 my-6">
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
        className="text-[#16a085] underline hover:text-[#0d7a63]"
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
