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
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const doc = context.document as { section?: string };
          if (doc?.section && !value?.current)
            return "Slóð er nauðsynleg þegar hluti er valinn.";
          return true;
        }),
    }),
    defineField({
      name: "navTitle",
      title: "Heiti í hliðarspjaldi",
      type: "string",
      description: "Styttra heiti sem birtist í hliðarspjaldinu. Ef autt er notað titillinn.",
    }),
    defineField({
      name: "sortOrder",
      title: "Röðun",
      type: "number",
      description: "Lægri tala = framar í listanum. Sjálfgefið 100.",
      initialValue: 100,
    }),
    defineField({
      name: "section",
      title: "Hluti",
      type: "string",
      options: {
        list: [
          { title: "Starfið (efsta stig)", value: "starfid" },
          { title: "Samstarf Erlendis", value: "samstarf-erlendis" },
          { title: "Verkefni Erlendis", value: "verkefni-erlendis" },
          { title: "Samstarf Innanlands", value: "samstarf-innanlands" },
          { title: "Verkefni Innanlands", value: "verkefni-innanlands" },
          { title: "Fundargerðir", value: "fundargerdir" },
        ],
      },
      description:
        "Veldu hluta fyrir nýjar undirsíður. Skilja eftir autt fyrir fastar singleton-síður.",
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
    select: { title: "title", subtitle: "section", media: "heroImage" },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    prepare({ title, subtitle, media }: { title?: string; subtitle?: string; media?: any }) {
      return { title, subtitle: subtitle ?? "Singleton", media };
    },
  },
});
