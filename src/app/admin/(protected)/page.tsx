import Link from "next/link";
import { db } from "@/lib/db";
import { deleteArticle, togglePublished } from "@/app/admin/article-actions";
import QuickCreate from "@/components/admin/QuickCreate";

export const dynamic = "force-dynamic";

function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export default async function AdminArticlesPage() {
  const articles = await db.article.findMany({
    orderBy: { updatedAt: "desc" },
    include: { tags: true },
  });

  return (
    <section className="admin-page">
      <div className="admin-page-head">
        <h1>Articles</h1>
        <div className="admin-head-actions">
          <QuickCreate />
          <Link href="/admin/articles/new" className="btn">
            New article
          </Link>
        </div>
      </div>

      {articles.length === 0 ? (
        <p className="admin-muted">No articles yet. Create your first one.</p>
      ) : (
        <ul className="admin-list">
          {articles.map((article) => (
            <li key={article.id} className="admin-row">
              <div className="admin-row-main">
                <div className="admin-row-title">
                  <Link href={`/admin/articles/${article.id}/edit`}>{article.title}</Link>
                  {article.featured ? <span className="admin-flag">Featured</span> : null}
                </div>
                <div className="admin-row-meta">
                  <span className={article.published ? "status status-live" : "status status-draft"}>
                    {article.published ? "Published" : "Draft"}
                  </span>
                  <span className="admin-muted">Updated {formatDate(article.updatedAt)}</span>
                  {article.tags.length > 0 ? (
                    <span className="admin-row-tags">
                      {article.tags.map((t) => (
                        <span key={t.id} className="tag tag-sm">
                          {t.name}
                        </span>
                      ))}
                    </span>
                  ) : null}
                </div>
              </div>

              <div className="admin-row-actions">
                <Link href={`/admin/articles/${article.id}/edit`} className="admin-bar-link">
                  Edit
                </Link>
                <form action={togglePublished}>
                  <input type="hidden" name="id" value={article.id} />
                  <button type="submit" className="admin-bar-link admin-linkbtn">
                    {article.published ? "Unpublish" : "Publish"}
                  </button>
                </form>
                <form action={deleteArticle}>
                  <input type="hidden" name="id" value={article.id} />
                  <button type="submit" className="admin-bar-link admin-linkbtn admin-danger">
                    Delete
                  </button>
                </form>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
