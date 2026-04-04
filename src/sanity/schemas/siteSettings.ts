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
      name: "featureCards",
      title: "Forsíðukort",
      type: "array",
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
      title: "CTA fyrirsögn (forsíða)",
      type: "string",
    }),
    defineField({
      name: "ctaText",
      title: "CTA texti (forsíða)",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "boardMembers",
      title: "Aðalstjórn",
      type: "array",
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
      of: [{ type: "string" }],
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
