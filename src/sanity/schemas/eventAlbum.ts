import { defineField, defineType } from "sanity";
import { AutoSlugInput } from "../components/autoSlugInput";

export const eventAlbum = defineType({
  name: "eventAlbum",
  title: "Viðburður (myndasafn)",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titill",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slóð",
      type: "slug",
      description: "Vefslóð viðburðarins. Hún býr til sjálfkrafa út frá titlinum.",
      options: { source: "title" },
      components: { input: AutoSlugInput },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "date",
      title: "Dagsetning viðburðar",
      type: "date",
    }),
    defineField({
      name: "description",
      title: "Lýsing",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "coverImage",
      title: "Forsíðumynd",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "photos",
      title: "Myndir",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "caption",
              title: "Skýritexti",
              type: "string",
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "coverImage",
      subtitle: "date",
    },
  },
});
