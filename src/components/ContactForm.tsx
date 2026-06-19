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
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Nafn
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
          placeholder="Nafn þitt"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Netfang
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
          placeholder="netfang@example.is"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          Skilaboð
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
          placeholder="Hvernig getum við aðstoðað?"
        />
      </div>
      <button
        type="submit"
        className="w-full py-3 rounded-lg text-white font-semibold transition-opacity hover:opacity-90"
        style={{ backgroundColor: "var(--teal)" }}
      >
        Senda skilaboð
      </button>
      {sent && (
        <p className="text-sm text-gray-500" role="status">
          Tölvupóstforritið þitt ætti að hafa opnast með skilaboðunum. Ef ekki, sendu
          okkur póst beint á{" "}
          <a href={`mailto:${email}`} className="underline" style={{ color: "var(--teal)" }}>
            {email}
          </a>
          .
        </p>
      )}
    </form>
  );
}
