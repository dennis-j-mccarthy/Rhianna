import sanitizeHtml from "sanitize-html";
import { slugify } from "@/lib/slug";

const ALLOWED = {
  allowedTags: [
    "p", "br", "hr", "h1", "h2", "h3", "h4", "blockquote", "pre", "code",
    "strong", "em", "s", "u", "a", "ul", "ol", "li",
  ],
  allowedAttributes: { a: ["href", "target", "rel"] },
  allowedSchemes: ["http", "https", "mailto"],
  transformTags: {
    a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer" }),
  },
} satisfies sanitizeHtml.IOptions;

export function cleanHtml(raw: string): string {
  return sanitizeHtml(raw, ALLOWED).trim();
}

export function readingMinutes(html: string): number {
  const words = html
    .replace(/<[^>]+>/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function parseTags(raw: string): { name: string; slug: string }[] {
  const seen = new Set<string>();
  const tags: { name: string; slug: string }[] = [];
  for (const piece of raw.split(",")) {
    const name = piece.trim().replace(/\s+/g, " ");
    if (!name) continue;
    const slug = slugify(name);
    if (seen.has(slug)) continue;
    seen.add(slug);
    tags.push({ name, slug });
  }
  return tags;
}
