import Image from "next/image";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Divider from "@/components/Divider";
import ZoomMock from "@/components/ZoomMock";
import ContactForm from "@/components/ContactForm";
import { getAllTextBlocks } from "@/lib/text";

export const metadata = {
  title: "Contact & Booking — Rhianna Gray",
  description:
    "Choose a session below, or send a note. Astrology, animal communication, and Quanta Freedom Healing — held remotely worldwide.",
};

const faqs = [
  {
    q: "How do I know which session is right for me?",
    a: "If you are dealing with patterns that keep repeating in your life, Quanta Freedom Healing is often the most direct. If you are at a crossroads, in a major life transition, or want to understand the larger arc, astrology is the deeper map. Animal Communication is for when an animal in your life is asking for something — even if you can't quite name what. If you're unsure, write to me — I'll point you toward the right doorway.",
    open: true,
  },
  {
    q: "Do sessions happen in person or remotely?",
    a: "All sessions are held remotely, over Zoom or by phone. The work is energetic, not geographic — clients join from across the United States and around the world. Many people prefer the quiet of their own space.",
  },
  {
    q: "Does my animal need to be on camera for an animal session?",
    a: "Not at all. Most animals simply rest nearby while we speak. The communication is empathic — connection happens through the energetic field, not through a video feed.",
  },
  {
    q: "What if I cannot afford the full rate?",
    a: "Sliding scale is available on every offering. Please ask. Money should never be the obstacle to receiving the work.",
  },
  {
    q: "How soon will I hear back?",
    a: "Within 2–4 days, almost always. If something is urgent — a transition with an animal, a crisis — please say so in your note.",
  },
  {
    q: "Will I receive a recording?",
    a: "Astrology sessions are recorded and sent to you afterward. QFH and animal sessions are not typically recorded — the work is more present-moment — but notes can be shared on request.",
  },
];

// Map FAQ index to block ID suffixes for questions and answers that have overrides
const faqQIds: Record<number, string> = { 0: 'ct-faq-q1' };
const faqAIds: Record<number, string> = {
  0: 'ct-faq-a1',
  1: 'ct-faq-a2',
  3: 'ct-faq-a4',
  4: 'ct-faq-a5',
};

export default async function ContactPage() {
  const ov = await getAllTextBlocks(); const t = (id: string, fb: string) => ov[id] ?? fb
  return (
    <>
      <SiteHeader active="contact" />

      <section className="contact-hero">
        <div className="wrap-narrow">
          <span className="eyebrow">Contact &amp; Booking</span>
          <h1>
            {t('ct-hero-hl', 'Begin a conversation.')}
          </h1>
          <p className="tagline">
            {t('ct-hero-tl', 'Choose a session below, or send a note — whichever feels easier. I read everything that comes in and reply within a few days.')}
          </p>
        </div>
      </section>

      <Divider />

      <section className="booking" id="booking">
        <div className="wrap">
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span className="eyebrow">Direct Booking — via Calendly</span>
            <h2 style={{ margin: 0 }}>Three sessions, three doorways.</h2>
          </div>
          <div className="booking-grid">
            <article className="booking-card astrology">
              <div className="icon">☉</div>
              <h3>Astrological Reading</h3>
              <p className="sub">A natal &amp; transit reading, with recording.</p>
              <div className="meta">
                <div>~90 minutes</div>
                <div>Zoom or phone</div>
                <div>Recorded · sent after</div>
                <div>Sliding scale available</div>
              </div>
              <div className="price">$250</div>
              <a
                href="https://calendly.com/rhianna-rhiannagray/astrology-reading"
                className="book"
              >
                Book Reading →
              </a>
            </article>

            <article className="booking-card animal">
              <div className="icon">☽</div>
              <h3>Animal Communication</h3>
              <p className="sub">Empathic session with your animal.</p>
              <div className="meta">
                <div>60 min ($200) · 30 min follow-up ($100)</div>
                <div>Remote — Zoom or phone</div>
                <div>Animal need not be on camera</div>
                <div>Sliding scale available</div>
              </div>
              <div className="price">$200 · $100</div>
              <div className="book-actions">
                <a
                  href="https://calendly.com/rhianna-rhiannagray/animal-communication-session-1-hour"
                  className="book"
                >
                  Book One Hour →
                </a>
                <a
                  href="https://calendly.com/rhianna-rhiannagray/animal-communication-session-30-minute-followup"
                  className="book ghost"
                >
                  Book Follow-Up
                </a>
              </div>
            </article>

            <article className="booking-card qfh">
              <div className="icon">✦</div>
              <h3>Quanta Freedom Healing™</h3>
              <p className="sub">A QFH session, intuitively guided.</p>
              <div className="meta">
                <div>60 minutes</div>
                <div>Zoom</div>
                <div>Single or 3-session series</div>
                <div>$600 for three</div>
              </div>
              <div className="price">$250 · $600</div>
              <div className="book-actions">
                <a
                  href="https://calendly.com/rhianna-rhiannagray/quanta-freedom-healing-session"
                  className="book"
                >
                  Book Single Session →
                </a>
                <a
                  href="https://calendly.com/rhianna-rhiannagray/new-meeting"
                  className="book ghost"
                >
                  Book 3-Session Series
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section className="contact-form-section">
        <div className="wrap">
          <div>
            <span className="eyebrow">Or, A Note</span>
            <h2>{t('ct-cf-hl', 'Not sure where to start? Tell me a little.')}</h2>
            <p>
              {t('ct-cf-bd', "If you would rather not book directly, send a message. I'll reply with the doorway that feels most appropriate for what you're carrying.")}
            </p>

            <div className="quick">
              <a href="mailto:Rhianna@rhiannagray.com">
                <span className="label">Email</span>
                <span className="val">Rhianna@rhiannagray.com</span>
              </a>
              <a href="#booking" style={{ borderLeftColor: "var(--clay-deep)" }}>
                <span className="label">Location</span>
                <span className="val">Boulder, Colorado · worldwide via Zoom</span>
              </a>
              <a href="#booking" style={{ borderLeftColor: "var(--violet)" }}>
                <span className="label">Response Time</span>
                <span className="val">Within 2–4 days</span>
              </a>
            </div>
          </div>

          <ContactForm />
        </div>
      </section>

      {/* FAQ */}
      <section className="fits">
        <div className="wrap">
          <div>
            <span className="eyebrow">Before You Book</span>
            <h2>A few questions, gently answered.</h2>
          </div>
          <div className="accordion-list">
            {faqs.map((f, i) => (
              <details key={i} open={f.open}>
                <summary>{faqQIds[i] ? t(faqQIds[i], f.q) : f.q}</summary>
                <p>{faqAIds[i] ? t(faqAIds[i], f.a) : f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* REMOTE BAND */}
      <section className="remote-final">
        <div className="wrap">
          <div>
            <span className="eyebrow">Remote · Worldwide</span>
            <h2>Wherever you are, the field is here.</h2>
            <p>
              Sessions are held via Zoom, the same way you&apos;d join a meeting with a friend.
              You&apos;ll receive a private link before our time. Settle into a quiet room with
              your beverage of choice, your animal nearby if you wish, and arrive as you are.
            </p>
            <p style={{ marginTop: "1.5em" }}>
              <a href="#booking" className="btn clay">
                Choose a Session <span className="arrow">→</span>
              </a>
            </p>
          </div>
          <ZoomMock
            title="Waiting room · Rhianna will admit you"
            hostTile={{
              kind: "image",
              src: "/images/rhianna-headshot.jpg",
              alt: "Rhianna ready for session",
              nameplate: "Rhianna · host",
            }}
            rightTiles={[
              { kind: "placeholder", text: <>[ You ]<br />arriving</> },
              { kind: "placeholder", text: <>[ Your animal ]<br />nearby</> },
            ]}
            controls={
              <>
                <span>
                  <span className="pip" /> Ready to begin
                </span>
                <span>· End-to-end encrypted</span>
                <span>· Private link</span>
              </>
            }
          />
        </div>
      </section>

      {/* CLOSING */}
      <section className="contact-closing">
        <div className="wrap-narrow">
          <div className="portrait">
            <Image
              src="/images/rhianna-headshot.jpg"
              alt="Rhianna Gray"
              fill
              sizes="200px"
            />
          </div>
          <span className="eyebrow">A Closing Note</span>
          <h2>
            &ldquo;{t('ct-cl-hl', 'My work is quiet, precise, and deeply transformative. I look forward to hearing from you.')}&rdquo;
          </h2>
          <p style={{ maxWidth: "50ch", margin: "0 auto" }}>— Rhianna</p>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
