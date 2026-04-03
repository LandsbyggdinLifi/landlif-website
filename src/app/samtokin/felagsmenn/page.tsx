import type { Metadata } from "next";
import Link from "next/link";
import { client } from "@/sanity/client";
import { samtokinPageQuery } from "@/sanity/queries";
import PortableTextRenderer from "@/components/PortableTextRenderer";
import SamtokinLayout from "@/components/SamtokinLayout";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Félagsmenn",
  description: "Félagsmenn samtakanna Landsbyggðin lifi.",
};

const memberOrgs = [
  "Framfarafélag Dalvíkurbyggðar",
  "Framfarafélag Fljótdalshéraðs",
  "Framfarafélagi Reisn",
  "Framfarafélag Vestfjarða",
  "Framfarafélag Öxarfjarðar",
];

export default async function FelagsmennPage() {
  const page = await client
    .fetch(samtokinPageQuery, { id: "page-felagsmenn" })
    .catch(() => null);

  return (
    <SamtokinLayout title={page?.title || "Félagsmenn"} heroImage={page?.heroImage}>
      {page?.body ? (
        <PortableTextRenderer value={page.body} />
      ) : (
        <div>
          <h2 className="text-xl font-bold mb-4" style={{ color: "#394c75" }}>
            Framfarafélög og einstaklingar
          </h2>
          <ul className="space-y-3 mb-8">
            {memberOrgs.map((org) => (
              <li key={org} className="flex items-center gap-3">
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: "#16a085" }}
                />
                <span className="text-gray-700">{org}</span>
              </li>
            ))}
          </ul>
          <p className="text-gray-600 leading-relaxed mb-8">
            Auk þess eru um tvö hundruð einstaklingsmeðlimir í samtökunum.
          </p>
          <div
            className="rounded-xl p-6 text-white text-center"
            style={{ backgroundColor: "#16a085" }}
          >
            <h3 className="text-lg font-bold mb-2">Gerast meðlimur</h3>
            <p className="text-green-100 text-sm mb-4">
              Viltu styðja uppbyggingu landsbyggðarinnar? Hafðu samband við okkur.
            </p>
            <Link
              href="/hafa-samband"
              className="inline-block px-6 py-2 rounded-full bg-white font-semibold text-sm transition-opacity hover:opacity-90"
              style={{ color: "#16a085" }}
            >
              Hafa samband
            </Link>
          </div>
        </div>
      )}
    </SamtokinLayout>
  );
}
