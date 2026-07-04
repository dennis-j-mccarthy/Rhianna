"use client";

import { useEffect, useRef, useState } from "react";

type Testimonial = { quote: string[]; author: string };

const TESTIMONIALS: Testimonial[] = [
  {
    quote: [
      "During a very intense time dealing with an overwhelming situation that felt insurmountable and consumed my life, Rhianna suggested a Quanta Freedom Healing session. I didn't know what to expect but needed to do the things to take care of myself.",
      "The session was fascinating and allowed me to go into a deep and perhaps neglected space. It was amazing, and I can still access it at will.",
      "Afterwards, although hard to describe, I felt totally elated. I laid on the bed for a long period of time feeling a buzz and thinking 'Wow, that was incredible.'",
      "I realized that this problem is not me. It's not who I am, and it's something I can compartmentalize as a challenge over there. I don't need to carry it within. A heavy burden was lifted. I felt free. I felt relief. It saved me in many ways.",
      "Step by step I'm overcoming the problem, all mostly in the rearview, and it doesn't need to dominate my existence or wellbeing. Without the session, I don't think I would have realized this.",
      "Since, I've had a couple more sessions and enjoy the buzz, awareness, light, and freedom gained. Thank you truly. Most grateful,",
    ],
    author: "Janet",
  },
  {
    quote: [
      "I've been working with Rhianna Gray since 2022, and she continues to amaze me with her gifts as an intuitive, astrologer, and Quanta Freedom Healing practitioner. When we first connected, she helped me navigate some big life questions through my astrological chart. Her accuracy and insight into both my chart and personality were remarkable—she truly saw me.",
      "When Rhianna began offering Quanta Freedom Healing, I couldn't wait to experience it. Her ability to pinpoint the core issue and guide the healing process with such precision made the work incredibly fast and effective. Challenges I had been carrying and working on for over 20 years were resolved in a single session.",
      "Rhianna is now my go-to whenever something feels stuck or unresolved. Her intuitive clarity, professionalism, and heart-centered presence make every session deeply transformative.",
    ],
    author: "Teresa · Client since 2022",
  },
  {
    quote: [
      "Rhianna Gray's Quanta Freedom Healing sessions are a dynamic and helpful process to resolve traumatic challenges and a cascade of unresolved issues. What was clouding my life felt like it lifted in one session. First she identifies and clarifies the primary concern. Then she works with you through the unique Quanta Freedom Healing process step-by-step to unpack unresolved issues and the sensations embedded in your field and being.",
      "The result — it's like a complete reset. I felt a complete sense of lightness and clarity I couldn't access before.",
    ],
    author: "Bob",
  },
  {
    quote: [
      "Rhianna is a truly gifted and soulful intuitive whom I highly recommend you consider working with if you're given the opportunity. Her healing sessions bring peace, centering, clarity, and transformation. She has helped me immensely on my self-discovery path, and I find her to be exceptional in her ability to shift energy and tap into higher states of wellness. I encourage you to treat yourself to a session.",
    ],
    author: "Shannon",
  },
  {
    quote: [
      "Rhianna holds a very safe and relaxing container. This allowed me to connect easily to my body and spirit. Combining this with her strong intuition made for several very transformative sessions. The default tension in my body was less, and I experienced less inertia in my creative work.",
    ],
    author: "SHH",
  },
  {
    quote: [
      "Rhianna is a brilliant and powerful healer. She brings deep and long experience to her sessions, and she unerringly zeros in on the root of the issue that I'm dealing with. She is no-nonsense and has a strength about her that lets me relax and know that I'm in good hands. I have no hesitation to “go there” with whatever difficult stuff comes up, because she can handle it all without blinking an eye!",
      "I've done a boatload of work on myself and am a healer in my own right, and working with Rhianna has allowed me to make leaps and bounds forward in my ascension process. Her work with quantum healing is so needed at this time (for all of us)! Do yourself a favor and book a session with her.",
    ],
    author: "Korina Felkers · Frequency Healer, Clairvoyant & Spiritual Teacher, Three Rivers, MI",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [overflowing, setOverflowing] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  const t = TESTIMONIALS[index];

  // Reset the expanded state whenever the slide changes.
  useEffect(() => {
    setExpanded(false);
  }, [index]);

  // Detect whether the (collapsed) quote overflows and needs a "Read more".
  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    setOverflowing(el.scrollHeight > el.clientHeight + 4);
  }, [index, expanded]);

  const go = (d: number) =>
    setIndex((p) => (p + d + TESTIMONIALS.length) % TESTIMONIALS.length);

  const showToggle = overflowing || expanded;

  return (
    <div className="testimonial-slider">
      <div className="testimonial-card">
        <div className="quote-mark">&ldquo;</div>
        <blockquote>
          <div
            ref={bodyRef}
            className={`quote-body${expanded ? " expanded" : ""}${
              overflowing && !expanded ? " faded" : ""
            }`}
          >
            {t.quote.map((p, k) => (
              <p key={k}>{p}</p>
            ))}
          </div>
        </blockquote>
        {showToggle && (
          <button
            type="button"
            className="read-more"
            onClick={() => setExpanded((e) => !e)}
          >
            {expanded ? "Read less" : "Read more"}
          </button>
        )}
        <cite>— {t.author}</cite>
      </div>

      <div className="tst-controls">
        <button
          type="button"
          className="tst-arrow"
          onClick={() => go(-1)}
          aria-label="Previous testimonial"
        >
          ←
        </button>
        <div className="tst-dots">
          {TESTIMONIALS.map((_, k) => (
            <button
              key={k}
              type="button"
              className={k === index ? "active" : undefined}
              onClick={() => setIndex(k)}
              aria-label={`Testimonial ${k + 1}`}
            />
          ))}
        </div>
        <button
          type="button"
          className="tst-arrow"
          onClick={() => go(1)}
          aria-label="Next testimonial"
        >
          →
        </button>
      </div>
    </div>
  );
}
