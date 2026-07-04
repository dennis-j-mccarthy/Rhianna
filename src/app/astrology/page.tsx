import Image from "next/image";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { getAllTextBlocks } from "@/lib/text";

export const metadata = {
  title: "Astrological Readings — Rhianna Gray",
  description:
    "Evolutionary astrology trained at the Forrest Center. Natal blueprint, current transits, and the deeper themes carried forward through time.",
};

const zodiacGlyphs: { glyph: string; top: string; left: string }[] = [
  { glyph: "♈", top: "2%",  left: "50%" },
  { glyph: "♉", top: "10%", left: "75%" },
  { glyph: "♊", top: "28%", left: "93%" },
  { glyph: "♋", top: "50%", left: "98%" },
  { glyph: "♌", top: "72%", left: "93%" },
  { glyph: "♍", top: "90%", left: "75%" },
  { glyph: "♎", top: "98%", left: "50%" },
  { glyph: "♏", top: "90%", left: "25%" },
  { glyph: "♐", top: "72%", left: "7%"  },
  { glyph: "♑", top: "50%", left: "2%"  },
  { glyph: "♒", top: "28%", left: "7%"  },
  { glyph: "♓", top: "10%", left: "25%" },
];

function HouseLines() {
  return (
    <div className="houses">
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="house-line"
          style={{ transform: `rotate(${i * 30}deg)` }}
        />
      ))}
    </div>
  );
}

export default async function AstrologyPage() {
  const ov = await getAllTextBlocks(); const t = (id: string, fb: string) => ov[id] ?? fb
  return (
    <>
      {/* HERO — dark night sky, includes its own header for the cream-on-dark look */}
      <section className="astro-hero">
        <div className="stars" />
        <SiteHeader active="astrology" />

        <div className="wrap">
          <div className="hero-grid">
            <div>
              <span className="eyebrow">{t('as-hero-ey', '01 · Astrological Readings')}</span>
              <h1>
                {t('as-hero-hl', "A map of your soul's path — and the cycles it is moving through.")}
              </h1>
              <p className="sub">
                {t('as-hero-sb', "Evolutionary astrology trained at the Forrest Center. Not prediction. A way to consciously participate in the unfolding of your own life.")}
              </p>
              <a
                href="https://calendly.com/rhianna-rhiannagray/astrology-reading"
                className="btn clay"
              >
                Schedule a Reading <span className="arrow">→</span>
              </a>
            </div>
            <div className="chart-wheel">
              <div className="ring" />
              <div className="ring r2" />
              <div className="ring r3" />
              <div className="ring r4" />
              <HouseLines />
              <div className="center-orb" aria-hidden="true" />
              <div className="zodiac-orbit">
                {zodiacGlyphs.map((g) => (
                  <div
                    key={g.glyph}
                    className="glyph"
                    style={{ top: g.top, left: g.left }}
                  >
                    <span className="glyph-inner">{g.glyph}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PATTERNS */}
      <section className="patterns">
        <div className="wrap">
          <div>
            <span className="eyebrow">{t('as-pat-ey', 'When Life Feels Confusing, Or Repetitive')}</span>
            <h2>{t('as-pat-hl', 'The questions most people arrive with.')}</h2>
          </div>
          <div>
            <div className="questions">
              <div>{t('as-pat-q1', 'You may notice you attract the same kind of partner — again and again.')}</div>
              <div>
                {t('as-pat-q2', "You face the same kind of challenge, no matter how much inner work you've done.")}
              </div>
              <div>{t('as-pat-q3', 'Or life simply feels heavier than it should — and you cannot name why.')}</div>
            </div>
            <p className="note">
              {t('as-pat-nt', "In those moments, it is natural to wonder: what is happening, why does this keep repeating, am I doing something wrong? Often, it isn't simply you. These experiences can reflect deeper patterns within your birth chart — your natal blueprint — along with current planetary transits and themes carried forward through time.")}
            </p>
          </div>
        </div>
      </section>

      {/* SOUL MAP */}
      <section className="soul-map">
        <div className="wrap">
          <div>
            <span className="eyebrow">A Map of Your Soul&apos;s Path</span>
            <h2>{t('as-sm-hl', 'Your chart is more than a personality profile.')}</h2>
            <p>
              {t('as-sm-bd', "It is a map of your soul's journey. Within it lives both the struggle and the medicine — your gifts and the deeper challenges you are here to transform.")}
            </p>
            <div className="reveals">
              <div className="reveal">
                <span className="roman">i.</span>
                <p>Your core strengths and natural gifts.</p>
              </div>
              <div className="reveal">
                <span className="roman">ii.</span>
                <p>The deeper challenges you are here to transform.</p>
              </div>
              <div className="reveal">
                <span className="roman">iii.</span>
                <p>The patterns you may be ready to release.</p>
              </div>
              <div className="reveal">
                <span className="roman">iv.</span>
                <p>The path of growth and evolution available to you.</p>
              </div>
            </div>
            <p className="pull">
              &ldquo;{t('as-sm-pq', "What you long for most deeply — your heart's true desires — often points directly toward your soul's purpose in this lifetime.")}&rdquo;
            </p>
          </div>
          <div className="media">
            <Image
              src="/images/rhianna-beach-halo.jpg"
              alt="Rhianna walking through ocean surf at sunset"
              fill
              sizes="(max-width: 880px) 92vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* CYCLES */}
      <section className="cycles">
        <div className="wrap">
          <div>
            <span className="eyebrow">Working with the Cycles of Your Life</span>
            <h2>
              {t('as-cy-hl', 'Rather than feeling at the mercy of circumstance — begin to work with these energies.')}
            </h2>
            <p style={{ marginTop: 24 }}>
              {t('as-cy-bd', 'In a reading, I help you understand both your natal chart and current transits, so you can see the larger picture of what is actually unfolding. The shape and the timing.')}
            </p>
          </div>
          <div className="experiences">
            <div className="exp">Greater clarity around repeating life patterns.</div>
            <div className="exp">Insight into relationship dynamics.</div>
            <div className="exp">A deeper understanding of timing and life cycles.</div>
            <div className="exp">Tools to navigate challenges with awareness and intention.</div>
          </div>
        </div>
      </section>

      {/* DUALITY */}
      <section className="duality">
        <div className="wrap-narrow">
          <div className="center">
            <span className="eyebrow">More Than Prediction</span>
            <h2 style={{ maxWidth: "18ch", margin: "0 auto" }}>
              {t('as-du-hl', 'Astrology can show what is coming. More importantly, it shows you how to meet it.')}
            </h2>
          </div>
          <div className="duality-grid">
            <div>
              <div className="smalltag">— What it offers</div>
              <h3>Foresight &amp; preparation.</h3>
              <p>
                {t('as-du-l1', 'Understanding the upcoming cycles and themes — the long arc of a transit, the windows of unusual opportunity, the seasons of necessary stillness.')}
              </p>
            </div>
            <div>
              <div className="smalltag">— What it is, more truly</div>
              <h3>A tool for empowerment.</h3>
              <p>
                {t('as-du-r1', 'A way to meet each phase of life with awareness, creativity, and choice — so you can move with your life, rather than feel controlled by it.')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* APPROACH */}
      <section className="approach">
        <div className="wrap">
          <div className="portrait">
            <Image
              src="/images/rhianna-headshot.jpg"
              alt="Rhianna Gray portrait"
              fill
              sizes="(max-width: 880px) 92vw, 40vw"
            />
          </div>
          <div>
            <span className="eyebrow">My Approach</span>
            <h2>{t('as-ap-hl', 'Raised in the language of the planets.')}</h2>
            <p className="body">
              {t('as-ap-b1', 'Astrology has been a lifelong path of ceaseless fascination and study. Both of my parents were astrologers — I was raised with the language of the planets as part of everyday life. As a teenager, I disappeared into their astrology books. The passion has only deepened over the decades.')}
            </p>
            <p className="body">
              {t('as-ap-b2', 'I studied Evolutionary Astrology through the Forrest Center for Evolutionary Astrology and bring that depth of training into each session. Alongside the technical understanding, I integrate my intuitive abilities — allowing each reading to be both insightful and deeply personalized.')}
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 24 }}>
              <span className="chip" style={{ color: "var(--mint)", borderColor: "var(--mint)" }}>
                Forrest Center Trained
              </span>
              <span className="chip" style={{ color: "var(--mint)", borderColor: "var(--mint)" }}>
                25+ Years
              </span>
              <span className="chip" style={{ color: "var(--mint)", borderColor: "var(--mint)" }}>
                Intuitive · Technical
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="pricing-section">
        <div className="wrap">
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span className="eyebrow">Scheduling &amp; Rates</span>
            <h2>How to begin.</h2>
          </div>
          <div className="pricing-card">
            <div className="row">
              <div>
                <div className="name">Natal &amp; Transit Reading</div>
                <div className="desc">
                  Full reading and recording, via Zoom and/or phone. ~90 minutes.
                </div>
              </div>
              <div className="price">$250</div>
            </div>
            <div className="row">
              <div>
                <div className="name">Sliding Scale</div>
                <div className="desc">
                  Available on request. Money should never be the obstacle.
                </div>
              </div>
              <div className="price" style={{ fontSize: 22, color: "var(--muted)" }}>
                By request
              </div>
            </div>
            <div className="birthbox">
              <h4>Please include with your booking</h4>
              <ul>
                <li>✦ Your birth date</li>
                <li>✦ Birth location</li>
                <li>✦ Birth time (as exact as possible)</li>
              </ul>
            </div>
            <div className="actions">
              <a
                href="https://calendly.com/rhianna-rhiannagray/astrology-reading"
                className="btn"
              >
                Schedule a Reading <span className="arrow">→</span>
              </a>
              <a href="mailto:Rhianna@rhiannagray.com" className="btn ghost">
                Email Rhianna
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CLOSING */}
      <section className="closing-band">
        <div className="wrap-narrow">
          <p className="pillquote" style={{ maxWidth: "32ch", margin: "0 auto" }}>
            &ldquo;{t('as-cl-qt', 'Astrology becomes not just a way to understand your life — but a way to consciously participate in it.')}&rdquo;
          </p>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
