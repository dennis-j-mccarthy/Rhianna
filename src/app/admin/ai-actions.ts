"use server";

import Anthropic from "@anthropic-ai/sdk";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { getSetting, WRITING_VOICE_KEY } from "@/lib/settings";
import { db } from "@/lib/db";
import { ensureUniqueSlug } from "@/lib/articles";
import { slugify } from "@/lib/slug";
import { cleanHtml, parseTags, readingMinutes } from "@/lib/article-content";

export type DraftResult = {
  excerpt: string;
  contentHtml: string;
  tags: string[];
};

const DRAFT_SCHEMA = {
  type: "object",
  properties: {
    excerpt: {
      type: "string",
      description: "A 1-2 sentence teaser summarizing the article.",
    },
    contentHtml: {
      type: "string",
      description:
        "The full article body as semantic HTML using ONLY these tags: p, h2, h3, ul, ol, li, blockquote, strong, em, a. No h1 and do not repeat the title.",
    },
    tags: {
      type: "array",
      items: { type: "string" },
      description: "2-4 short, lowercase topical tags.",
    },
  },
  required: ["excerpt", "contentHtml", "tags"],
  additionalProperties: false,
} as const;

export async function generateDraft(input: {
  title: string;
  notes: string;
}): Promise<DraftResult> {
  await requireAdmin();

  const title = input.title?.trim();
  if (!title) {
    throw new Error("Add a working title before drafting.");
  }
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error("ANTHROPIC_API_KEY is not set — add it to your environment and restart.");
  }

  const voice = (await getSetting(WRITING_VOICE_KEY))?.trim();

  const system = `You are a ghostwriter for Rhianna Gray — an intuitive astrologer, animal communicator, and energy healer who keeps a slow, reflective blog called the Notebook. Write a complete blog article from the author's working title and notes.

${
    voice
      ? `Match this writing voice closely — study its rhythm, vocabulary, sentence length, and warmth:\n"""\n${voice}\n"""`
      : `Write in a warm, grounded, literary first-person voice — unhurried and sincere, never salesy.`
  }

Rules:
- Write the body only. Do NOT repeat the title and do NOT include an <h1>.
- Use semantic HTML with ONLY these tags: <p>, <h2>, <h3>, <ul>, <ol>, <li>, <blockquote>, <strong>, <em>, <a>.
- Aim for 500-900 words, with a couple of <h2> subheadings and at least one list where it fits naturally.
- Avoid AI clichés ("in today's fast-paced world", "in conclusion", "delve", "tapestry", "navigate the", "it's important to note").
- The excerpt is a 1-2 sentence teaser. Tags are 2-4 short lowercase topics.`;

  const client = new Anthropic();

  const message = await client.messages.create({
    model: "claude-opus-4-7",
    max_tokens: 4000,
    system: [{ type: "text", text: system, cache_control: { type: "ephemeral" } }],
    messages: [
      {
        role: "user",
        content: `Title: ${title}\n\nNotes:\n${input.notes?.trim() || "(no extra notes — work from the title)"}`,
      },
    ],
    output_config: { format: { type: "json_schema", schema: DRAFT_SCHEMA } },
  });

  const block = message.content.find((b) => b.type === "text");
  if (!block || block.type !== "text") {
    throw new Error("The AI did not return a draft. Please try again.");
  }

  const parsed = JSON.parse(block.text) as DraftResult;
  return {
    excerpt: typeof parsed.excerpt === "string" ? parsed.excerpt : "",
    contentHtml: typeof parsed.contentHtml === "string" ? parsed.contentHtml : "",
    tags: Array.isArray(parsed.tags) ? parsed.tags.filter((t) => typeof t === "string") : [],
  };
}

const QUICK_SCHEMA = {
  type: "object",
  properties: {
    title: { type: "string", description: "A clear, evocative article title derived from the idea." },
    excerpt: { type: "string", description: "A 1-2 sentence teaser." },
    contentHtml: {
      type: "string",
      description:
        "The full article body as semantic HTML using ONLY these tags: p, h2, h3, ul, ol, li, blockquote, strong, em, a. No h1 and do not repeat the title.",
    },
    tags: { type: "array", items: { type: "string" }, description: "2-4 short lowercase topical tags." },
  },
  required: ["title", "excerpt", "contentHtml", "tags"],
  additionalProperties: false,
} as const;

// Voice/quick create: take a spoken idea, draft a full article, save as a draft, open it for editing.
export async function quickCreateArticle(formData: FormData) {
  await requireAdmin();

  const idea = String(formData.get("idea") ?? "").trim();
  if (!idea) {
    throw new Error("Say or type your idea first.");
  }
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error("ANTHROPIC_API_KEY is not set — add it to your environment and restart.");
  }

  const voice = (await getSetting(WRITING_VOICE_KEY))?.trim();

  const system = `You are a ghostwriter for Rhianna Gray — an intuitive astrologer, animal communicator, and energy healer who keeps a slow, reflective blog called the Notebook. The author has spoken a rough idea (and possibly a title) out loud; it may be informal or rambling. Turn it into a finished first-draft article.

${
    voice
      ? `Match this writing voice closely — study its rhythm, vocabulary, and warmth:\n"""\n${voice}\n"""`
      : `Write in a warm, grounded, literary first-person voice — unhurried and sincere, never salesy.`
  }

Rules:
- Infer a clear title from the idea (don't just echo the raw words).
- Write the body only — no <h1>, don't repeat the title.
- Use semantic HTML with ONLY: <p>, <h2>, <h3>, <ul>, <ol>, <li>, <blockquote>, <strong>, <em>, <a>.
- Aim for 500-900 words with a couple of subheadings.
- Avoid AI clichés ("in today's fast-paced world", "in conclusion", "delve", "tapestry").`;

  const client = new Anthropic();
  const message = await client.messages.create({
    model: "claude-opus-4-7",
    max_tokens: 4000,
    system: [{ type: "text", text: system, cache_control: { type: "ephemeral" } }],
    messages: [{ role: "user", content: `Spoken idea:\n${idea}` }],
    output_config: { format: { type: "json_schema", schema: QUICK_SCHEMA } },
  });

  const block = message.content.find((b) => b.type === "text");
  if (!block || block.type !== "text") {
    throw new Error("The AI did not return a draft. Please try again.");
  }
  const parsed = JSON.parse(block.text) as DraftResult & { title: string };

  const title = (parsed.title || "Untitled").trim();
  const slug = await ensureUniqueSlug(slugify(title));
  const contentHtml = cleanHtml(parsed.contentHtml ?? "");
  const tags = parseTags((parsed.tags ?? []).join(", "));

  const article = await db.article.create({
    data: {
      slug,
      title,
      excerpt: parsed.excerpt ?? "",
      contentHtml,
      published: false,
      readingMin: readingMinutes(contentHtml),
      tags: {
        connectOrCreate: tags.map((t) => ({
          where: { slug: t.slug },
          create: { name: t.name, slug: t.slug },
        })),
      },
    },
  });

  revalidatePath("/admin");
  redirect(`/admin/articles/${article.id}/edit?focus=body`);
}
