import ArticleForm from "@/components/admin/ArticleForm";
import { createArticle } from "@/app/admin/article-actions";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export default function NewArticlePage() {
  return (
    <section className="admin-page">
      <div className="admin-page-head">
        <h1>New article</h1>
      </div>
      <ArticleForm action={createArticle} submitLabel="Create article" />
    </section>
  );
}
