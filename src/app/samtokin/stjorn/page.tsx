import type { Metadata } from "next";
import { client } from "@/sanity/client";
import { pageByIdQuery } from "@/sanity/queries";
import PortableTextRenderer from "@/components/PortableTextRenderer";
import SamtokinLayout from "@/components/SamtokinLayout";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Stjórn",
  description: "Stjórn samtakanna Landsbyggðin lifi.",
};

const board = [
  { name: "Hildur Þórðardóttir", role: "Formaður", location: "Reykjavík" },
  { name: "Stefanía Vigdís Gísladóttir", role: "Varaformaður", location: "" },
  { name: "Vigfús Ingvar Ingvarsson", role: "Ritari", location: "Egilsstöðum" },
  { name: "Sigríður Svavarsdóttir", role: "Gjaldkeri", location: "" },
  { name: "Guðrún T. Gísladóttir", role: "Meðlimur", location: "" },
  { name: "Ómar Ragnarsson", role: "Meðlimur", location: "" },
];

const alternates = [
  { name: "Bjarni Þór Haraldsson", location: "Egilsstöðum" },
  { name: "Björgvin Hjörleifsson", location: "Dalvík" },
  { name: "Hafrún Káradóttir", location: "Reykjavík" },
];

export default async function StjornPage() {
  const page = await client
    .fetch(pageByIdQuery, { id: "page-stjorn" })
    .catch(() => null);

  return (
    <SamtokinLayout title={page?.title || "Stjórn"} heroImage={page?.heroImage}>
      {page?.body ? (
        <PortableTextRenderer value={page.body} />
      ) : (
        <div>
          <p className="text-gray-600 leading-relaxed mb-8">
            Aðal- og varastjórnarmenn eru valdir á aðalfundi samtakanna.
          </p>

          <h2 className="text-xl font-bold mb-4" style={{ color: "var(--navy)" }}>
            Aðalstjórn
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            {board.map((m) => (
              <div
                key={m.name}
                className="p-4 rounded-lg border border-gray-100 bg-gray-50"
              >
                <p className="font-semibold text-gray-800">{m.name}</p>
                <p className="text-sm text-teal">{m.role}</p>
                {m.location && (
                  <p className="text-sm text-gray-400">{m.location}</p>
                )}
              </div>
            ))}
          </div>

          <h2 className="text-xl font-bold mb-4" style={{ color: "var(--navy)" }}>
            Varastjórn
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {alternates.map((m) => (
              <div
                key={m.name}
                className="p-4 rounded-lg border border-gray-100 bg-gray-50"
              >
                <p className="font-semibold text-gray-800">{m.name}</p>
                {m.location && (
                  <p className="text-sm text-gray-400">{m.location}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </SamtokinLayout>
  );
}
