import { db } from "@/lib/db";

export function getPublishedArticles(opts?: { tag?: string }) {
  return db.article.findMany({
    where: {
      published: true,
      ...(opts?.tag ? { tags: { some: { slug: opts.tag } } } : {}),
    },
    orderBy: { publishedAt: "desc" },
    include: { tags: true },
  });
}

export function getFeaturedArticle() {
  return db.article.findFirst({
    where: { published: true, featured: true },
    orderBy: { publishedAt: "desc" },
    include: { tags: true },
  });
}

export function getArticleBySlug(slug: string) {
  return db.article.findUnique({
    where: { slug },
    include: { tags: true },
  });
}

export function getPublishedTags() {
  return db.tag.findMany({
    where: { articles: { some: { published: true } } },
    orderBy: { name: "asc" },
  });
}

export async function ensureUniqueSlug(base: string, excludeId?: string): Promise<string> {
  let slug = base;
  let suffix = 1;
  while (true) {
    const existing = await db.article.findUnique({ where: { slug }, select: { id: true } });
    if (!existing || existing.id === excludeId) return slug;
    suffix += 1;
    slug = `${base}-${suffix}`;
  }
}
