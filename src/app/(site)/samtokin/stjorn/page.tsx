import type { Metadata } from "next";
import { client } from "@/sanity/client";
import { samtokinSettingsQuery } from "@/sanity/queries";
import SamtokinLayout from "@/components/SamtokinLayout";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Stjórn",
  description: "Stjórn samtakanna Landsbyggðin lifi.",
};

const fallbackBoard = [
  { name: "Hildur Þórðardóttir", role: "Formaður", location: "Reykjavík" },
  { name: "Stefanía Vigdís Gísladóttir", role: "Varaformaður", location: "" },
  { name: "Vigfús Ingvar Ingvarsson", role: "Ritari", location: "Egilsstöðum" },
  { name: "Sigríður Svavarsdóttir", role: "Gjaldkeri", location: "" },
  { name: "Guðrún T. Gísladóttir", role: "Meðlimur", location: "" },
  { name: "Ómar Ragnarsson", role: "Meðlimur", location: "" },
];

const fallbackAlternates = [
  { name: "Bjarni Þór Haraldsson", location: "Egilsstöðum" },
  { name: "Björgvin Hjörleifsson", location: "Dalvík" },
  { name: "Hafrún Káradóttir", location: "Reykjavík" },
];

export default async function StjornPage() {
  const settings = await client.fetch(samtokinSettingsQuery).catch(() => null);

  const board = settings?.boardMembers?.length ? settings.boardMembers : fallbackBoard;
  const alternates = settings?.alternateBoardMembers?.length ? settings.alternateBoardMembers : fallbackAlternates;

  return (
    <SamtokinLayout title="Stjórn">
      <div>
        <p className="text-ink/80 leading-relaxed mb-8">
          Aðal- og varastjórnarmenn eru valdir á aðalfundi samtakanna.
        </p>

        <h2 className="font-serif text-xl font-semibold mb-4 text-moss-deep">
          Aðalstjórn
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {board.map((m: { name: string; role?: string; location?: string }) => (
            <div key={m.name} className="p-4 rounded-lg border border-stone/15 bg-sand/50">
              <p className="font-semibold text-ink">{m.name}</p>
              {m.role && <p className="text-sm text-amber">{m.role}</p>}
              {m.location && <p className="text-sm text-stone">{m.location}</p>}
            </div>
          ))}
        </div>

        <h2 className="font-serif text-xl font-semibold mb-4 text-moss-deep">
          Varastjórn
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {alternates.map((m: { name: string; location?: string }) => (
            <div key={m.name} className="p-4 rounded-lg border border-stone/15 bg-sand/50">
              <p className="font-semibold text-ink">{m.name}</p>
              {m.location && <p className="text-sm text-stone">{m.location}</p>}
            </div>
          ))}
        </div>
      </div>
    </SamtokinLayout>
  );
}
