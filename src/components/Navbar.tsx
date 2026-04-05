"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";

const samtokinLinks = [
  { href: "/samtokin/markmid", label: "Markmið" },
  { href: "/samtokin/log", label: "Lög" },
  { href: "/samtokin/stjorn", label: "Stjórn" },
  { href: "/samtokin/felagsmenn", label: "Félagsmenn" },
];

const starfidLinks = [
  { href: "/starfid", label: "Yfirlit" },
  { href: "/starfid/stefnumorkun", label: "Stefnumörkun" },
  { href: "/starfid/samstarf-erlendis", label: "Samstarf Erlendis" },
  { href: "/starfid/verkefni-erlendis", label: "Verkefni Erlendis" },
  { href: "/starfid/samstarf-innanlands", label: "Samstarf Innanlands" },
  { href: "/starfid/verkefni-innanlands", label: "Verkefni Innanlands" },
  { href: "/starfid/fundargerdir", label: "Fundargerðir" },
  { href: "/starfid/skipulag-ibuasamtaka", label: "Skipulag íbúasamtaka" },
  { href: "/starfid/byggdastefna", label: "Byggðastefna" },
];

function DropdownMenu({
  label,
  links,
  id,
  active,
}: {
  label: string;
  links: { href: string; label: string }[];
  id: string;
  active: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

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
        className={`flex items-center gap-1 text-sm font-medium transition-colors ${
          active ? "text-teal" : "text-gray-600 hover:text-teal"
        }`}
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
              className={`block px-4 py-2 text-sm transition-colors ${
                pathname === l.href
                  ? "text-teal font-semibold bg-gray-50"
                  : "text-gray-700 hover:bg-gray-50 hover:text-teal"
              }`}
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
  active,
}: {
  label: string;
  links: { href: string; label: string }[];
  onClose: () => void;
  active: boolean;
}) {
  const [open, setOpen] = useState(active);
  const pathname = usePathname();

  return (
    <div>
      <button
        className={`flex items-center justify-between w-full py-2 text-sm font-medium ${
          active ? "text-teal" : "text-gray-700 hover:text-teal"
        }`}
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
              className={`block py-2 text-sm ${
                pathname === l.href
                  ? "text-teal font-semibold"
                  : "text-gray-600 hover:text-teal"
              }`}
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
  const pathname = usePathname();

  const inSamtokin = pathname.startsWith("/samtokin");
  const inStarfid = pathname.startsWith("/starfid");

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-t-4 border-teal">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Landsbyggðin lifi"
              width={120}
              height={92}
              className="h-10 w-auto"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors ${
                pathname === "/" ? "text-teal" : "text-gray-600 hover:text-teal"
              }`}
            >
              Forsíða
            </Link>
            <Link
              href="/frettir"
              className={`text-sm font-medium transition-colors ${
                pathname.startsWith("/frettir") ? "text-teal" : "text-gray-600 hover:text-teal"
              }`}
            >
              Fréttir
            </Link>
            <DropdownMenu label="Samtökin" links={samtokinLinks} id="dropdown-samtokin" active={inSamtokin} />
            <DropdownMenu label="Starfið" links={starfidLinks} id="dropdown-starfid" active={inStarfid} />
            <Link
              href="/myndir"
              className={`text-sm font-medium transition-colors ${
                pathname.startsWith("/myndir") ? "text-teal" : "text-gray-600 hover:text-teal"
              }`}
            >
              Myndasöfn
            </Link>
            <Link
              href="/hafa-samband"
              className={`text-sm font-medium transition-colors ${
                pathname === "/hafa-samband" ? "text-teal" : "text-gray-600 hover:text-teal"
              }`}
            >
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
          <Link
            href="/"
            className={`block py-2 text-sm font-medium ${pathname === "/" ? "text-teal" : "text-gray-700 hover:text-teal"}`}
            onClick={() => setMenuOpen(false)}
          >
            Forsíða
          </Link>
          <Link
            href="/frettir"
            className={`block py-2 text-sm font-medium ${pathname.startsWith("/frettir") ? "text-teal" : "text-gray-700 hover:text-teal"}`}
            onClick={() => setMenuOpen(false)}
          >
            Fréttir
          </Link>
          <MobileAccordion label="Samtökin" links={samtokinLinks} onClose={() => setMenuOpen(false)} active={inSamtokin} />
          <MobileAccordion label="Starfið" links={starfidLinks} onClose={() => setMenuOpen(false)} active={inStarfid} />
          <Link
            href="/myndir"
            className={`block py-2 text-sm font-medium ${pathname.startsWith("/myndir") ? "text-teal" : "text-gray-700 hover:text-teal"}`}
            onClick={() => setMenuOpen(false)}
          >
            Myndasöfn
          </Link>
          <Link
            href="/hafa-samband"
            className={`block py-2 text-sm font-medium ${pathname === "/hafa-samband" ? "text-teal" : "text-gray-700 hover:text-teal"}`}
            onClick={() => setMenuOpen(false)}
          >
            Hafa samband
          </Link>
        </div>
      )}
    </header>
  );
}
