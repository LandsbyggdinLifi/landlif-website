"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/", label: "Forsíða" },
  { href: "/um-okkur", label: "Um okkur" },
  { href: "/frettir", label: "Fréttir" },
  { href: "/hafa-samband", label: "Hafa samband" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span
              className="text-xl font-bold tracking-tight"
              style={{ color: "#394c75" }}
            >
              Landsbyggðin lifi
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-gray-600 hover:text-[#16a085] transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded text-gray-600"
            onClick={() => setOpen(!open)}
            aria-label="Opna valmynd"
          >
            <span className="block w-5 h-0.5 bg-current mb-1" />
            <span className="block w-5 h-0.5 bg-current mb-1" />
            <span className="block w-5 h-0.5 bg-current" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-2">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="block py-2 text-sm font-medium text-gray-700 hover:text-[#16a085]"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
