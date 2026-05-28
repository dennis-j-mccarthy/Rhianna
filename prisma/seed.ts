import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const url = process.env.DATABASE_URL;
if (!url) throw new Error("DATABASE_URL is not set");

const db =
  url.startsWith("prisma://") || url.startsWith("prisma+postgres://")
    ? new PrismaClient({ accelerateUrl: url })
    : new PrismaClient({ adapter: new PrismaPg({ connectionString: url }) });

function slugify(input: string): string {
  const base = input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80)
    .replace(/-+$/g, "");
  return base || "untitled";
}

function body(excerpt: string): string {
  return [
    `<p>${excerpt}</p>`,
    "<p>This is placeholder text ported from the original Notebook layout. Open this article in the admin to replace it with the full essay.</p>",
    "<blockquote>The work is mostly listening — and then trusting what you hear.</blockquote>",
    "<p>Until then, the title, excerpt, tags, and publication date are preserved so the Notebook keeps its shape.</p>",
  ].join("");
}

type Seed = {
  title: string;
  excerpt: string;
  tag: string;
  date: string;
  coverImage?: string;
  featured?: boolean;
  readingMin: number;
};

const seeds: Seed[] = [
  {
    title: "The Saturn–Neptune passage and the dissolving of an old self.",
    excerpt:
      "Once every thirty-six years, Saturn and Neptune meet in the sky — and something in us is asked to surrender. Not give up. Surrender. Here is the difference, and the soft scaffolding the cycle offers in return.",
    tag: "Astrology",
    date: "2026-05-14",
    coverImage: "/images/rhianna-beach-halo.jpg",
    featured: true,
    readingMin: 14,
  },
  {
    title: "What our dogs carry for us — and how to gently give it back.",
    excerpt:
      "Animals often hold our unspoken grief and ungrounded anxieties. A practice for noticing what is yours, and what is theirs.",
    tag: "Animal Communication",
    date: "2026-04-01",
    coverImage: "/images/mercy-and-rhianna.jpg",
    readingMin: 7,
  },
  {
    title: "Why the body refuses to budge — until something deeper is heard.",
    excerpt:
      "Stuck patterns are not stubbornness; they are intelligence. A look at how Quanta Freedom Healing speaks the body's native language.",
    tag: "Healing",
    date: "2026-03-01",
    readingMin: 6,
  },
  {
    title: "The forest, the listening, and what twenty-five years of this work has taught me.",
    excerpt:
      "On the quiet apprenticeship of intuitive practice — and the small daily rituals that keep the channel clear.",
    tag: "Reflection",
    date: "2026-02-01",
    coverImage: "/images/rhianna-cape-lookout.jpg",
    readingMin: 8,
  },
  {
    title: "Mercury retrograde, again — and why we miss the gift each time.",
    excerpt:
      "Past the memes and the dread, a small case for the inward turn the planet is actually asking us to take.",
    tag: "Astrology",
    date: "2026-01-01",
    readingMin: 5,
  },
  {
    title: "End-of-life conversations: what an animal almost always wants you to know.",
    excerpt:
      "Across hundreds of sessions, certain themes return. A tender map for the threshold none of us want to cross — but all of us will.",
    tag: "Animal Communication",
    date: "2025-12-01",
    coverImage: "/images/mercy-columbines.jpg",
    readingMin: 9,
  },
  {
    title: "Flower essences and the language of subtle change.",
    excerpt:
      "How a few drops of plant-attuned water can do the slow, structural work that big interventions cannot.",
    tag: "Reflection",
    date: "2025-11-01",
    readingMin: 6,
  },
  {
    title: "Reading a chart is a way of falling in love with the person sitting in front of you.",
    excerpt:
      "The unexpected ethics of astrological practice — and what changes when we treat the chart as sacred biography.",
    tag: "Astrology",
    date: "2025-10-01",
    coverImage: "/images/rhianna-coot-lake.jpg",
    readingMin: 7,
  },
  {
    title: "Inherited patterns: meeting what isn't quite yours, but lives in you anyway.",
    excerpt:
      "A grandmother's grief, a father's vigilance — how the family field shows up in the body, and how QFH gently releases its grip.",
    tag: "Healing",
    date: "2025-09-01",
    readingMin: 6,
  },
  {
    title: "On open water swimming, performance scores, and listening to wild places.",
    excerpt:
      "Why the deeper practice happens outside the office — and what the lakes have been teaching me, in this slowly closing year.",
    tag: "Reflection",
    date: "2025-08-01",
    readingMin: 5,
  },
];

async function main() {
  const existing = await db.article.count();
  if (existing > 0) {
    console.log(`Seed skipped — ${existing} articles already present.`);
    return;
  }
  for (const seed of seeds) {
    const slug = slugify(seed.title);
    const tagSlug = slugify(seed.tag);
    await db.article.upsert({
      where: { slug },
      update: {},
      create: {
        slug,
        title: seed.title,
        excerpt: seed.excerpt,
        contentHtml: body(seed.excerpt),
        coverImage: seed.coverImage ?? null,
        published: true,
        featured: seed.featured ?? false,
        readingMin: seed.readingMin,
        publishedAt: new Date(seed.date),
        tags: {
          connectOrCreate: [
            { where: { slug: tagSlug }, create: { name: seed.tag, slug: tagSlug } },
          ],
        },
      },
    });
  }
  const count = await db.article.count();
  console.log(`Seed complete. ${count} articles in the database.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
