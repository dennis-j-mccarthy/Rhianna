import { headers } from "next/headers";
import NewsletterBuilder from "@/components/admin/NewsletterBuilder";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function NewsletterPage() {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host");
  const proto = requestHeaders.get("x-forwarded-proto") ?? "http";
  const defaultBaseUrl = host ? `${proto}://${host}` : "";

  const articles = await db.article.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
  });

  const picker = articles.map((a) => ({
    id: a.id,
    title: a.title,
    excerpt: a.excerpt,
    slug: a.slug,
    coverImage: a.coverImage,
    hasImage: Boolean(a.coverImage),
    dateLabel: (a.publishedAt ?? a.createdAt).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    }),
  }));

  return (
    <section className="admin-page admin-page-wide">
      <div className="admin-page-head">
        <h1>Newsletter</h1>
      </div>
      {picker.length === 0 ? (
        <p className="admin-muted">Publish some articles first, then assemble them here.</p>
      ) : (
        <NewsletterBuilder articles={picker} defaultBaseUrl={defaultBaseUrl} />
      )}
    </section>
  );
}
