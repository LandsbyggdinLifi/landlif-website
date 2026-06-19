import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <section className="py-20 bg-moss-deep text-white">
        <div className="max-w-6xl mx-auto px-6">
          <span className="block w-12 h-px bg-amber mb-5" />
          <h1 className="font-serif text-4xl sm:text-5xl font-semibold tracking-tight">Síða fannst ekki</h1>
          <p className="text-white/70 mt-3">Þessi slóð er ekki til eða hefur verið fjarlægð.</p>
        </div>
      </section>

      <section className="py-16 bg-paper">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-stone mb-6">
            Athugaðu slóðina eða farðu aftur á forsíðuna.
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 rounded-full font-semibold bg-amber text-white hover:bg-amber-dark transition-colors"
          >
            Á forsíðu
          </Link>
        </div>
      </section>
    </>
  );
}
