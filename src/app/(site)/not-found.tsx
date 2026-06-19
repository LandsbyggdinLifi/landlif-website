import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <section className="py-20 text-white" style={{ backgroundColor: "var(--navy)" }}>
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-4xl font-bold">Síða fannst ekki</h1>
          <p className="text-gray-300 mt-2">Þessi slóð er ekki til eða hefur verið fjarlægð.</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-gray-500 mb-6">
            Athugaðu slóðina eða farðu aftur á forsíðuna.
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 text-white rounded-lg font-medium transition hover:opacity-90"
            style={{ backgroundColor: "var(--teal)" }}
          >
            Á forsíðu
          </Link>
        </div>
      </section>
    </>
  );
}
