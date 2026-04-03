"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";

const samtokinLinks = [
  { href: "/samtokin/markmid", label: "Markmið" },
  { href: "/samtokin/log", label: "Lög" },
  { href: "/samtokin/stjorn", label: "Stjórn" },
  { href: "/samtokin/felagsmenn", label: "Félagsmenn" },
];

const topLinks = [
  { href: "/", label: "Forsíða" },
  { href: "/frettir", label: "Fréttir" },
  { href: "/hafa-samband", label: "Hafa samband" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

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
            <Link
              href="/"
              className="text-sm font-medium text-gray-600 hover:text-[#16a085] transition-colors"
            >
              Forsíða
            </Link>

            {/* Samtökin dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-[#16a085] transition-colors"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                Samtökin
                <svg
                  className={`w-3.5 h-3.5 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {dropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-44 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
                  {samtokinLinks.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#16a085] transition-colors"
                      onClick={() => setDropdownOpen(false)}
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {topLinks.slice(1).map((l) => (
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
            className="block py-2 text-sm font-medium text-gray-700 hover:text-[#16a085]"
            onClick={() => setMenuOpen(false)}
          >
            Forsíða
          </Link>

          {/* Mobile Samtökin accordion */}
          <div>
            <button
              className="flex items-center justify-between w-full py-2 text-sm font-medium text-gray-700 hover:text-[#16a085]"
              onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
            >
              Samtökin
              <svg
                className={`w-3.5 h-3.5 transition-transform ${mobileDropdownOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {mobileDropdownOpen && (
              <div className="pl-4 space-y-1">
                {samtokinLinks.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="block py-2 text-sm text-gray-600 hover:text-[#16a085]"
                    onClick={() => { setMenuOpen(false); setMobileDropdownOpen(false); }}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {topLinks.slice(1).map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="block py-2 text-sm font-medium text-gray-700 hover:text-[#16a085]"
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
