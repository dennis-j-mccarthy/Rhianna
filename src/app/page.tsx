import Image from "next/image";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Divider from "@/components/Divider";
import ZoomMock from "@/components/ZoomMock";

export default function Home() {
  return (
    <>
      <SiteHeader active="home" />

      {/* ========== HERO ========== */}
      <section className="home-hero">
        <div className="wrap">
          <div className="hero-grid">
            <div className="hero-text">
              <span className="eyebrow">Est. 1999 · Boulder, Colorado · Worldwide</span>
              <h1 className="display">
                A quiet <em>return</em>
                <br />
                to the deeper
                <br />
                intelligence
                <br />
                within.
              </h1>
              <p className="sub">
                Twenty-five years of intuitive guidance, evolutionary astrology, and deep energetic
                healing — for the humans and animals navigating life&apos;s most layered passages.
              </p>
              <div className="badges">
                <Link href="/contact" className="btn">
                  Book a Session <span className="arrow">→</span>
                </Link>
                <Link href="/quanta-freedom-healing" className="btn ghost">
                  Explore the Work
                </Link>
              </div>
            </div>
            <div className="hero-image">
              <div className="frame">
                <Image
                  src="/images/rhianna-beach-halo.jpg"
                  alt="Rhianna walking through ocean surf at sunset, with sunburst halo"
                  fill
                  priority
                  sizes="(max-width: 880px) 92vw, 50vw"
                />
              </div>
              <div className="floater">
                &ldquo;Her ability to pinpoint the core issue made the work incredibly fast and
                effective.&rdquo;
                <span>— Teresa, client since 2022</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* ========== INTRO BAND ========== */}
      <section className="intro-band">
        <div className="wrap">
          <div className="portrait">
            <Image
              src="/images/rhianna-cape-lookout.jpg"
              alt="Rhianna smiling among ferns at Cape Lookout, Oregon"
              fill
              sizes="(max-width: 880px) 92vw, 35vw"
            />
          </div>
          <div>
            <span className="eyebrow">An introduction</span>
            <h2>Raised among astrologers — devoted to the unseen.</h2>
            <p>
              For over twenty-five years, I have worked at the threshold where psychology, energy,
              and the soul meet — supporting people and animals through evolutionary astrology,
              intuitive guidance, and the Quanta Freedom Healing™ method.
            </p>
            <p>
              My approach is quiet, precise, and deeply transformative. The work is not about
              adding more; it is about a return — to clarity, to alignment, to the deeper
              intelligence that has been within you all along.
            </p>
            <Link href="/contact" className="arrow-link" style={{ marginTop: 24 }}>
              Read more about Rhianna
            </Link>
          </div>
        </div>
      </section>

      {/* ========== SERVICES ========== */}
      <section className="services-section">
        <div className="wrap">
          <div className="services-head">
            <div>
              <span className="eyebrow">The Three Doorways</span>
              <h2>Three offerings, one underlying invitation.</h2>
            </div>
            <p className="kicker" style={{ fontSize: 18 }}>
              Each modality is a different aperture onto the same field — your soul&apos;s pattern,
              the body&apos;s wisdom, the language of the more-than-human world. Choose the one
              that calls.
            </p>
          </div>

          {/* Service 01 — Astrology */}
          <article className="service-row">
            <div className="service-media">
              <Image
                src="/images/rhianna-coot-lake.jpg"
                alt="Rhianna by the water at Coot Lake"
                fill
                sizes="(max-width: 880px) 92vw, 50vw"
              />
            </div>
            <div>
              <span className="service-num">— 01 / Astrological Readings</span>
              <h3>
                A map of your
                <br />
                <em style={{ color: "var(--violet-deep)" }}>soul&apos;s path.</em>
              </h3>
              <p className="service-copy">
                Evolutionary astrology trained at the Forrest Center — natal blueprint, current
                transits, and the deeper themes carried forward through time. Not prediction. A way
                to consciously participate in your own life.
              </p>
              <div className="service-meta">
                <span>60 minutes</span>
                <span>Zoom &amp; recording</span>
                <span>$250 · sliding scale</span>
              </div>
              <Link href="/astrology" className="arrow-link">
                Explore astrology
              </Link>
            </div>
          </article>

          {/* Service 02 — Animal */}
          <article className="service-row flip">
            <div className="service-media">
              <Image
                src="/images/mercy-and-rhianna.jpg"
                alt="Rhianna with her dog Mercy"
                fill
                sizes="(max-width: 880px) 92vw, 50vw"
              />
            </div>
            <div>
              <span className="service-num">— 02 / Intuitive Animal Communication</span>
              <h3>
                Listening
                <br />
                <em style={{ color: "var(--sage-deep)" }}>beyond words.</em>
              </h3>
              <p className="service-copy">
                Empathic communication with your animal — receiving sensations, emotions, images,
                and insights that reflect their experience. Behavioral patterns, transitions,
                end-of-life. Custom flower essence formulas when called for.
              </p>
              <div className="service-meta">
                <span>60 / 30 min</span>
                <span>Remote</span>
                <span>$200 · $100 follow-up</span>
              </div>
              <Link href="/animal-communication" className="arrow-link">
                Explore animal work
              </Link>
            </div>
          </article>

          {/* Service 03 — QFH */}
          <article className="service-row">
            <div
              className="service-media"
              style={{
                background:
                  "linear-gradient(135deg, var(--violet-pale), var(--mint-pale))",
              }}
            >
              <Image
                src="/images/qfh-seal.png"
                alt="Quanta Freedom Healing certified practitioner seal"
                fill
                style={{ objectFit: "contain", padding: 40, mixBlendMode: "multiply" }}
                sizes="(max-width: 880px) 92vw, 50vw"
              />
            </div>
            <div>
              <span className="service-num">— 03 / Quanta Freedom Healing™</span>
              <h3>
                Transform at
                <br />
                <em style={{ color: "var(--clay-deep)" }}>the root.</em>
              </h3>
              <p className="service-copy">
                A quantum healing modality (developed by Melanie Tonia Evans) for releasing stored
                trauma, inherited patterns, and subconscious beliefs held in the nervous system and
                energy field. Often, what therapy has held for years moves in a single session.
              </p>
              <div className="service-meta">
                <span>60 minutes</span>
                <span>Zoom</span>
                <span>$250 · $600 / three</span>
              </div>
              <Link href="/quanta-freedom-healing" className="arrow-link">
                Explore the healing
              </Link>
            </div>
          </article>
        </div>
      </section>

      {/* ========== REMOTE BAND ========== */}
      <section className="remote-band">
        <div className="wrap">
          <div>
            <span className="eyebrow">Remote · Worldwide</span>
            <h2>
              Wherever you are,
              <br />
              the field is here.
            </h2>
            <p>
              Every session is held over Zoom or by phone — for both human and animal clients.
              Distance is no obstacle to the work; the connection is energetic, not geographic.
              Clients join from across the United States and around the world, often more at ease
              in their own quiet space than they would be in an office.
            </p>
            <p style={{ marginTop: "1.5em" }}>
              <Link href="/contact" className="btn clay">
                Schedule a Session <span className="arrow">→</span>
              </Link>
            </p>
          </div>
          <ZoomMock
            title="Session · Rhianna Gray"
            hostTile={{
              kind: "placeholder",
              text: (
                <>
                  [ Rhianna on Zoom ]<br />remote session<br />— image placeholder —
                </>
              ),
            }}
            rightTiles={[
              { kind: "placeholder", text: <>[ Client tile ]<br />placeholder</> },
              { kind: "placeholder", text: <>[ Animal / chart ]<br />placeholder</> },
            ]}
            controls={
              <>
                <span>
                  <span className="pip" /> Recording
                </span>
                <span>· Mic on</span>
                <span>· Video on</span>
                <span>· 01:24:32</span>
              </>
            }
          />
        </div>
      </section>

      {/* ========== TESTIMONIAL ========== */}
      <section className="testimonial-section">
        <div className="wrap">
          <div className="testimonial-card">
            <div className="quote-mark">&ldquo;</div>
            <blockquote>
              Challenges I had been carrying for over twenty years were resolved in a single
              session. Her intuitive clarity, professionalism, and heart-centered presence make
              every session deeply transformative.
            </blockquote>
            <cite>— Teresa &nbsp; · &nbsp; Client since 2022</cite>
          </div>
        </div>
      </section>

      {/* ========== THRESHOLD TEASER ========== */}
      <section className="threshold-band">
        <div className="wrap">
          <div className="services-head">
            <div>
              <span className="eyebrow">Threshold · The Journal</span>
              <h2>Notes from the listening.</h2>
            </div>
            <p className="kicker" style={{ fontSize: 18 }}>
              Slow writing on astrology cycles, animal wisdom, and the inner mechanics of healing.
              Published when there is something worth saying.
            </p>
          </div>

          <div className="threshold-grid">
            <article className="threshold-card">
              <span className="date">May 2026 · Astrology</span>
              <h4>The Saturn–Neptune passage and the dissolving of an old self.</h4>
              <p>
                On the rare conjunction we are moving through, what it asks us to surrender, and
                the soft scaffolding it offers in return.
              </p>
              <Link href="/threshold">Read essay →</Link>
            </article>
            <article className="threshold-card">
              <span className="date">April 2026 · Animal</span>
              <h4>What our dogs carry for us — and how to gently give it back.</h4>
              <p>
                Animals often hold our unspoken grief and ungrounded anxieties. A practice for
                noticing what is yours, and what theirs.
              </p>
              <Link href="/threshold">Read essay →</Link>
            </article>
            <article className="threshold-card">
              <span className="date">March 2026 · Healing</span>
              <h4>Why the body refuses to budge — until something deeper is heard.</h4>
              <p>
                Stuck patterns are not stubbornness. They are intelligence. A look at how Quanta
                Freedom Healing speaks the body&apos;s native language.
              </p>
              <Link href="/threshold">Read essay →</Link>
            </article>
          </div>
          <div style={{ textAlign: "center", marginTop: 56 }}>
            <Link href="/threshold" className="btn ghost">
              All Essays
            </Link>
          </div>
        </div>
      </section>

      {/* ========== CLOSING ========== */}
      <section className="closing">
        <div className="wrap-narrow">
          <span className="eyebrow">An invitation</span>
          <h2>If something in you is asking to be heard —</h2>
          <p className="pillquote">
            &ldquo;My work is quiet, precise, and deeply transformative. It is an invitation to
            return to clarity, alignment, and the deeper intelligence within your life.&rdquo;
          </p>
          <Link href="/contact" className="btn">
            Book Your First Session <span className="arrow">→</span>
          </Link>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
