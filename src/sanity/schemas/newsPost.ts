import { defineField, defineType } from "sanity";

export const newsPost = defineType({
  name: "newsPost",
  title: "Fréttir",
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
        "Ekki breyta. Þetta er vefslóð fréttarinnar og læsist eftir að hún hefur verið búin til.",
      options: { source: "title", maxLength: 96 },
      // Læsist um leið og slóð er til, en má búa til á nýrri frétt.
      readOnly: ({ value }) => Boolean((value as { current?: string })?.current),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Birting",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "excerpt",
      title: "Útdráttur",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "mainImage",
      title: "Aðalmynd",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Lýsingartext",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "body",
      title: "Efni",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Lýsingartext",
              type: "string",
            }),
          ],
        },
      ],
    }),
  ],
  orderings: [
    {
      title: "Nýjast",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      media: "mainImage",
      subtitle: "publishedAt",
    },
  },
});
