"use client";

import { useEffect } from "react";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <section className="py-20 text-white" style={{ backgroundColor: "var(--navy)" }}>
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-4xl font-bold">Eitthvað fór úrskeiðis</h1>
          <p className="text-gray-300 mt-2">Villa kom upp við að hlaða þessari síðu.</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-gray-500 mb-6">
            {error.digest && (
              <span className="text-xs text-gray-400 block mb-2">
                Villa-auðkenni: {error.digest}
              </span>
            )}
            Vinsamlegast reyndu aftur eða hafðu samband við okkur ef vandinn
            heldur áfram.
          </p>
          <button
            onClick={unstable_retry}
            className="px-6 py-3 text-white rounded-lg font-medium transition hover:opacity-90"
            style={{ backgroundColor: "var(--navy)" }}
          >
            Reyna aftur
          </button>
        </div>
      </section>
    </>
  );
}
