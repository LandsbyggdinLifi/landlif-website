export default function Loading() {
  return (
    <>
      <section className="py-20 bg-moss-deep">
        <div className="max-w-6xl mx-auto px-6">
          <div className="h-9 w-48 bg-white/20 rounded animate-pulse" />
          <div className="h-4 w-72 bg-white/10 rounded mt-3 animate-pulse" />
        </div>
      </section>

      <section className="py-16 bg-paper">
        <div className="max-w-6xl mx-auto px-6 space-y-4">
          <div className="h-4 bg-stone/15 rounded animate-pulse w-full" />
          <div className="h-4 bg-stone/15 rounded animate-pulse w-5/6" />
          <div className="h-4 bg-stone/15 rounded animate-pulse w-4/6" />
          <div className="h-4 bg-stone/15 rounded animate-pulse w-full mt-6" />
          <div className="h-4 bg-stone/15 rounded animate-pulse w-3/4" />
        </div>
      </section>
    </>
  );
}
