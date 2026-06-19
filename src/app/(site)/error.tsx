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
      <section className="py-20 bg-moss-deep text-white">
        <div className="max-w-6xl mx-auto px-6">
          <span className="block w-12 h-px bg-amber mb-5" />
          <h1 className="font-serif text-4xl sm:text-5xl font-semibold tracking-tight">Eitthvað fór úrskeiðis</h1>
          <p className="text-white/70 mt-3">Villa kom upp við að hlaða þessari síðu.</p>
        </div>
      </section>

      <section className="py-16 bg-paper">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-stone mb-6">
            {error.digest && (
              <span className="text-xs text-stone block mb-2">
                Villa-auðkenni: {error.digest}
              </span>
            )}
            Vinsamlegast reyndu aftur eða hafðu samband við okkur ef vandinn
            heldur áfram.
          </p>
          <button
            onClick={unstable_retry}
            className="px-6 py-3 rounded-full font-semibold bg-amber text-white hover:bg-amber-dark transition-colors"
          >
            Reyna aftur
          </button>
        </div>
      </section>
    </>
  );
}
