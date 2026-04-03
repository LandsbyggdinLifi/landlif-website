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

export const aboutPageQuery = groq`
  *[_type == "page" && _id == "page-um-okkur"][0] {
    _id,
    title,
    heroImage,
    body
  }
`;

export const pageByIdQuery = groq`
  *[_type == "page" && _id == $id][0] {
    _id,
    title,
    heroImage,
    body[] {
      ...,
      _type == "file" => {
        ...,
        "url": asset->url,
        "originalFilename": asset->originalFilename
      }
    }
  }
`;
