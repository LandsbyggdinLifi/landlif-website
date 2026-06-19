"use client";

export default function GlobalError({
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <html lang="is">
      <body className="min-h-screen flex items-center justify-center bg-paper">
        <div className="text-center px-6">
          <h1 className="text-3xl font-bold text-ink mb-3">
            Eitthvað fór úrskeiðis
          </h1>
          <p className="text-stone mb-6">
            Villa kom upp. Vinsamlegast reyndu aftur.
          </p>
          <button
            onClick={unstable_retry}
            className="px-6 py-3 rounded-full font-semibold bg-amber text-white hover:bg-amber-dark transition-colors"
          >
            Reyna aftur
          </button>
        </div>
      </body>
    </html>
  );
}
