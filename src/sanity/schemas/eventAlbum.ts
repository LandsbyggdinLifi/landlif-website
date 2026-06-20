import { defineField, defineType } from "sanity";

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
      description:
        "Ekki breyta. Þetta er vefslóð viðburðarins og læsist eftir að hún hefur verið búin til.",
      options: { source: "title" },
      // Læsist um leið og slóð er til, en má búa til á nýjum viðburði.
      readOnly: ({ value }) => Boolean((value as { current?: string })?.current),
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
