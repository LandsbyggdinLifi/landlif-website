import { groq } from "next-sanity";

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    title,
    description,
    heroHeading,
    heroSubtext,
    heroImage,
    missionHeading,
    missionText,
    email,
    phone,
    address
  }
`;

export const newsPostsQuery = groq`
  *[_type == "newsPost"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    mainImage
  }
`;

export const newsPostBySlugQuery = groq`
  *[_type == "newsPost" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    mainImage,
    body
  }
`;

export const latestNewsQuery = groq`
  *[_type == "newsPost"] | order(publishedAt desc)[0..2] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    mainImage
  }
`;

export const pageBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    heroImage,
    body
  }
`;
