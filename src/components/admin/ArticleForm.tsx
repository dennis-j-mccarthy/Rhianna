"use client";

import { useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { upload } from "@vercel/blob/client";
import RichTextEditor, { type RichTextEditorHandle } from "@/components/admin/RichTextEditor";
import { generateDraft } from "@/app/admin/ai-actions";
import { slugify } from "@/lib/slug";

export type ArticleFormData = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string | null;
  contentHtml: string;
  published: boolean;
  featured: boolean;
  tags: { name: string }[];
};

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn" disabled={pending}>
      {pending ? "Saving…" : label}
    </button>
  );
}

export default function ArticleForm({
  action,
  article,
  submitLabel,
  focusBody = false,
}: {
  action: (formData: FormData) => void | Promise<void>;
  article?: ArticleFormData | null;
  submitLabel: string;
  focusBody?: boolean;
}) {
  const [title, setTitle] = useState(article?.title ?? "");
  const [slug, setSlug] = useState(article?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(article?.slug));
  const [excerpt, setExcerpt] = useState(article?.excerpt ?? "");
  const [tags, setTags] = useState(article?.tags.map((t) => t.name).join(", ") ?? "");
  const [coverImage, setCoverImage] = useState(article?.coverImage ?? "");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const [notes, setNotes] = useState("");
  const [aiPending, setAiPending] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  const editorRef = useRef<RichTextEditorHandle>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (focusBody) {
      bodyRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [focusBody]);

  async function handleCoverFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setUploadError(null);
    setUploading(true);
    try {
      const blob = await upload(file.name, file, {
        access: "public",
        handleUploadUrl: "/api/blob/upload",
      });
      setCoverImage(blob.url);
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  async function handleDraft() {
    setAiError(null);
    if (!title.trim()) {
      setAiError("Add a working title first.");
      return;
    }
    setAiPending(true);
    try {
      const result = await generateDraft({ title, notes });
      editorRef.current?.setContent(result.contentHtml);
      if (result.excerpt) setExcerpt(result.excerpt);
      if (result.tags.length > 0) setTags(result.tags.join(", "));
    } catch (error) {
      setAiError(error instanceof Error ? error.message : "Drafting failed. Try again.");
    } finally {
      setAiPending(false);
    }
  }

  return (
    <form action={action} className="admin-form article-form">
      {article ? <input type="hidden" name="id" value={article.id} /> : null}

      <div className="field">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          required
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (!slugTouched) setSlug(slugify(e.target.value));
          }}
        />
      </div>

      <div className="field">
        <label htmlFor="slug">Slug</label>
        <input
          id="slug"
          name="slug"
          type="text"
          value={slug}
          placeholder="auto-generated-from-title"
          onChange={(e) => {
            setSlug(e.target.value);
            setSlugTouched(true);
          }}
        />
        <p className="admin-hint">URL: /notebook/{slug || "…"}</p>
      </div>

      {/* AI DRAFT PANEL */}
      <div className="ai-panel">
        <div className="ai-panel-head">
          <span className="ai-badge">AI</span>
          <strong>Draft with AI</strong>
        </div>
        <p className="admin-hint">
          Enter the title above plus a few notes, and Claude will draft the body, excerpt, and tags
          in Rhianna&apos;s voice. Set the voice sample in{" "}
          <Link href="/admin/settings">Settings</Link>.
        </p>
        <textarea
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="A few notes on what to cover (optional)…"
        />
        {aiError ? <p className="admin-error">{aiError}</p> : null}
        <button type="button" className="btn ghost" onClick={handleDraft} disabled={aiPending}>
          {aiPending ? "Drafting…" : "Draft with AI"}
        </button>
      </div>

      <div className="field">
        <label htmlFor="excerpt">Excerpt</label>
        <textarea
          id="excerpt"
          name="excerpt"
          rows={3}
          required
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
        />
      </div>

      <div className="field">
        <label htmlFor="coverImage">Cover image</label>
        <div className="cover-upload">
          {coverImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={coverImage} alt="Cover preview" className="cover-preview" />
          ) : (
            <div className="cover-preview empty">No image</div>
          )}
          <div className="cover-upload-controls">
            <label className={uploading ? "btn ghost is-disabled" : "btn ghost"}>
              {uploading ? "Uploading…" : "Upload image"}
              <input
                type="file"
                accept="image/*"
                onChange={handleCoverFile}
                disabled={uploading}
                style={{ display: "none" }}
              />
            </label>
            {coverImage ? (
              <button
                type="button"
                className="admin-linkbtn admin-danger"
                onClick={() => setCoverImage("")}
              >
                Remove
              </button>
            ) : null}
          </div>
        </div>
        <input
          id="coverImage"
          name="coverImage"
          type="text"
          value={coverImage}
          onChange={(e) => setCoverImage(e.target.value)}
          placeholder="…or paste an image URL"
        />
        {uploadError ? <p className="admin-error">{uploadError}</p> : null}
      </div>

      <div className="field">
        <label htmlFor="tags">Tags</label>
        <input
          id="tags"
          name="tags"
          type="text"
          placeholder="astrology, healing, reflection"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <p className="admin-hint">Comma-separated. New tags are created automatically.</p>
      </div>

      <div className="field" ref={bodyRef}>
        <label>Body</label>
        <RichTextEditor ref={editorRef} name="contentHtml" defaultValue={article?.contentHtml ?? ""} />
      </div>

      <div className="field-row">
        <label className="checkbox">
          <input type="checkbox" name="published" defaultChecked={article?.published ?? false} />
          Published
        </label>
        <label className="checkbox">
          <input type="checkbox" name="featured" defaultChecked={article?.featured ?? false} />
          Featured on Notebook
        </label>
      </div>

      <div className="admin-form-actions">
        <SubmitButton label={submitLabel} />
        <Link href="/admin" className="btn ghost">
          Cancel
        </Link>
      </div>
    </form>
  );
}
