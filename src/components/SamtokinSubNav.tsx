"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const subLinks = [
  { href: "/samtokin/markmid", label: "Markmið" },
  { href: "/samtokin/log", label: "Lög" },
  { href: "/samtokin/stjorn", label: "Stjórn" },
  { href: "/samtokin/felagsmenn", label: "Félagsmenn" },
];

export default function SamtokinSubNav() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-6 overflow-x-auto">
      {subLinks.map((l) => {
        const active = pathname === l.href;
        return (
          <Link
            key={l.href}
            href={l.href}
            className={`py-3 text-sm whitespace-nowrap border-b-2 -mb-px transition-colors ${
              active ? "font-semibold" : "font-medium"
            }`}
            style={
              active
                ? { borderColor: "var(--navy)", color: "var(--navy)" }
                : { borderColor: "transparent", color: "#6b7280" }
            }
            onMouseEnter={(e) => {
              if (!active) (e.currentTarget as HTMLElement).style.color = "var(--navy)";
            }}
            onMouseLeave={(e) => {
              if (!active) (e.currentTarget as HTMLElement).style.color = "#6b7280";
            }}
          >
            {l.label}
          </Link>
        );
      })}
    </nav>
  );
}
