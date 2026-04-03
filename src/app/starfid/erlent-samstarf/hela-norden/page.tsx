import type { Metadata } from "next";
import { client } from "@/sanity/client";
import { pageByIdQuery } from "@/sanity/queries";
import PortableTextRenderer from "@/components/PortableTextRenderer";
import StarfidLayout from "@/components/StarfidLayout";

export const revalidate = 60;
export const metadata: Metadata = { title: "Hela norden skal leva" };

export default async function Page() {
  const page = await client.fetch(pageByIdQuery, { id: "page-starfid-hela-norden" }).catch(() => null);
  return (
    <StarfidLayout title={page?.title || "Hela norden skal leva"} section="erlent-samstarf" heroImage={page?.heroImage}>
      {page?.body ? <PortableTextRenderer value={page.body} /> : (
        <div>
          <blockquote className="border-l-4 pl-4 italic text-gray-600 mb-6" style={{ borderColor: "#16a085" }}>
            &ldquo;Markmið er að vera netmiðstöð á Norðurlandasvæðinu til að styrkja staðbundna þróun með því að deila reynslu og þekkingu. Einnig að efla norrænt samstarf, sérstaklega á dreifbýlissvæðum.&rdquo;
          </blockquote>
          <h2 className="text-xl font-bold mb-3" style={{ color: "#394c75" }}>Fundarseta</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            Tveir fundir eru haldnir árlega. Voarfundirnir skiptast á milli Norðurlandanna.
          </p>
          <h2 className="text-xl font-bold mb-3" style={{ color: "#394c75" }}>Þátttaka LBL</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            Samtökin hafa tekið þátt í samstarfsverkefnum í gegnum þetta net, þar á meðal verkefninu &ldquo;Signs goes North&rdquo; sem notar skiltamerkingar í borgum til að styðja við aðlögun innflytjenda á Íslandi, í Danmörku, Svíþjóð og Hollandi.
          </p>
          <a
            href="http://helanorden.se/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#16a085" }}
          >
            Heimasíða HNSL →
          </a>
        </div>
      )}
    </StarfidLayout>
  );
}
