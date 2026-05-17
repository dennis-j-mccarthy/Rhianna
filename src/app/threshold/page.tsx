import Image from "next/image";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Divider from "@/components/Divider";
import FilterRow from "@/components/FilterRow";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata = {
  title: "Threshold — Notes from the Listening · Rhianna Gray",
  description:
    "Slow writing on astrology cycles, animal wisdom, and the inner mechanics of healing. Published when there is something worth saying.",
};

type Essay = {
  topic: "astrology" | "healing" | "animal" | "reflection";
  topicLabel: string;
  date: string;
  title: string;
  excerpt: string;
  media:
    | { kind: "image"; src: string; alt: string }
    | { kind: "tinted"; tone: "violet" | "clay" | "sage" | "mint"; icon: string };
};

const essays: Essay[] = [
  {
    topic: "animal",
    topicLabel: "Animal Communication",
    date: "April 2026",
    title: "What our dogs carry for us — and how to gently give it back.",
    excerpt:
      "Animals often hold our unspoken grief and ungrounded anxieties. A practice for noticing what is yours, and what is theirs.",
    media: { kind: "image", src: "/images/mercy-and-rhianna.jpg", alt: "Rhianna and Mercy" },
  },
  {
    topic: "healing",
    topicLabel: "Healing",
    date: "March 2026",
    title: "Why the body refuses to budge — until something deeper is heard.",
    excerpt:
      "Stuck patterns are not stubbornness; they are intelligence. A look at how Quanta Freedom Healing speaks the body's native language.",
    media: { kind: "tinted", tone: "clay", icon: "QFH" },
  },
  {
    topic: "reflection",
    topicLabel: "Reflection",
    date: "February 2026",
    title: "The forest, the listening, and what twenty-five years of this work has taught me.",
    excerpt:
      "On the quiet apprenticeship of intuitive practice — and the small daily rituals that keep the channel clear.",
    media: { kind: "image", src: "/images/rhianna-cape-lookout.jpg", alt: "Rhianna in the forest" },
  },
  {
    topic: "astrology",
    topicLabel: "Astrology",
    date: "January 2026",
    title: "Mercury retrograde, again — and why we miss the gift each time.",
    excerpt:
      "Past the memes and the dread, a small case for the inward turn the planet is actually asking us to take.",
    media: { kind: "tinted", tone: "violet", icon: "☿" },
  },
  {
    topic: "animal",
    topicLabel: "Animal Communication",
    date: "December 2025",
    title: "End-of-life conversations: what an animal almost always wants you to know.",
    excerpt:
      "Across hundreds of sessions, certain themes return. A tender map for the threshold none of us want to cross — but all of us will.",
    media: { kind: "image", src: "/images/mercy-columbines.jpg", alt: "Mercy with columbines" },
  },
  {
    topic: "reflection",
    topicLabel: "Reflection",
    date: "November 2025",
    title: "Flower essences and the language of subtle change.",
    excerpt:
      "How a few drops of plant-attuned water can do the slow, structural work that big interventions cannot.",
    media: { kind: "tinted", tone: "sage", icon: "✿" },
  },
  {
    topic: "astrology",
    topicLabel: "Astrology",
    date: "October 2025",
    title:
      "Reading a chart is a way of falling in love with the person sitting in front of you.",
    excerpt:
      "The unexpected ethics of astrological practice — and what changes when we treat the chart as sacred biography.",
    media: { kind: "image", src: "/images/rhianna-coot-lake.jpg", alt: "Rhianna at Coot Lake" },
  },
  {
    topic: "healing",
    topicLabel: "Healing",
    date: "September 2025",
    title: "Inherited patterns: meeting what isn't quite yours, but lives in you anyway.",
    excerpt:
      "A grandmother's grief, a father's vigilance — how the family field shows up in the body, and how QFH gently releases its grip.",
    media: { kind: "tinted", tone: "clay", icon: "○" },
  },
  {
    topic: "reflection",
    topicLabel: "Reflection",
    date: "August 2025",
    title: "On open water swimming, performance scores, and listening to wild places.",
    excerpt:
      "Why the deeper practice happens outside the office — and what the lakes have been teaching me, in this slowly closing year.",
    media: { kind: "tinted", tone: "mint", icon: "~" },
  },
];

export default function ThresholdPage() {
  return (
    <>
      <SiteHeader active="threshold" />

      <section className="thresh-hero">
        <div className="wrap-narrow">
          <span className="eyebrow">The Journal</span>
          <h1>
            <em>Threshold</em>
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
      </section>

      <Divider />

      <div className="wrap">
        <FilterRow />
      </div>

      {/* FEATURED */}
      <section className="featured">
        <div className="wrap">
          <div className="media">
            <Image
              src="/images/rhianna-beach-halo.jpg"
              alt="Rhianna walking through ocean surf at sunset"
              fill
              sizes="(max-width: 880px) 92vw, 50vw"
            />
          </div>
          <div>
            <div className="meta">
              <span className="topic">— Featured Essay · Astrology</span>
              <span>May 2026</span>
              <span>14 min read</span>
            </div>
            <h2>The Saturn–Neptune passage and the dissolving of an old self.</h2>
            <p className="excerpt">
              Once every thirty-six years, Saturn and Neptune meet in the sky — and something in us
              is asked to surrender. Not give up. Surrender. Here is the difference, and the soft
              scaffolding the cycle offers in return.
            </p>
            <Link href="/threshold" className="btn">
              Read the essay <span className="arrow">→</span>
            </Link>
            <div className="author">
              <div className="avatar">
                <Image
                  src="/images/rhianna-headshot.jpg"
                  alt="Rhianna"
                  fill
                  sizes="40px"
                />
              </div>
              <div>
                <strong>Rhianna Gray</strong>Written from Boulder, CO &nbsp;·&nbsp; May 14, 2026
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ESSAY GRID */}
      <section className="essay-grid-section">
        <div className="wrap">
          <div className="head">
            <div>
              <span className="eyebrow">Recent</span>
              <h2>From the archive.</h2>
            </div>
            <span className="kicker" style={{ fontSize: 16 }}>
              Twelve essays published since 2024.
            </span>
          </div>

          <div className="essay-grid">
            {essays.map((e, i) => (
              <article className="essay" key={i}>
                {e.media.kind === "image" ? (
                  <div className="media">
                    <Image
                      src={e.media.src}
                      alt={e.media.alt}
                      fill
                      sizes="(max-width: 880px) 92vw, (max-width: 1080px) 45vw, 30vw"
                    />
                  </div>
                ) : (
                  <div className={`media tinted ${e.media.tone}`}>
                    <span className="icon">{e.media.icon}</span>
                  </div>
                )}
                <div className="meta">
                  <span className={`topic-tag ${e.topic}`}>{e.topicLabel}</span>
                  <span>{e.date}</span>
                </div>
                <h3>{e.title}</h3>
                <p>{e.excerpt}</p>
                <Link href="/threshold" className="read">
                  Read essay
                </Link>
              </article>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 72 }}>
            <Link href="/threshold" className="btn ghost">
              Load more essays
            </Link>
          </div>
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
