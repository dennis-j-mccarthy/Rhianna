import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { getArticleBySlug } from "@/lib/articles";

export const dynamic = "force-dynamic";

function fullDate(date: Date) {
  return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article || !article.published) {
    return { title: "Not found · Rhianna Gray" };
  }
  return {
    title: `${article.title} · Rhianna Gray`,
    description: article.excerpt,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article || !article.published) {
    notFound();
  }

  const published = article.publishedAt ?? article.createdAt;

  return (
    <>
      <SiteHeader active="notebook" />

      <article className="article-page">
        <header className="article-hero wrap-narrow">
          <div className="article-meta">
            <span>{fullDate(published)}</span>
            <span>{article.readingMin} min read</span>
          </div>
          <h1>{article.title}</h1>
          <p className="article-lede">{article.excerpt}</p>
          {article.tags.length > 0 ? (
            <div className="article-tags">
              {article.tags.map((tag) => (
                <Link key={tag.id} href={`/notebook?tag=${encodeURIComponent(tag.slug)}`} className="tag">
                  {tag.name}
                </Link>
              ))}
            </div>
          ) : null}
        </header>

        {article.coverImage ? (
          <div className="article-cover wrap">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={article.coverImage} alt={article.title} />
          </div>
        ) : null}

        <div
          className="article-body wrap-narrow"
          dangerouslySetInnerHTML={{ __html: article.contentHtml }}
        />

        <div className="wrap-narrow article-footer">
          <Link href="/notebook" className="arrow-link">
            ← Back to the Notebook
          </Link>
        </div>
      </article>

      <SiteFooter />
    </>
  );
}
