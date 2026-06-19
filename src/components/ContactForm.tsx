"use client";

import { useState } from "react";

export default function ContactForm({ email }: { email: string }) {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement)?.value.trim();
    const fromEmail = (form.elements.namedItem("email") as HTMLInputElement)?.value.trim();
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement)?.value.trim();

    const subject = name ? `Skilaboð frá ${name}` : "Skilaboð af vefsíðu";
    const body = [
      `Nafn: ${name || "—"}`,
      `Netfang: ${fromEmail || "—"}`,
      "",
      message || "",
    ].join("\n");

    window.location.href = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-ink/80 mb-1">
          Nafn
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full px-4 py-2 border border-stone/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber focus:border-amber"
          placeholder="Nafn þitt"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-ink/80 mb-1">
          Netfang
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full px-4 py-2 border border-stone/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber focus:border-amber"
          placeholder="netfang@example.is"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-ink/80 mb-1">
          Skilaboð
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="w-full px-4 py-2 border border-stone/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber focus:border-amber"
          placeholder="Hvernig getum við aðstoðað?"
        />
      </div>
      <button
        type="submit"
        className="w-full py-3 rounded-full bg-amber text-white font-semibold transition-colors hover:bg-amber-dark"
      >
        Senda skilaboð
      </button>
      {sent && (
        <p className="text-sm text-stone" role="status">
          Tölvupóstforritið þitt ætti að hafa opnast með skilaboðunum. Ef ekki, sendu
          okkur póst beint á{" "}
          <a href={`mailto:${email}`} className="underline text-amber hover:text-amber-dark">
            {email}
          </a>
          .
        </p>
      )}
    </form>
  );
}
