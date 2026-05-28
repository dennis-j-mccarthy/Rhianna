"use client";

import { useMemo, useState } from "react";
import { buildNewsletterHtml, type NewsletterArticle } from "@/lib/newsletter";

type PickerArticle = NewsletterArticle & { dateLabel: string; hasImage: boolean };

export default function NewsletterBuilder({
  articles,
  defaultBaseUrl,
}: {
  articles: PickerArticle[];
  defaultBaseUrl: string;
}) {
  const [subject, setSubject] = useState("Notes from the Listening");
  const [intro, setIntro] = useState("");
  const [baseUrl, setBaseUrl] = useState(defaultBaseUrl || "https://example.com");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const byId = useMemo(() => new Map(articles.map((a) => [a.id, a])), [articles]);
  const selected = useMemo(
    () => selectedIds.flatMap((id) => (byId.get(id) ? [byId.get(id) as PickerArticle] : [])),
    [selectedIds, byId],
  );
  const available = articles.filter((a) => !selectedIds.includes(a.id));

  const html = useMemo(
    () => buildNewsletterHtml({ subject, intro, baseUrl, articles: selected }),
    [subject, intro, baseUrl, selected],
  );

  function add(id: string) {
    setSelectedIds((prev) => [...prev, id]);
  }
  function remove(id: string) {
    setSelectedIds((prev) => prev.filter((x) => x !== id));
  }
  function move(index: number, dir: -1 | 1) {
    setSelectedIds((prev) => {
      const next = [...prev];
      const target = index + dir;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }
  async function copyHtml() {
    await navigator.clipboard.writeText(html);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="nl">
      <div className="nl-build">
        <div className="field">
          <label htmlFor="nl-subject">Newsletter title</label>
          <input
            id="nl-subject"
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="nl-intro">Intro note (optional)</label>
          <textarea
            id="nl-intro"
            rows={3}
            value={intro}
            onChange={(e) => setIntro(e.target.value)}
            placeholder="A short personal note to open the letter…"
          />
        </div>

        <div className="field">
          <label htmlFor="nl-base">Site URL (for links &amp; images)</label>
          <input
            id="nl-base"
            type="text"
            value={baseUrl}
            onChange={(e) => setBaseUrl(e.target.value)}
            placeholder="https://your-domain.com"
          />
          <p className="admin-hint">
            Used to build absolute links and image URLs in the email. Defaults to this site.
          </p>
        </div>

        <div className="nl-cols">
          <div>
            <h3 className="nl-h">In this issue ({selected.length})</h3>
            {selected.length === 0 ? (
              <p className="admin-muted">Add articles from the right to assemble the letter.</p>
            ) : (
              <ol className="nl-selected">
                {selected.map((a, i) => (
                  <li key={a.id}>
                    <div className="nl-item-main">
                      <span className="nl-item-title">{a.title}</span>
                      {!a.hasImage ? <span className="nl-noimg">no image</span> : null}
                    </div>
                    <div className="nl-item-actions">
                      <button type="button" onClick={() => move(i, -1)} disabled={i === 0} title="Move up">
                        ↑
                      </button>
                      <button
                        type="button"
                        onClick={() => move(i, 1)}
                        disabled={i === selected.length - 1}
                        title="Move down"
                      >
                        ↓
                      </button>
                      <button type="button" onClick={() => remove(a.id)} title="Remove" className="admin-danger">
                        ✕
                      </button>
                    </div>
                  </li>
                ))}
              </ol>
            )}
          </div>

          <div>
            <h3 className="nl-h">Published articles</h3>
            {available.length === 0 ? (
              <p className="admin-muted">All published articles are in the issue.</p>
            ) : (
              <ul className="nl-available">
                {available.map((a) => (
                  <li key={a.id}>
                    <div className="nl-item-main">
                      <span className="nl-item-title">{a.title}</span>
                      <span className="nl-item-meta">
                        {a.dateLabel}
                        {!a.hasImage ? " · no image" : ""}
                      </span>
                    </div>
                    <button type="button" className="nl-add" onClick={() => add(a.id)}>
                      + Add
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="nl-actions">
          <button type="button" className="btn" onClick={copyHtml} disabled={selected.length === 0}>
            {copied ? "Copied!" : "Copy HTML"}
          </button>
        </div>
      </div>

      <div className="nl-preview">
        <h3 className="nl-h">Preview</h3>
        <iframe title="Newsletter preview" className="nl-frame" srcDoc={html} />
      </div>
    </div>
  );
}
