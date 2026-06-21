import { useEffect, useState } from "react";
import { Card, Code, Stack, Text } from "@sanity/ui";
import {
  set,
  unset,
  useClient,
  useFormValue,
  type ObjectInputProps,
} from "sanity";
import { apiVersion } from "../env";

type SlugValue = { _type?: string; current?: string };

// Mirrors Sanity's default slugify (lowercase, whitespace → dashes, truncate)
// so auto-generated slugs match any created earlier via the "Generate" button.
function slugify(input: string, maxLength: number): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, maxLength)
    .replace(/^-+|-+$/g, "");
}

/**
 * Read-only slug ("slóð") input for non-technical editors. The slug is never
 * shown as an editable control — it is generated automatically from the title
 * and frozen once the document has been published, so URLs stay stable.
 */
export function AutoSlugInput(props: ObjectInputProps) {
  const { value, onChange, schemaType } = props;
  const slug = value as SlugValue | undefined;
  const options = schemaType.options as
    | { source?: string; maxLength?: number }
    | undefined;
  const source = options?.source ?? "title";
  const maxLength = options?.maxLength ?? 200;

  const current = slug?.current ?? "";
  const title = useFormValue([source]) as string | undefined;
  const id = (useFormValue(["_id"]) as string | undefined) ?? "";
  const publishedId = id.replace(/^drafts\./, "");

  const client = useClient({ apiVersion });
  const [locked, setLocked] = useState(false);

  // Freeze the slug once a published version already has one, so renaming the
  // title later never changes a live URL.
  useEffect(() => {
    if (!publishedId) return;
    let cancelled = false;
    client
      .fetch<string | null>("*[_id == $id][0].slug.current", { id: publishedId })
      .then((existing) => {
        if (!cancelled && existing) setLocked(true);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [client, publishedId]);

  // Keep the slug in sync with the title until it is frozen. Debounced so the
  // settled title is captured rather than a half-typed one.
  useEffect(() => {
    if (locked) return;
    const next = title ? slugify(title, maxLength) : "";
    if (next === current) return;
    const timer = setTimeout(() => {
      onChange(next ? set({ _type: "slug", current: next }) : unset());
    }, 400);
    return () => clearTimeout(timer);
  }, [title, locked, maxLength, current, onChange]);

  return (
    <Card padding={3} radius={2} tone="transparent" border>
      <Stack space={2}>
        {slug?.current ? (
          <Code size={1}>{slug.current}</Code>
        ) : (
          <Text size={1} muted>
            Vefslóðin býr til sjálfkrafa þegar titill er skrifaður.
          </Text>
        )}
      </Stack>
    </Card>
  );
}
