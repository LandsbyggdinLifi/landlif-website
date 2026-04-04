import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Stillingar",
  type: "document",
  groups: [
    { name: "homepage", title: "Forsíða", default: true },
    { name: "samtokin", title: "Samtökin" },
    { name: "contact", title: "Samband" },
  ],
  fields: [
    // Forsíða
    defineField({
      name: "title",
      title: "Nafn stofnunar",
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
    defineField({
      name: "heroImage",
      title: "Hero-mynd",
      type: "image",
      options: { hotspot: true },
      group: "homepage",
    }),
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

    // Samtökin
    defineField({
      name: "boardMembers",
      title: "Aðalstjórn",
      type: "array",
      group: "samtokin",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "name", title: "Nafn", type: "string" }),
            defineField({ name: "role", title: "Hlutverk", type: "string" }),
            defineField({ name: "location", title: "Staðsetning", type: "string" }),
          ],
          preview: {
            select: { title: "name", subtitle: "role" },
          },
        },
      ],
    }),
    defineField({
      name: "alternateBoardMembers",
      title: "Varastjórn",
      type: "array",
      group: "samtokin",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "name", title: "Nafn", type: "string" }),
            defineField({ name: "location", title: "Staðsetning", type: "string" }),
          ],
          preview: {
            select: { title: "name", subtitle: "location" },
          },
        },
      ],
    }),
    defineField({
      name: "memberOrgs",
      title: "Félagsmenn (samtök)",
      type: "array",
      group: "samtokin",
      of: [{ type: "string" }],
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
