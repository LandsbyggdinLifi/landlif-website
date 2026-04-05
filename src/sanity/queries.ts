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
    featureCards,
    ctaHeading,
    ctaText,
    galleryImages[] {
      asset,
      caption,
      alt
    },
    boardMembers,
    alternateBoardMembers,
    memberOrgs,
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

export const newsPostsCountQuery = groq`count(*[_type == "newsPost"])`;

export const newsPostsPagedQuery = groq`
  *[_type == "newsPost"] | order(publishedAt desc)[$offset...$offset + 9] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    mainImage
  }
`;

export const latestNewsQuery = groq`
  *[_type == "newsPost"] | order(publishedAt desc)[0..8] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    mainImage
  }
`;

export const eventAlbumsQuery = groq`
  *[_type == "eventAlbum"] | order(date desc) {
    _id,
    title,
    slug,
    date,
    description,
    coverImage
  }
`;

export const eventAlbumBySlugQuery = groq`
  *[_type == "eventAlbum" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    date,
    description,
    coverImage,
    photos[] {
      asset,
      caption,
      alt
    }
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

export const samtokinSettingsQuery = groq`
  *[_type == "samtokinSettings"][0] {
    boardMembers,
    alternateBoardMembers,
    memberOrgs
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
