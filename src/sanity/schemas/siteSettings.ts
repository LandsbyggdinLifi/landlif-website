import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Stillingar",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Nafn stofnunar",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Lýsing",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "heroHeading",
      title: "Hero fyrirsögn (forsíða)",
      type: "string",
    }),
    defineField({
      name: "heroSubtext",
      title: "Hero undirtitill (forsíða)",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "heroImage",
      title: "Hero-mynd (forsíða)",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "missionHeading",
      title: "Hlutverk – fyrirsögn",
      type: "string",
    }),
    defineField({
      name: "missionText",
      title: "Hlutverk – texti",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "email",
      title: "Netfang",
      type: "string",
    }),
    defineField({
      name: "phone",
      title: "Símanúmer",
      type: "string",
    }),
    defineField({
      name: "address",
      title: "Heimilisfang",
      type: "string",
    }),
  ],
  preview: {
    select: { title: "title" },
  },
});
