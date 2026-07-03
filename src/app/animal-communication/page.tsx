import Image from "next/image";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { getAllTextBlocks } from "@/lib/text";

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

export default async function AnimalPage() {
  const ov = await getAllTextBlocks(); const t = (id: string, fb: string) => ov[id] ?? fb
  return (
    <>
      <SiteHeader active="animal" />

      <section className="page-hero-animal">
        <div className="wrap">
          <div>
            <span className="eyebrow">02 · Intuitive Animal Communication</span>
            <h1>
              {t('ac-hero-hl', 'A deeper way to understand your animal.')}
            </h1>
            <p className="sub">
              {t('ac-hero-sb', "Animals are deeply aware, sensitive beings who communicate in ways that go beyond words. Sometimes you sense they are trying to express something — but you can't quite hear it yet.")}
            </p>
            <Link href="/contact" className="btn">
              Book a Session <span className="arrow">→</span>
            </Link>
          </div>
          <div className="hero-media">
            <Image
              src="/images/animal-hero-dog.jpg"
              alt="A white golden retriever resting on a rug, gazing softly at the camera"
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
            <h2>{t('ac-wn-hl', 'Three quiet questions most people arrive with.')}</h2>
          </div>
          <div className="questions">
            <div>{t('ac-wn-q1', 'Why is this behavior happening — and is it asking something of me?')}</div>
            <div>{t('ac-wn-q2', "Is my animal trying to tell me something I haven't yet heard?")}</div>
            <div>{t('ac-wn-q3', 'How can I better support them, especially now?')}</div>
          </div>
        </div>
      </section>

      <section className="listening">
        <div className="wrap">
          <div>
            <span className="eyebrow">Listening Beyond Words</span>
            <h2>{t('ac-lb-hl', 'The communication itself.')}</h2>
            <p>
              {t('ac-lb-b1', 'Through intuitive connection, I communicate with your animal at an empathic level — receiving physical sensations, impressions, emotions, images, and insights that reflect their experience.')}
            </p>
            <p>
              {t('ac-lb-b2', 'These sessions offer a space where your animal, and you, can be heard, understood, and supported. As clarity unfolds, a sense of peace can follow. Often, what they share brings not only clarity — but a deeper sense of connection between you.')}
            </p>
            <p className="pillquote" style={{ marginTop: "2em", color: "var(--sage-deep)" }}>
              &ldquo;{t('ac-lb-qt', 'You and your animal share a deep bond, where supporting one another creates harmony for both.')}&rdquo;
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
            <h2>{t('ac-sj-hl', 'What they carry — and what we carry back.')}</h2>
            <p>
              {t('ac-sj-b1', 'Animals are often deeply connected to our own emotional and spiritual lives. At times, what they express may reflect not only their experience — but also aspects of the environment, or the people they are bonded with.')}
            </p>
            <p>
              {t('ac-sj-b2', 'As with our deepest relationships, they can transform us, and lead us more fully into our own hearts. These sessions can open a deeper awareness of that connection, bringing healing, insight, and harmony to both you and your animal.')}
            </p>
          </div>
        </div>
      </section>

      <section className="essences">
        <div className="wrap">
          <div>
            <span className="eyebrow">Additional Support</span>
            <h2>{t('ac-fe-hl', 'Custom flower essence formulas.')}</h2>
            <p>
              {t('ac-fe-b1', 'When appropriate, I create customized flower essence formulas to support your animal in gently shifting habitual patterns and emotional imprints — helping them move toward greater calm, trust, and ease.')}
            </p>
            <p>
              {t('ac-fe-b2', 'The essences are formulated specifically for what your animal has shared during our session, and follow them home as a quiet continuation of the work.')}
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
            <h2>{t('ac-ap-hl', 'Twenty-five years of listening — over Zoom, or by phone.')}</h2>
            <p>
              {t('ac-ap-b1', 'In 2000, I worked as an assistant at a holistic veterinary practice and discovered my ability to communicate with animals. Soon, clients were scheduling sessions with me — in the office and beyond.')}
            </p>
            <p>
              {t('ac-ap-b2', "I approach each communication with openness and care, allowing your animal's voice to come forward in a way that feels clear and supportive. The work itself is energetic, so your animal does not need to be on camera. Most simply rest nearby while we speak.")}
            </p>
          </div>
          <div
            style={{
              position: "relative",
              aspectRatio: "3 / 2",
              borderRadius: 18,
              overflow: "hidden",
              boxShadow: "0 24px 60px rgba(0,0,0,.35)",
            }}
          >
            <Image
              src="/images/session-animal.jpg"
              alt="Barnaby, a scruffy terrier, resting on a braided rug during a remote session"
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 880px) 92vw, 55vw"
            />
          </div>
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
            &ldquo;{t('ac-cl-qt', 'When your animal is heard, something softens — and a deeper connection naturally unfolds.')}&rdquo;
          </p>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
