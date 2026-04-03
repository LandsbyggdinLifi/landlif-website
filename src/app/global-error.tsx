"use client";

export default function GlobalError({
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <html lang="is">
      <body className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center px-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-3">
            Eitthvað fór úrskeiðis
          </h1>
          <p className="text-gray-500 mb-6">
            Villa kom upp. Vinsamlegast reyndu aftur.
          </p>
          <button
            onClick={unstable_retry}
            className="px-6 py-3 text-white rounded-lg font-medium"
            style={{ backgroundColor: "#394c75" }}
          >
            Reyna aftur
          </button>
        </div>
      </body>
    </html>
  );
}
