import Image from "next/image";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Divider from "@/components/Divider";
import FilterRow from "@/components/FilterRow";
import NewsletterForm from "@/components/NewsletterForm";
import { getFeaturedArticle, getPublishedArticles, getPublishedTags } from "@/lib/articles";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Notebook — Notes from the Listening · Rhianna Gray",
  description:
    "Slow writing on astrology cycles, animal wisdom, and the inner mechanics of healing. Published when there is something worth saying.",
};

const TONES = ["violet", "clay", "sage", "mint"] as const;

// Default cover images for specific essays that don't have an uploaded cover.
// An uploaded coverImage always takes precedence over these.
const SLUG_COVERS: Record<string, string> = {
  "inherited-patterns-meeting-what-isn-t-quite-yours-but-lives-in-you-anyway":
    "/images/notebook-inherited-patterns.jpg",
  "the-forest-the-listening-and-what-twenty-five-years-of-this-work-has-taught-me":
    "/images/notebook-forest.jpg",
  "mercury-retrograde-again-and-why-we-miss-the-gift-each-time":
    "/images/notebook-mercury.jpg",
  "on-open-water-swimming-performance-scores-and-listening-to-wild-places":
    "/images/notebook-lake.jpg",
  "flower-essences-and-the-language-of-subtle-change":
    "/images/notebook-flower-essences.jpg",
  "why-the-body-refuses-to-budge-until-something-deeper-is-heard":
    "/images/notebook-body-path.jpg",
};

function coverFor(article: { coverImage?: string | null; slug: string }): string | null {
  return article.coverImage ?? SLUG_COVERS[article.slug] ?? null;
}

function monthYear(date: Date) {
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

function fullDate(date: Date) {
  return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export default async function NotebookPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  const { tag } = await searchParams;

  const [tags, featured, articles] = await Promise.all([
    getPublishedTags(),
    tag ? Promise.resolve(null) : getFeaturedArticle(),
    getPublishedArticles({ tag }),
  ]);

  const gridArticles = articles.filter((a) => a.id !== featured?.id);

  return (
    <>
      <SiteHeader active="notebook" />

      <section className="notebook-hero">
        <div className="wrap-narrow">
          <span className="eyebrow">The Journal</span>
          <h1>
            <em>Notebook</em>
          </h1>
          <p className="tagline">
            Notes from the listening. Slow writing on astrology cycles, animal wisdom, and the
            inner mechanics of healing.
          </p>
          <div className="meta">
            <span>Published when there&apos;s something worth saying</span>
            <span>Est. 2018</span>
            <span>Free · Always</span>
          </div>
        </div>
        <div className="notebook-hero-media">
          <Image
            src="/images/notebook-hero.jpg"
            alt="Rhianna writing by lamplight in a cozy reading room, a cup of tea beside her"
            fill
            priority
            sizes="(max-width: 1100px) 92vw, 1000px"
          />
        </div>
      </section>

      <Divider />

      <div className="wrap">
        <FilterRow tags={tags} activeTag={tag ?? null} />
      </div>

      {/* FEATURED */}
      {featured ? (
        <section className="featured">
          <div className="wrap">
            <div className="media">
              {coverFor(featured) ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={coverFor(featured)!} alt={featured.title} />
              ) : (
                <div className="tinted-fill violet">
                  <span className="icon">✦</span>
                </div>
              )}
            </div>
            <div>
              <div className="meta">
                <span className="topic">
                  — Featured Essay{featured.tags[0] ? ` · ${featured.tags[0].name}` : ""}
                </span>
                <span>{monthYear(featured.publishedAt ?? featured.createdAt)}</span>
                <span>{featured.readingMin} min read</span>
              </div>
              <h2>{featured.title}</h2>
              <p className="excerpt">{featured.excerpt}</p>
              <Link href={`/notebook/${featured.slug}`} className="btn">
                Read the essay <span className="arrow">→</span>
              </Link>
              <div className="author">
                <div className="avatar">
                  <Image src="/images/rhianna-headshot.jpg" alt="Rhianna" fill sizes="40px" />
                </div>
                <div>
                  <strong>Rhianna Gray</strong>Written from Boulder, CO &nbsp;·&nbsp;{" "}
                  {fullDate(featured.publishedAt ?? featured.createdAt)}
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* ESSAY GRID */}
      <section className="essay-grid-section">
        <div className="wrap">
          <div className="head">
            <div>
              <span className="eyebrow">{tag ? "Filtered" : "Recent"}</span>
              <h2>{tag ? `Tagged “${tag}”.` : "From the archive."}</h2>
            </div>
            <span className="kicker" style={{ fontSize: 16 }}>
              {gridArticles.length} {gridArticles.length === 1 ? "essay" : "essays"}
              {tag ? "" : " published"}.
            </span>
          </div>

          {gridArticles.length === 0 ? (
            <p className="admin-muted">Nothing here yet.</p>
          ) : (
            <div className="essay-grid">
              {gridArticles.map((article, i) => (
                <article className="essay" key={article.id}>
                  {coverFor(article) ? (
                    <div className="media">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={coverFor(article)!} alt={article.title} />
                    </div>
                  ) : (
                    <div className={`media tinted ${TONES[i % TONES.length]}`}>
                      <span className="icon">
                        {article.tags[0]?.name.charAt(0).toUpperCase() ?? "✦"}
                      </span>
                    </div>
                  )}
                  <div className="meta">
                    {article.tags[0] ? (
                      <span className="topic-tag">{article.tags[0].name}</span>
                    ) : (
                      <span className="topic-tag">Essay</span>
                    )}
                    <span>{monthYear(article.publishedAt ?? article.createdAt)}</span>
                  </div>
                  <h3>{article.title}</h3>
                  <p>{article.excerpt}</p>
                  <Link href={`/notebook/${article.slug}`} className="read">
                    Read essay
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="newsletter">
        <div className="wrap-narrow">
          <span className="eyebrow">Subscribe</span>
          <h2>A letter from Rhianna, when there is something to say.</h2>
          <p>
            A few times a year — never more — I send a quiet letter on the current astrology, what
            I&apos;m learning in the work, and any new offerings. No tracking, no clever marketing,
            just a note to those who want one.
          </p>
          <NewsletterForm />
          <p className="note">unsubscribe any time · no third parties</p>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
