export type NewsletterArticle = {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  coverImage: string | null;
};

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function absoluteUrl(base: string, path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  const trimmed = base.replace(/\/+$/, "");
  return `${trimmed}${path.startsWith("/") ? "" : "/"}${path}`;
}

export function buildNewsletterHtml(opts: {
  subject: string;
  intro: string;
  baseUrl: string;
  articles: NewsletterArticle[];
}): string {
  const { subject, intro, baseUrl, articles } = opts;
  const base = baseUrl.replace(/\/+$/, "");

  const items = articles
    .map((a) => {
      const url = `${base}/notebook/${a.slug}`;
      const image = a.coverImage
        ? `<tr><td style="padding:0 0 16px;">
             <a href="${escapeHtml(url)}" style="text-decoration:none;">
               <img src="${escapeHtml(absoluteUrl(base, a.coverImage))}" alt="${escapeHtml(a.title)}" width="536" style="display:block;width:100%;max-width:536px;height:auto;border-radius:4px;" />
             </a>
           </td></tr>`
        : "";
      return `
      <tr>
        <td style="padding:0 32px;">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-bottom:1px solid #ece4d3;padding-bottom:28px;margin-bottom:28px;">
            ${image}
            <tr><td>
              <a href="${escapeHtml(url)}" style="text-decoration:none;color:#1f2a2e;">
                <h2 style="margin:0 0 10px;font-family:Georgia,'Times New Roman',serif;font-weight:normal;font-size:24px;line-height:1.2;color:#1f2a2e;">${escapeHtml(a.title)}</h2>
              </a>
              <p style="margin:0 0 14px;font-family:Georgia,serif;font-size:16px;line-height:1.6;color:#3a4a4f;">${escapeHtml(a.excerpt)}</p>
              <a href="${escapeHtml(url)}" style="font-family:Helvetica,Arial,sans-serif;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#b67855;text-decoration:none;">Read essay &rarr;</a>
            </td></tr>
          </table>
        </td>
      </tr>`;
    })
    .join("");

  const introBlock = intro.trim()
    ? `<tr><td style="padding:0 32px 28px;">
         <p style="margin:0;font-family:Georgia,serif;font-size:17px;line-height:1.65;color:#3a4a4f;">${escapeHtml(intro).replace(/\n/g, "<br />")}</p>
       </td></tr>`
    : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${escapeHtml(subject)}</title>
</head>
<body style="margin:0;padding:0;background:#f5efe4;">
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#f5efe4;">
  <tr>
    <td align="center" style="padding:32px 16px;">
      <table role="presentation" cellpadding="0" cellspacing="0" width="600" style="max-width:600px;width:100%;background:#fbf7ee;border-radius:6px;">
        <tr>
          <td align="center" style="padding:40px 32px 24px;border-bottom:1px solid #ece4d3;">
            <p style="margin:0 0 6px;font-family:Helvetica,Arial,sans-serif;font-size:11px;letter-spacing:0.3em;text-transform:uppercase;color:#6b7878;">The Notebook</p>
            <h1 style="margin:0;font-family:Georgia,'Times New Roman',serif;font-weight:normal;font-size:30px;color:#1f2a2e;">${escapeHtml(subject)}</h1>
          </td>
        </tr>
        <tr><td style="height:28px;"></td></tr>
        ${introBlock}
        ${items}
        <tr>
          <td align="center" style="padding:8px 32px 36px;">
            <p style="margin:0;font-family:Helvetica,Arial,sans-serif;font-size:12px;line-height:1.6;color:#6b7878;">
              Rhianna Gray &middot; Boulder, CO<br />
              <a href="${escapeHtml(base)}/notebook" style="color:#6b7878;">Read more on the Notebook</a>
            </p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}
