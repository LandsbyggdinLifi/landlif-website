import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

/**
 * Called by a Sanity webhook whenever a document is published, updated or
 * deleted. Pages are cached (see `revalidate` on each page); this expires the
 * whole site cache so editors see their changes immediately. The site is small,
 * so clearing everything is simpler and safer than per-document tags.
 */
export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json({ message: "Missing SANITY_REVALIDATE_SECRET" }, { status: 500 });
  }

  try {
    // `true` waits for Content Lake to be consistent before we revalidate,
    // so the re-render doesn't fetch the old version.
    const { isValidSignature, body } = await parseBody<{ _type?: string }>(req, secret, true);
    if (!isValidSignature) {
      return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
    }

    revalidatePath("/", "layout");
    return NextResponse.json({ revalidated: true, type: body?._type ?? null });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Error revalidating" }, { status: 500 });
  }
}
