import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Forsíða",
  type: "document",
  groups: [
    { name: "homepage", title: "Forsíða", default: true },
    { name: "contact", title: "Samband" },
  ],
  fields: [
    // 1. Hero
    defineField({
      name: "heroImage",
      title: "Hero-mynd",
      type: "image",
      options: { hotspot: true },
      group: "homepage",
    }),
    defineField({
      name: "heroHeading",
      title: "Hero fyrirsögn",
      type: "string",
      group: "homepage",
    }),
    defineField({
      name: "heroSubtext",
      title: "Hero undirtitill",
      type: "text",
      rows: 2,
      group: "homepage",
    }),
    // 2. Hlutverk
    defineField({
      name: "missionHeading",
      title: "Hlutverk – fyrirsögn",
      type: "string",
      group: "homepage",
    }),
    defineField({
      name: "missionText",
      title: "Hlutverk – texti",
      type: "text",
      rows: 4,
      group: "homepage",
    }),
    // 3. Kort
    defineField({
      name: "featureCards",
      title: "Kort (3 stk)",
      type: "array",
      group: "homepage",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "icon", title: "Tákn (emoji)", type: "string" }),
            defineField({ name: "title", title: "Titill", type: "string" }),
            defineField({ name: "body", title: "Texti", type: "text", rows: 2 }),
          ],
          preview: {
            select: { title: "title", subtitle: "icon" },
          },
        },
      ],
    }),
    // 4. Myndasafn
    defineField({
      name: "galleryImages",
      title: "Myndasafn (viðburðir)",
      type: "array",
      group: "homepage",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "caption", title: "Skýritexti", type: "string" }),
            defineField({ name: "alt", title: "Alt-texti", type: "string" }),
          ],
        },
      ],
    }),
    // 5. CTA
    defineField({
      name: "ctaHeading",
      title: "CTA fyrirsögn",
      type: "string",
      group: "homepage",
    }),
    defineField({
      name: "ctaText",
      title: "CTA texti",
      type: "text",
      rows: 2,
      group: "homepage",
    }),
    // 6. Fótur
    defineField({
      name: "title",
      title: "Nafn Stofnunar - Birtist neðst til vinstri á síðunni",
      type: "string",
      group: "homepage",
    }),
    defineField({
      name: "description",
      title: "Lýsing",
      type: "text",
      rows: 3,
      group: "homepage",
    }),

    // Samband
    defineField({
      name: "email",
      title: "Netfang",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "phone",
      title: "Símanúmer",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "address",
      title: "Heimilisfang",
      type: "string",
      group: "contact",
    }),
  ],
  preview: {
    select: { title: "title" },
  },
});
