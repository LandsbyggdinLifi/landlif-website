"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { urlFor } from "@/sanity/image";
import { starfidSubNav } from "@/lib/starfidNav";

interface NavLink {
  href: string;
  label: string;
}

interface Props {
  title: string;
  section?: string;
  heroImage?: { asset: { _ref: string } };
  subNavLinks?: NavLink[];
  children: React.ReactNode;
}

function SubNav({ section, subNavLinks }: { section: string; subNavLinks?: NavLink[] }) {
  const pathname = usePathname();
  const links = subNavLinks ?? starfidSubNav[section];
  if (!links || links.length === 0) return null;

  return (
    <nav className="flex flex-col gap-1">
      {links.map((l) => {
        const active = pathname === l.href;
        return (
          <Link
            key={l.href}
            href={l.href}
            className="px-4 py-3 rounded-lg text-sm font-medium transition-colors"
            style={
              active
                ? { backgroundColor: "var(--navy)", color: "white" }
                : { color: "var(--navy)" }
            }
            onMouseEnter={(e) => {
              if (!active) (e.currentTarget as HTMLElement).style.backgroundColor = "var(--gray-light)";
            }}
            onMouseLeave={(e) => {
              if (!active) (e.currentTarget as HTMLElement).style.backgroundColor = "";
            }}
          >
            {l.label}
          </Link>
        );
      })}
    </nav>
  );
}

export default function StarfidLayout({ title, section, heroImage, subNavLinks, children }: Props) {
  const subLinks = subNavLinks ?? (section ? starfidSubNav[section] : null);

  return (
    <>
      {/* Hero */}
      <section
        className="relative flex items-end"
        style={{ minHeight: "220px", backgroundColor: "var(--navy)" }}
      >
        {heroImage?.asset && (
          <>
            <Image
              src={urlFor(heroImage).width(1600).height(440).url()}
              alt=""
              fill
              className="object-cover"
              priority
            />
            <div
              className="absolute inset-0"
              style={{ backgroundColor: "rgba(57,76,117,0.6)" }}
            />
          </>
        )}
        <div className="relative z-10 max-w-6xl mx-auto px-6 pb-10 pt-20 w-full">
          <p className="text-blue-300 text-sm mb-1">Starfið</p>
          <h1 className="text-4xl font-bold text-white">{title}</h1>
        </div>
      </section>

      {/* Content + optional sidebar */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          {subLinks ? (
            <div className="flex flex-col md:flex-row gap-10">
              {/* Sidebar */}
              <aside className="md:w-52 flex-shrink-0">
                <div className="rounded-xl border border-gray-100 p-3 md:sticky md:top-24">
                  <SubNav section={section!} subNavLinks={subNavLinks} />
                </div>
              </aside>
              {/* Main content */}
              <div className="flex-1 min-w-0">{children}</div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto">{children}</div>
          )}
        </div>
      </section>
    </>
  );
}
