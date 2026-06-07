import Image from "next/image";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata = {
  title: "Quanta Freedom Healing™ — Rhianna Gray",
  description:
    "A quantum healing modality that gently releases stored trauma, inherited patterns, and subconscious beliefs — held in the nervous system and energy field.",
};

const cyclesQuestions = [
  "Are you stuck in repeating emotional cycles or destructive patterns — despite your awareness, effort, or even therapy?",
  "Do you feel triggered again and again, overwhelmed by the intensity of your reactions and unsure how to move through them?",
  "Do certain challenges — relationships, finances, life circumstances — seem to repeat, leaving you wondering why?",
  "Are you experiencing patterns of lack in love, money, creativity, or meaningful work?",
  "Do you long for peace in your relationships and within yourself?",
];

const spectrumItems = [
  "Patterns of lack or scarcity — money, love, opportunity.",
  "Relationship challenges and recurring dynamics.",
  "Self-worth and self-esteem.",
  "Feeling overwhelmed by life changes, or lack of control.",
  "Gaining clarity around your desires and direction.",
  "Healing underlying energetic contributors to physical conditions.",
  "Releasing inherited family patterns.",
  "Aligning with your higher purpose.",
  "Trauma connected to chronic health challenges.",
  "Moving through any emotional or life difficulty.",
];

const romans = ["i.", "ii.", "iii.", "iv.", "v.", "vi.", "vii.", "viii.", "ix.", "x."];

export default function QFHPage() {
  return (
    <>
      <SiteHeader active="healing" />

      <section className="qfh-hero">
        <div className="qfh-hero-text">
          <span className="eyebrow">03 · Quanta Freedom Healing™</span>
          <h1>
            Transform at
            <br />
            <em>the root —</em>
            <br />
            not the
            <br />
            surface.
          </h1>
          <p className="sub">
            A quantum healing modality that gently releases stored trauma, inherited patterns,
            and subconscious beliefs — held in the nervous system and the energy field.
          </p>
          <a
            href="https://calendly.com/rhianna-rhiannagray/quanta-freedom-healing-session"
            className="btn clay"
          >
            Schedule a Session <span className="arrow">→</span>
          </a>
        </div>
        <div className="qfh-hero-media">
          <Image
            src="/images/rhianna-session.jpg"
            alt="Rhianna in a healing session with a client by the water"
            fill
            priority
            sizes="50vw"
            style={{ objectFit: "cover", objectPosition: "center top" }}
          />
        </div>
      </section>

      <section className="cycles-block">
        <div className="wrap">
          <div>
            <span className="eyebrow">If You Recognize Any of This</span>
            <h2>You are not failing. The work has simply not yet gone deep enough.</h2>
          </div>
          <div className="questions">
            {cyclesQuestions.map((q, i) => (
              <div className="q" key={i}>
                {q}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="whatif">
        <div className="wrap-narrow">
          <span className="eyebrow">A Different Possibility</span>
          <p className="display">
            What if lasting change
            <br />
            was possible — <em>at the root</em>?
          </p>
          <p>
            What if you could go within and transform the deeper layers of your being — emotionally,
            mentally, physically, and spiritually?
          </p>
          <p>
            By gently releasing stored trauma, inherited patterns, and subconscious beliefs,
            profound shifts can occur. As your inner world changes, your outer reality begins to
            reflect that transformation. You may begin to feel calmer, more grounded, and more
            trusting of yourself and of life.
          </p>
          <div className="signal">
            <span className="pill">Emotional</span>
            <span className="pill">Mental</span>
            <span className="pill">Physical</span>
            <span className="pill">Spiritual</span>
          </div>
        </div>
      </section>

      <section className="about-modality">
        <div className="wrap">
          <div>
            <span className="eyebrow">About Quanta Freedom Healing™</span>
            <h2>A modality that meets you at the subconscious and energetic level.</h2>
            <p>
              I am a certified practitioner of Quanta Freedom Healing, working with this powerful
              quantum healing modality to release trauma, limiting beliefs, emotional imprints, and
              inherited family patterns held within the nervous system, subconscious, and energy
              field.
            </p>
            <p>
              During a session, you are guided to connect with your body and safely access where
              these patterns are stored. Through this process, you release dense emotional energy
              and reconnect with your Higher Self. Clients often experience a sense of lightness,
              clarity, and deep inner relief — along with a stronger connection to their own inner
              guidance, peace, and truth.
            </p>
            <div className="credit">
              <strong>The Method</strong>
              Quanta Freedom Healing™ was developed by Melanie Tonia Evans. Sessions are
              approximately one hour, held via Zoom.
            </div>
          </div>
          <div className="media">
            <Image
              src="/images/rhianna-coot-lake.jpg"
              alt="Rhianna by Coot Lake — quiet water reflection"
              fill
              sizes="(max-width: 880px) 92vw, 50vw"
            />
          </div>
        </div>
      </section>

      <section className="spectrum">
        <div className="wrap">
          <div className="spectrum-head">
            <div>
              <span className="eyebrow">What QFH Can Support</span>
              <h2>Ten places this work can reach.</h2>
            </div>
            <p>
              Each session is shaped by what is most ready to be healed in you. The list is not
              exhaustive — it is the territory most often visited.
            </p>
          </div>
          <div className="spectrum-grid">
            {spectrumItems.map((text, i) => (
              <div className="item" key={i}>
                <span className="num">{romans[i]}</span>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="results">
        <div className="wrap">
          <div>
            <span className="eyebrow">Results</span>
            <h2>After a session — what often emerges.</h2>
            <p>
              Many people feel calm, grounded, and deeply connected to their heart and Higher Self.
              A natural sense of trust and openness arises.
            </p>
            <p>
              Because the work occurs at the subconscious and energetic levels, it can create
              meaningful shifts <em>across</em> emotional, mental, physical, and spiritual
              well-being.
            </p>
          </div>
          <div className="level-card">
            <h4>The Four Levels</h4>
            <div className="level">
              <span className="label">Emotional</span>
              <p>A loosening of long-held feeling-states. Less reactivity, more room.</p>
            </div>
            <div className="level">
              <span className="label">Mental</span>
              <p>Clarity. The thought-loops that ran the show begin to quiet.</p>
            </div>
            <div className="level">
              <span className="label">Physical</span>
              <p>
                The body softens. Patterns held as tension or symptom can begin to shift.
              </p>
            </div>
            <div className="level">
              <span className="label">Spiritual</span>
              <p>A return to the deeper knowing — your own Higher Self made audible again.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="approach-band">
        <div className="wrap">
          <div className="portrait">
            <Image
              src="/images/rhianna-cape-lookout.jpg"
              alt="Rhianna in the Oregon forest"
              fill
              sizes="(max-width: 880px) 92vw, 40vw"
            />
          </div>
          <div>
            <span className="eyebrow">My Approach</span>
            <h2>Certified practitioner. Twenty-five years of intuitive listening.</h2>
            <p>
              In addition to being a certified Quanta Freedom Healing™ practitioner, I bring over
              twenty-five years of experience as an intuitive and spiritual counselor, working with
              both humans and animals.
            </p>
            <p>
              Each session is guided not only by the QFH process, but also by intuitive insight —
              allowing us to access and address what is most ready to be healed.
            </p>
          </div>
        </div>
      </section>

      <section className="testimonials">
        <div className="wrap">
          <div style={{ textAlign: "center" }}>
            <span className="eyebrow">From the Field</span>
            <h2>Two clients, in their own words.</h2>
          </div>
          <div className="testimonials-grid">
            <article className="testimonial">
              <blockquote>
                I&apos;ve been working with Rhianna Gray since 2022, and she continues to amaze me
                with her gifts as an intuitive, astrologer, and Quanta Freedom Healing practitioner.
                When we first connected, she helped me navigate some big life questions through my
                astrological chart. Her accuracy and insight were remarkable — she truly saw me.
                When Rhianna began offering Quanta Freedom Healing, I couldn&apos;t wait to
                experience it. Her ability to pinpoint the core issue and guide the healing process
                with such precision made the work incredibly fast and effective. Challenges I had
                been carrying for over twenty years were resolved in a single session.
              </blockquote>
              <cite>— Teresa</cite>
            </article>
            <article className="testimonial">
              <blockquote>
                Rhianna Gray&apos;s Quanta Freedom Healing sessions are a dynamic and powerful way
                to resolve trauma and layered challenges. What was clouding my life felt like it
                lifted in a single session. She clearly identifies the core issue, then guides you
                step-by-step through the healing process to release what&apos;s been held in your
                body and energy field. The result felt like a complete reset — I experienced a
                level of lightness and clarity I hadn&apos;t been able to access before.
              </blockquote>
              <cite>— Bob</cite>
            </article>
          </div>
        </div>
      </section>

      <section className="pricing-section dark">
        <div className="wrap">
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span className="eyebrow">Scheduling &amp; Rates</span>
            <h2>How to begin.</h2>
          </div>
          <div className="pricing-card">
            <div className="row">
              <div>
                <div className="name">Single Session</div>
                <div className="desc">
                  One hour. Held via Zoom. Includes intuitive insight alongside the QFH process.
                </div>
              </div>
              <div className="price">$250</div>
            </div>
            <div className="row">
              <div>
                <div className="name">Three Session Series</div>
                <div className="desc">
                  For deeper work, where layers want to be met across time.
                </div>
              </div>
              <div className="price">$600</div>
            </div>
            <div className="actions">
              <a
                href="https://calendly.com/rhianna-rhiannagray/quanta-freedom-healing-session"
                className="btn"
              >
                Schedule Here <span className="arrow">→</span>
              </a>
              <a href="mailto:Rhianna@rhiannagray.com" className="btn ghost">
                Email Rhianna
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="learn-more">
        <div className="wrap-narrow">
          <span className="eyebrow">To Learn More About the Modality</span>
          <h3 style={{ marginBottom: 16 }}>
            Quanta Freedom Healing™, in the words of its developer.
          </h3>
          <p>
            For more on the modality itself — its origin, philosophy, and lineage — visit Melanie
            Tonia Evans, whose work I am certified in.
          </p>
          <a
            href="https://melanietoniaevans.com/aboutqfh"
            className="btn ghost"
            target="_blank"
            rel="noopener noreferrer"
          >
            melanietoniaevans.com / about QFH <span className="arrow">→</span>
          </a>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
