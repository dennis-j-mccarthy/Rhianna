import Image from "next/image";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ZoomMock from "@/components/ZoomMock";

export const metadata = {
  title: "Intuitive Animal Communication — Rhianna Gray",
  description:
    "Empathic communication with your animal — receiving sensations, emotions, and insights that reflect their experience. Sessions remote, worldwide.",
};

const supportItems = [
  "Behavioral or emotional challenges that have resisted the usual approaches.",
  "Anxiety, fear, or marked changes in mood.",
  "Adjusting to new environments, people, or other animals.",
  "Understanding your animal's needs and preferences.",
  "Deepening your bond and the way you communicate.",
  "Preparing for, or processing, transitions.",
  "End-of-life communication and support.",
  "Hearing what they have always been trying to say.",
];

const romans = ["i.", "ii.", "iii.", "iv.", "v.", "vi.", "vii.", "viii."];

export default function AnimalPage() {
  return (
    <>
      <SiteHeader active="animal" />

      <section className="page-hero-animal">
        <div className="wrap">
          <div>
            <span className="eyebrow">02 · Intuitive Animal Communication</span>
            <h1>
              A deeper way to <em>understand</em> your animal.
            </h1>
            <p className="sub">
              Animals are deeply aware, sensitive beings who communicate in ways that go beyond
              words. Sometimes you sense they are trying to express something — but you can&apos;t
              quite hear it yet.
            </p>
            <Link href="/contact" className="btn">
              Book a Session <span className="arrow">→</span>
            </Link>
          </div>
          <div className="hero-media">
            <Image
              src="/images/mercy-columbines.jpg"
              alt="Mercy, a dog, in a meadow of purple columbines"
              fill
              priority
              sizes="(max-width: 880px) 92vw, 50vw"
            />
          </div>
        </div>
      </section>

      <section className="wondering">
        <div className="wrap">
          <div>
            <span className="eyebrow">You may be wondering</span>
            <h2>Three quiet questions most people arrive with.</h2>
          </div>
          <div className="questions">
            <div>Why is this behavior happening — and is it asking something of me?</div>
            <div>Is my animal trying to tell me something I haven&apos;t yet heard?</div>
            <div>How can I better support them, especially now?</div>
          </div>
        </div>
      </section>

      <section className="listening">
        <div className="wrap">
          <div>
            <span className="eyebrow">Listening Beyond Words</span>
            <h2>The communication itself.</h2>
            <p>
              Through intuitive connection, I communicate with your animal at an empathic level —
              receiving physical sensations, impressions, emotions, images, and insights that
              reflect their experience.
            </p>
            <p>
              These sessions offer a space where your animal, and you, can be heard, understood,
              and supported. As clarity unfolds, a sense of peace can follow. Often, what they
              share brings not only clarity — but a deeper sense of connection between you.
            </p>
            <p className="pillquote" style={{ marginTop: "2em", color: "var(--sage-deep)" }}>
              &ldquo;You and your animal share a deep bond, where supporting one another creates
              harmony for both.&rdquo;
            </p>
          </div>
          <div className="media">
            <Image
              src="/images/mercy-and-rhianna.jpg"
              alt="Rhianna with her dog Mercy"
              fill
              sizes="(max-width: 880px) 92vw, 40vw"
            />
          </div>
        </div>
      </section>

      <section className="support-section">
        <div className="wrap">
          <div className="support-head">
            <div>
              <span className="eyebrow">What This Work Can Support</span>
              <h2 style={{ margin: 0 }}>
                Eight pathways
                <br />
                the work can open.
              </h2>
            </div>
            <p>
              Not a checklist. Each session is shaped by what your animal is most ready to express
              — and what you are most ready to receive.
            </p>
          </div>
          <div className="support-grid">
            {supportItems.map((text, i) => (
              <div key={i} className="support-item">
                <span className="num">{romans[i]}</span>
                <h4>{text}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="shared">
        <div className="wrap">
          <div className="media">
            <Image
              src="/images/mercy-columbines.jpg"
              alt="Mercy among wildflowers"
              fill
              sizes="(max-width: 880px) 92vw, 40vw"
            />
          </div>
          <div>
            <span className="eyebrow">A Shared Journey</span>
            <h2>What they carry — and what we carry back.</h2>
            <p>
              Animals are often deeply connected to our own emotional and spiritual lives. At
              times, what they express may reflect not only their experience — but also aspects of
              the environment, or the people they are bonded with.
            </p>
            <p>
              As with our deepest relationships, they can transform us, and lead us more fully into
              our own hearts. These sessions can open a deeper awareness of that connection,
              bringing healing, insight, and harmony to both you and your animal.
            </p>
          </div>
        </div>
      </section>

      <section className="essences">
        <div className="wrap">
          <div>
            <span className="eyebrow">Additional Support</span>
            <h2>Custom flower essence formulas.</h2>
            <p>
              When appropriate, I create customized flower essence formulas to support your animal
              in gently shifting habitual patterns and emotional imprints — helping them move
              toward greater calm, trust, and ease.
            </p>
            <p>
              The essences are formulated specifically for what your animal has shared during our
              session, and follow them home as a quiet continuation of the work.
            </p>
          </div>
          <div>
            <div className="composition">
              <div className="ring" />
              <div className="ring r2" />
              <div className="ring r3" />
              <div className="center">
                <div className="label">A Formula For</div>
                <div className="text">
                  Calm.
                  <br />
                  Trust.
                  <br />
                  Ease.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="remote-section">
        <div className="wrap">
          <div>
            <span className="eyebrow">My Approach &amp; The Remote Field</span>
            <h2>Twenty-five years of listening — over Zoom, or by phone.</h2>
            <p>
              In 2000, I worked as an assistant at a holistic veterinary practice and discovered my
              ability to communicate with animals. Soon, clients were scheduling sessions with me
              — in the office and beyond.
            </p>
            <p>
              I approach each communication with openness and care, allowing your animal&apos;s
              voice to come forward in a way that feels clear and supportive. The work itself is
              energetic, so your animal does not need to be on camera. Most simply rest nearby
              while we speak.
            </p>
          </div>
          <ZoomMock
            title="Animal Session · Rhianna & Mercy"
            hostTile={{
              kind: "image",
              src: "/images/mercy-and-rhianna.jpg",
              alt: "Rhianna with Mercy",
              nameplate: "Rhianna · listening",
            }}
            rightTiles={[
              { kind: "placeholder", text: <>[ Client tile ]<br />on screen</> },
              { kind: "placeholder", text: <>[ Animal at home ]<br />resting nearby</> },
            ]}
            controls={
              <>
                <span>
                  <span className="pip" /> Recording
                </span>
                <span>· Mic on</span>
                <span>· 47:12</span>
              </>
            }
          />
        </div>
      </section>

      <section className="pricing-section">
        <div className="wrap">
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span className="eyebrow">Scheduling &amp; Rate</span>
            <h2>How to begin.</h2>
          </div>
          <div className="pricing-card">
            <div className="row">
              <div>
                <div className="name">Hourly Session</div>
                <div className="desc">
                  For new clients and animals. One hour, via Zoom or phone.
                </div>
              </div>
              <div className="price">$200</div>
            </div>
            <div className="row">
              <div>
                <div className="name">Follow-Up Session</div>
                <div className="desc">For returning clients. Thirty minutes.</div>
              </div>
              <div className="price">$100</div>
            </div>
            <div className="row">
              <div>
                <div className="name">Sliding Scale</div>
                <div className="desc">
                  Available — please ask. I never want money to be the obstacle.
                </div>
              </div>
              <div className="price" style={{ fontSize: 22, color: "var(--muted)" }}>
                By request
              </div>
            </div>
            <div className="actions">
              <a
                href="https://calendly.com/rhianna-rhiannagray/animal-communication-session-1-hour"
                className="btn"
              >
                Book One Hour <span className="arrow">→</span>
              </a>
              <a
                href="https://calendly.com/rhianna-rhiannagray/animal-communication-session-30-minute-followup"
                className="btn ghost"
              >
                Book Follow-Up
              </a>
            </div>
            <p style={{ fontSize: 13, color: "var(--muted)", marginTop: 24, textAlign: "center" }}>
              Questions?{" "}
              <a href="mailto:Rhianna@rhiannagray.com">Rhianna@rhiannagray.com</a>
            </p>
          </div>
        </div>
      </section>

      <section className="closing-band">
        <div className="wrap-narrow">
          <p className="pillquote" style={{ margin: "0 auto", maxWidth: "30ch", textAlign: "center" }}>
            &ldquo;When your animal is heard, something softens — and a deeper connection naturally
            unfolds.&rdquo;
          </p>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
