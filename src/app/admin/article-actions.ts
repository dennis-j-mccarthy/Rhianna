"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { ensureUniqueSlug } from "@/lib/articles";
import { slugify } from "@/lib/slug";
import { cleanHtml, parseTags, readingMinutes } from "@/lib/article-content";

type ParsedForm = {
  title: string;
  slugInput: string;
  excerpt: string;
  coverImage: string | null;
  contentHtml: string;
  published: boolean;
  featured: boolean;
  tags: { name: string; slug: string }[];
};

function parseForm(formData: FormData): ParsedForm {
  return {
    title: String(formData.get("title") ?? "").trim(),
    slugInput: String(formData.get("slug") ?? "").trim(),
    excerpt: String(formData.get("excerpt") ?? "").trim(),
    coverImage: String(formData.get("coverImage") ?? "").trim() || null,
    contentHtml: cleanHtml(String(formData.get("contentHtml") ?? "")),
    published: formData.get("published") === "on",
    featured: formData.get("featured") === "on",
    tags: parseTags(String(formData.get("tags") ?? "")),
  };
}

export async function createArticle(formData: FormData) {
  await requireAdmin();
  const data = parseForm(formData);
  if (!data.title) throw new Error("Title is required");

  const slug = await ensureUniqueSlug(slugify(data.slugInput || data.title));

  await db.article.create({
    data: {
      slug,
      title: data.title,
      excerpt: data.excerpt,
      contentHtml: data.contentHtml,
      coverImage: data.coverImage,
      published: data.published,
      featured: data.featured,
      readingMin: readingMinutes(data.contentHtml),
      publishedAt: data.published ? new Date() : null,
      tags: {
        connectOrCreate: data.tags.map((t) => ({
          where: { slug: t.slug },
          create: { name: t.name, slug: t.slug },
        })),
      },
    },
  });

  revalidatePath("/notebook");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function updateArticle(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Missing article id");

  const existing = await db.article.findUnique({ where: { id } });
  if (!existing) throw new Error("Article not found");

  const data = parseForm(formData);
  if (!data.title) throw new Error("Title is required");

  const slug = await ensureUniqueSlug(slugify(data.slugInput || data.title), id);
  const nowPublishing = data.published && !existing.published;

  await db.article.update({
    where: { id },
    data: {
      slug,
      title: data.title,
      excerpt: data.excerpt,
      contentHtml: data.contentHtml,
      coverImage: data.coverImage,
      published: data.published,
      featured: data.featured,
      readingMin: readingMinutes(data.contentHtml),
      publishedAt: nowPublishing ? new Date() : data.published ? existing.publishedAt : null,
      tags: {
        set: [],
        connectOrCreate: data.tags.map((t) => ({
          where: { slug: t.slug },
          create: { name: t.name, slug: t.slug },
        })),
      },
    },
  });

  revalidatePath("/notebook");
  revalidatePath(`/notebook/${existing.slug}`);
  revalidatePath(`/notebook/${slug}`);
  revalidatePath("/admin");
  redirect("/admin");
}

export async function togglePublished(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Missing article id");

  const existing = await db.article.findUnique({ where: { id } });
  if (!existing) throw new Error("Article not found");

  const nextPublished = !existing.published;
  await db.article.update({
    where: { id },
    data: {
      published: nextPublished,
      publishedAt: nextPublished ? existing.publishedAt ?? new Date() : existing.publishedAt,
    },
  });

  revalidatePath("/notebook");
  revalidatePath(`/notebook/${existing.slug}`);
  revalidatePath("/admin");
}

export async function deleteArticle(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Missing article id");

  const existing = await db.article.findUnique({ where: { id } });
  if (!existing) return;

  await db.article.delete({ where: { id } });

  revalidatePath("/notebook");
  revalidatePath(`/notebook/${existing.slug}`);
  revalidatePath("/admin");
}
