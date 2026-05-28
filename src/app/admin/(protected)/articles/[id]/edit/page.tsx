import { notFound } from "next/navigation";
import ArticleForm from "@/components/admin/ArticleForm";
import { updateArticle } from "@/app/admin/article-actions";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = await db.article.findUnique({
    where: { id },
    include: { tags: true },
  });

  if (!article) {
    notFound();
  }

  return (
    <section className="admin-page">
      <div className="admin-page-head">
        <h1>Edit article</h1>
      </div>
      <ArticleForm
        action={updateArticle}
        submitLabel="Save changes"
        article={{
          id: article.id,
          title: article.title,
          slug: article.slug,
          excerpt: article.excerpt,
          coverImage: article.coverImage,
          contentHtml: article.contentHtml,
          published: article.published,
          featured: article.featured,
          tags: article.tags.map((t) => ({ name: t.name })),
        }}
      />
    </section>
  );
}
