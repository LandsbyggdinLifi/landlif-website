import { defineField, defineType } from "sanity";

export const page = defineType({
  name: "page",
  title: "Síður",
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
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroImage",
      title: "Hero-mynd",
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
        {
          type: "file",
          title: "Skjal",
          fields: [
            defineField({
              name: "title",
              title: "Heiti skjals",
              type: "string",
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: { title: "title", media: "heroImage" },
  },
});
