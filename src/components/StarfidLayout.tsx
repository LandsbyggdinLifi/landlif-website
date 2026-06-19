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
            className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
              active
                ? "bg-moss text-white"
                : "text-ink/75 hover:bg-sand hover:text-moss"
            }`}
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
    <nav className="flex border-b border-stone/15 mb-10 overflow-x-auto">
      {links.map((l) => {
        const active = pathname === l.href;
        return (
          <Link
            key={l.href}
            href={l.href}
            className={`px-5 py-3 text-sm font-medium whitespace-nowrap border-b-2 -mb-px transition-colors ${
              active
                ? "border-amber text-ink"
                : "border-transparent text-stone hover:text-ink"
            }`}
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
      <section className="relative flex items-end bg-moss-deep min-h-[260px]">
        {heroImage?.asset && (
          <>
            <Image
              src={urlFor(heroImage).width(1600).height(520).url()}
              alt=""
              fill
              className="object-cover"
              priority
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(36,58,46,0.92) 0%, rgba(36,58,46,0.45) 100%)",
              }}
            />
          </>
        )}
        <div className="relative z-10 max-w-6xl mx-auto px-6 pb-10 pt-24 w-full">
          <p className="text-amber text-xs font-semibold uppercase tracking-widest mb-2">
            Starfið
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-semibold tracking-tight text-white">
            {title}
          </h1>
        </div>
      </section>

      {/* Content + optional nav */}
      <section className="py-14 bg-paper">
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
                <div className="rounded-xl border border-stone/15 bg-white p-3 md:sticky md:top-24">
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
