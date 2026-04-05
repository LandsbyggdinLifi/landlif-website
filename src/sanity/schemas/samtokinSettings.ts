import { defineField, defineType } from "sanity";

export const samtokinSettings = defineType({
  name: "samtokinSettings",
  title: "Samtökin",
  type: "document",
  fields: [
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
  ],
  preview: {
    prepare: () => ({ title: "Samtökin" }),
  },
});
