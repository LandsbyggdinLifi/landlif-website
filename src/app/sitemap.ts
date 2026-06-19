import type { MetadataRoute } from "next";
import { client } from "@/sanity/client";
import { newsPostsQuery, eventAlbumsQuery, starfidPagesBySectionQuery } from "@/sanity/queries";

const BASE_URL = "https://www.landlif.is";

const staticRoutes: MetadataRoute.Sitemap = [
  { url: BASE_URL, changeFrequency: "weekly", priority: 1 },
  { url: `${BASE_URL}/um-okkur`, changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE_URL}/frettir`, changeFrequency: "daily", priority: 0.9 },
  { url: `${BASE_URL}/hafa-samband`, changeFrequency: "yearly", priority: 0.5 },
  { url: `${BASE_URL}/samtokin/markmid`, changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE_URL}/samtokin/log`, changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE_URL}/samtokin/stjorn`, changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE_URL}/samtokin/felagsmenn`, changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE_URL}/starfid/stefnumorkun`, changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE_URL}/starfid/samstarf-erlendis`, changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE_URL}/starfid/samstarf-erlendis/european-rural-parliament`, changeFrequency: "monthly", priority: 0.6 },
  { url: `${BASE_URL}/starfid/samstarf-erlendis/hela-norden`, changeFrequency: "monthly", priority: 0.6 },
  { url: `${BASE_URL}/starfid/verkefni-erlendis`, changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE_URL}/starfid/samstarf-innanlands`, changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE_URL}/starfid/verkefni-innanlands`, changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE_URL}/starfid/verkefni-innanlands/heimsmarkmid`, changeFrequency: "monthly", priority: 0.6 },
  { url: `${BASE_URL}/starfid/verkefni-innanlands/animation-og-sdg`, changeFrequency: "monthly", priority: 0.6 },
  { url: `${BASE_URL}/starfid/verkefni-innanlands/rha`, changeFrequency: "monthly", priority: 0.6 },
  { url: `${BASE_URL}/starfid/fundargerdir`, changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE_URL}/starfid/fundargerdir/adalfundir`, changeFrequency: "monthly", priority: 0.6 },
  { url: `${BASE_URL}/starfid/fundargerdir/stjornarfundir`, changeFrequency: "monthly", priority: 0.6 },
  { url: `${BASE_URL}/starfid/skipulag-ibuasamtaka`, changeFrequency: "monthly", priority: 0.6 },
  { url: `${BASE_URL}/starfid/byggdastefna`, changeFrequency: "monthly", priority: 0.6 },
  { url: `${BASE_URL}/myndir`, changeFrequency: "monthly", priority: 0.7 },
];

const DYNAMIC_SECTIONS: { section: string; prefix: string }[] = [
  { section: "samstarf-erlendis", prefix: "/starfid/samstarf-erlendis" },
  { section: "verkefni-erlendis", prefix: "/starfid/verkefni-erlendis" },
  { section: "samstarf-innanlands", prefix: "/starfid/samstarf-innanlands" },
  { section: "verkefni-innanlands", prefix: "/starfid/verkefni-innanlands" },
  { section: "fundargerdir", prefix: "/starfid/fundargerdir" },
  { section: "starfid", prefix: "/starfid" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, albums, ...sectionResults] = await Promise.all([
    client.fetch(newsPostsQuery).catch(() => []),
    client.fetch(eventAlbumsQuery).catch(() => []),
    ...DYNAMIC_SECTIONS.map(({ section }) =>
      client.fetch(starfidPagesBySectionQuery, { section }).catch(() => [])
    ),
  ]);

  const newsRoutes: MetadataRoute.Sitemap = posts.map(
    (post: { slug: { current: string }; publishedAt?: string }) => ({
      url: `${BASE_URL}/frettir/${post.slug.current}`,
      lastModified: post.publishedAt ? new Date(post.publishedAt) : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })
  );

  const albumRoutes: MetadataRoute.Sitemap = albums.map(
    (album: { slug: { current: string }; date?: string }) => ({
      url: `${BASE_URL}/myndir/${album.slug.current}`,
      lastModified: album.date ? new Date(album.date) : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })
  );

  const dynamicStarfidRoutes: MetadataRoute.Sitemap = sectionResults.flatMap(
    (pages, i) =>
      (pages as { slug: { current: string } }[]).map((p) => ({
        url: `${BASE_URL}${DYNAMIC_SECTIONS[i].prefix}/${p.slug.current}`,
        changeFrequency: "monthly" as const,
        priority: 0.6,
      }))
  );

  return [...staticRoutes, ...newsRoutes, ...albumRoutes, ...dynamicStarfidRoutes];
}
