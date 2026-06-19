"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { urlFor } from "@/sanity/image";

interface NavLink {
  href: string;
  label: string;
}

interface Props {
  title: string;
  section?: string;
  heroImage?: { asset: { _ref: string } };
  subNavLinks?: NavLink[];
  navLayout?: "vertical" | "horizontal";
  children: React.ReactNode;
}

function SubNav({ subNavLinks }: { subNavLinks?: NavLink[] }) {
  const pathname = usePathname();
  const links = subNavLinks;
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

function HorizontalNav({ subNavLinks }: { subNavLinks?: NavLink[] }) {
  const pathname = usePathname();
  const links = subNavLinks;
  if (!links || links.length === 0) return null;

  return (
    <nav className="flex gap-0 border-b border-gray-200 mb-10 overflow-x-auto">
      {links.map((l) => {
        const active = pathname === l.href;
        return (
          <Link
            key={l.href}
            href={l.href}
            className="px-5 py-3 text-sm font-medium whitespace-nowrap border-b-2 -mb-px transition-colors"
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

export default function StarfidLayout({ title, heroImage, subNavLinks, navLayout = "vertical", children }: Props) {
  const subLinks = subNavLinks ?? null;

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
              style={{ backgroundColor: "rgba(28,28,30,0.6)" }}
            />
          </>
        )}
        <div className="relative z-10 max-w-6xl mx-auto px-6 pb-10 pt-20 w-full">
          <p className="text-gray-400 text-sm mb-1">Starfið</p>
          <h1 className="text-4xl font-bold text-white">{title}</h1>
        </div>
      </section>

      {/* Content + optional nav */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          {navLayout === "horizontal" ? (
            <>
              <HorizontalNav subNavLinks={subNavLinks} />
              <div className="max-w-3xl">{children}</div>
            </>
          ) : subLinks ? (
            <div className="flex flex-col md:flex-row gap-10">
              {/* Sidebar */}
              <aside className="md:w-52 flex-shrink-0">
                <div className="rounded-xl border border-gray-100 p-3 md:sticky md:top-24">
                  <SubNav subNavLinks={subNavLinks} />
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
