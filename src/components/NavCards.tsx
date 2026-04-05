import Link from "next/link";

interface NavCard {
  href: string;
  label: string;
}

export default function NavCards({ cards }: { cards: NavCard[] }) {
  return (
    <div className="grid gap-3">
      {cards.map((card) => (
        <Link
          key={card.href}
          href={card.href}
          className="flex items-center justify-between px-6 py-4 rounded-xl font-semibold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: "var(--navy)" }}
        >
          <span>{card.label}</span>
          <span className="text-lg" style={{ color: "var(--teal)" }}>→</span>
        </Link>
      ))}
    </div>
  );
}
