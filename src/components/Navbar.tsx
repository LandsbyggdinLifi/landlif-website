"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";

const samtokinLinks = [
  { href: "/samtokin/markmid", label: "Markmi\u00F0" },
  { href: "/samtokin/log", label: "L\u00F6g" },
  { href: "/samtokin/stjorn", label: "Stj\u00F3rn" },
  { href: "/samtokin/felagsmenn", label: "F\u00E9lagsmenn" },
];

const starfidLinks = [
  { href: "/starfid/stefnumorkun", label: "Stefnum\u00F6rkun" },
  { href: "/starfid/verkefni-innanlands", label: "Verkefni innanlands" },
  { href: "/starfid/erlent-samstarf", label: "Erlent samstarf" },
  { href: "/starfid/fundargerdir", label: "Fundarger\u00F0ir" },
  { href: "/starfid/skipulag-ibuasamtaka", label: "Skipulag \u00EDb\u00FAasamtaka" },
  { href: "/starfid/byggdastefna", label: "Bygg\u00F0astefna" },
];

function DropdownMenu({
  label,
  links,
  id,
}: {
  label: string;
  links: { href: string; label: string }[];
  id: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="relative" ref={ref} id={id}>
      <button
        className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-[#16a085] transition-colors"
        onClick={() => setOpen(!open)}
      >
        {label}
        <svg
          className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-2 w-52 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#16a085] transition-colors"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function MobileAccordion({
  label,
  links,
  onClose,
}: {
  label: string;
  links: { href: string; label: string }[];
  onClose: () => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        className="flex items-center justify-between w-full py-2 text-sm font-medium text-gray-700 hover:text-[#16a085]"
        onClick={() => setOpen(!open)}
      >
        {label}
        <svg
          className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="pl-4 space-y-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="block py-2 text-sm text-gray-600 hover:text-[#16a085]"
              onClick={onClose}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight" style={{ color: "#394c75" }}>
              Landsbygg\u00F0in lifi
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-gray-600 hover:text-[#16a085] transition-colors">
              Fors\u00ED\u00F0a
            </Link>
            <DropdownMenu label="Samt\u00F6kin" links={samtokinLinks} id="dropdown-samtokin" />
            <DropdownMenu label="Starfi\u00F0" links={starfidLinks} id="dropdown-starfid" />
            <Link href="/frettir" className="text-sm font-medium text-gray-600 hover:text-[#16a085] transition-colors">
              Fr\u00E9ttir
            </Link>
            <Link href="/hafa-samband" className="text-sm font-medium text-gray-600 hover:text-[#16a085] transition-colors">
              Hafa samband
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded text-gray-600"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Opna valmynd"
          >
            <span className="block w-5 h-0.5 bg-current mb-1" />
            <span className="block w-5 h-0.5 bg-current mb-1" />
            <span className="block w-5 h-0.5 bg-current" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-1">
          <Link href="/" className="block py-2 text-sm font-medium text-gray-700 hover:text-[#16a085]"
            onClick={() => setMenuOpen(false)}>
            Fors\u00ED\u00F0a
          </Link>
          <MobileAccordion label="Samt\u00F6kin" links={samtokinLinks} onClose={() => setMenuOpen(false)} />
          <MobileAccordion label="Starfi\u00F0" links={starfidLinks} onClose={() => setMenuOpen(false)} />
          <Link href="/frettir" className="block py-2 text-sm font-medium text-gray-700 hover:text-[#16a085]"
            onClick={() => setMenuOpen(false)}>
            Fr\u00E9ttir
          </Link>
          <Link href="/hafa-samband" className="block py-2 text-sm font-medium text-gray-700 hover:text-[#16a085]"
            onClick={() => setMenuOpen(false)}>
            Hafa samband
          </Link>
        </div>
      )}
    </header>
  );
}
