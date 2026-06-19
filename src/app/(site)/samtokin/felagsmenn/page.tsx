import type { Metadata } from "next";
import Link from "next/link";
import { client } from "@/sanity/client";
import { samtokinSettingsQuery } from "@/sanity/queries";
import SamtokinLayout from "@/components/SamtokinLayout";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Félagsmenn",
  description: "Félagsmenn samtakanna Landsbyggðin lifi.",
};

const fallbackOrgs = [
  "Framfarafélag Dalvíkurbyggðar",
  "Framfarafélag Fljótdalshéraðs",
  "Framfarafélagi Reisn",
  "Framfarafélag Vestfjarða",
  "Framfarafélag Öxarfjarðar",
];

export default async function FelagsmennPage() {
  const settings = await client.fetch(samtokinSettingsQuery).catch(() => null);

  const orgs = settings?.memberOrgs?.length ? settings.memberOrgs : fallbackOrgs;

  return (
    <SamtokinLayout title="Félagsmenn">
      <div>
        <h2 className="font-serif text-xl font-semibold mb-4 text-moss-deep">
          Framfarafélög og einstaklingar
        </h2>
        <ul className="space-y-3 mb-8">
          {orgs.map((org: string) => (
            <li key={org} className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full flex-shrink-0 bg-amber" />
              <span className="text-ink/80">{org}</span>
            </li>
          ))}
        </ul>
        <p className="text-ink/80 leading-relaxed mb-8">
          Auk þess eru um tvö hundruð einstaklingsmeðlimir í samtökunum.
        </p>
        <div className="rounded-2xl p-6 bg-moss-deep text-white text-center">
          <h3 className="font-serif text-lg font-semibold mb-2">Gerast meðlimur</h3>
          <p className="text-white/75 text-sm mb-4">
            Viltu styðja uppbyggingu landsbyggðarinnar? Hafðu samband við okkur.
          </p>
          <Link
            href="/hafa-samband"
            className="inline-block px-6 py-2 rounded-full bg-amber text-white font-semibold text-sm hover:bg-amber-dark transition-colors"
          >
            Hafa samband
          </Link>
        </div>
      </div>
    </SamtokinLayout>
  );
}
