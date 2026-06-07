'use client'

import { useState, useEffect } from 'react'

interface Block  { id: string; label: string; text: string }
interface Section { name: string; blocks: Block[] }
interface Page   { id: string; name: string; sections: Section[] }

const PAGES: Page[] = [
  {
    id: 'home', name: 'Home',
    sections: [
      { name: 'Cover Hero', blocks: [
        { id: 'h-hero-ey', label: 'Eyebrow',    text: 'Twenty-five years of listening' },
        { id: 'h-hero-hl', label: 'Headline',   text: 'A quiet return to the deeper intelligence within.' },
        { id: 'h-hero-tl', label: 'Testimonial',text: 'Her ability to pinpoint the core issue made the work incredibly fast and effective.' },
      ]},
      { name: 'Intro Band', blocks: [
        { id: 'h-intro-ey', label: 'Eyebrow',  text: 'An introduction' },
        { id: 'h-intro-hl', label: 'Heading',  text: 'Raised among astrologers — devoted to the unseen.' },
        { id: 'h-intro-b1', label: 'Body 1',   text: 'For over twenty-five years, I have worked at the threshold where psychology, energy, and the soul meet — supporting people and animals through evolutionary astrology, intuitive guidance, and the Quanta Freedom Healing™ method.' },
        { id: 'h-intro-b2', label: 'Body 2',   text: 'My approach is quiet, precise, and deeply transformative. The work is not about adding more; it is about a return — to clarity, to alignment, to the deeper intelligence that has been within you all along.' },
      ]},
      { name: 'Services', blocks: [
        { id: 'h-svc-ey', label: 'Eyebrow',       text: 'The Three Doorways' },
        { id: 'h-svc-hl', label: 'Heading',        text: 'Three offerings, one underlying invitation.' },
        { id: 'h-svc-kk', label: 'Kicker',         text: "Each modality is a different aperture onto the same field — your soul's pattern, the body's wisdom, the language of the more-than-human world. Choose the one that calls." },
        { id: 'h-svc-as', label: 'Astrology copy', text: 'Evolutionary astrology trained at the Forrest Center — natal blueprint, current transits, and the deeper themes carried forward through time. Not prediction. A way to consciously participate in your own life.' },
        { id: 'h-svc-ac', label: 'Animal copy',    text: 'Empathic communication with your animal — receiving sensations, emotions, images, and insights that reflect their experience. Behavioral patterns, transitions, end-of-life. Custom flower essence formulas when called for.' },
        { id: 'h-svc-qf', label: 'Healing copy',   text: 'A quantum healing modality (developed by Melanie Tonia Evans) for releasing stored trauma, inherited patterns, and subconscious beliefs held in the nervous system and energy field. Often, what therapy has held for years moves in a single session.' },
      ]},
      { name: 'Remote Band', blocks: [
        { id: 'h-rem-hl', label: 'Heading', text: 'Wherever you are, the field is here.' },
        { id: 'h-rem-b1', label: 'Body',    text: 'Every session is held over Zoom or by phone — for both human and animal clients. Distance is no obstacle to the work; the connection is energetic, not geographic. Clients join from across the United States and around the world, often more at ease in their own quiet space than they would be in an office.' },
      ]},
      { name: 'Testimonial', blocks: [
        { id: 'h-tes-qt', label: 'Quote', text: 'Challenges I had been carrying for over twenty years were resolved in a single session. Her intuitive clarity, professionalism, and heart-centered presence make every session deeply transformative.' },
      ]},
      { name: 'Notebook', blocks: [
        { id: 'h-nb-hl', label: 'Heading', text: 'Notes from the listening.' },
        { id: 'h-nb-kk', label: 'Kicker',  text: 'Slow writing on astrology cycles, animal wisdom, and the inner mechanics of healing. Published when there is something worth saying.' },
      ]},
      { name: 'Closing', blocks: [
        { id: 'h-cl-hl', label: 'Heading', text: 'If something in you is asking to be heard —' },
        { id: 'h-cl-qt', label: 'Quote',   text: 'My work is quiet, precise, and deeply transformative. It is an invitation to return to clarity, alignment, and the deeper intelligence within your life.' },
      ]},
    ],
  },
  {
    id: 'astrology', name: 'Astrology',
    sections: [
      { name: 'Hero', blocks: [
        { id: 'as-hero-ey', label: 'Eyebrow',    text: '01 · Astrological Readings' },
        { id: 'as-hero-hl', label: 'Headline',   text: "A map of your soul's path — and the cycles it is moving through." },
        { id: 'as-hero-sb', label: 'Subheading', text: 'Evolutionary astrology trained at the Forrest Center. Not prediction. A way to consciously participate in the unfolding of your own life.' },
      ]},
      { name: 'Patterns', blocks: [
        { id: 'as-pat-ey', label: 'Eyebrow',    text: 'When Life Feels Confusing, Or Repetitive' },
        { id: 'as-pat-hl', label: 'Heading',    text: 'The questions most people arrive with.' },
        { id: 'as-pat-q1', label: 'Question 1', text: 'You may notice you attract the same kind of partner — again and again.' },
        { id: 'as-pat-q2', label: 'Question 2', text: "You face the same kind of challenge, no matter how much inner work you've done." },
        { id: 'as-pat-q3', label: 'Question 3', text: 'Or life simply feels heavier than it should — and you cannot name why.' },
        { id: 'as-pat-nt', label: 'Note',       text: "In those moments, it is natural to wonder: what is happening, why does this keep repeating, am I doing something wrong? Often, it isn't simply you. These experiences can reflect deeper patterns within your birth chart — your natal blueprint — along with current planetary transits and themes carried forward through time." },
      ]},
      { name: 'Soul Map', blocks: [
        { id: 'as-sm-hl', label: 'Heading',    text: 'Your chart is more than a personality profile.' },
        { id: 'as-sm-bd', label: 'Body',       text: "It is a map of your soul's journey. Within it lives both the struggle and the medicine — your gifts and the deeper challenges you are here to transform." },
        { id: 'as-sm-pq', label: 'Pull Quote', text: "What you long for most deeply — your heart's true desires — often points directly toward your soul's purpose in this lifetime." },
      ]},
      { name: 'Cycles', blocks: [
        { id: 'as-cy-hl', label: 'Heading', text: 'Rather than feeling at the mercy of circumstance — begin to work with these energies.' },
        { id: 'as-cy-bd', label: 'Body',    text: 'In a reading, I help you understand both your natal chart and current transits, so you can see the larger picture of what is actually unfolding. The shape and the timing.' },
      ]},
      { name: 'Duality', blocks: [
        { id: 'as-du-hl', label: 'Heading',    text: 'Astrology can show what is coming. More importantly, it shows you how to meet it.' },
        { id: 'as-du-l1', label: 'Left body',  text: 'Understanding the upcoming cycles and themes — the long arc of a transit, the windows of unusual opportunity, the seasons of necessary stillness.' },
        { id: 'as-du-r1', label: 'Right body', text: 'A way to meet each phase of life with awareness, creativity, and choice — so you can move with your life, rather than feel controlled by it.' },
      ]},
      { name: 'Approach', blocks: [
        { id: 'as-ap-hl', label: 'Heading', text: 'Raised in the language of the planets.' },
        { id: 'as-ap-b1', label: 'Body 1',  text: 'Astrology has been a lifelong path of ceaseless fascination and study. Both of my parents were astrologers — I was raised with the language of the planets as part of everyday life. As a teenager, I disappeared into their astrology books. The passion has only deepened over the decades.' },
        { id: 'as-ap-b2', label: 'Body 2',  text: 'I studied Evolutionary Astrology through the Forrest Center for Evolutionary Astrology and bring that depth of training into each session. Alongside the technical understanding, I integrate my intuitive abilities — allowing each reading to be both insightful and deeply personalized.' },
      ]},
      { name: 'Closing', blocks: [
        { id: 'as-cl-qt', label: 'Quote', text: 'Astrology becomes not just a way to understand your life — but a way to consciously participate in it.' },
      ]},
    ],
  },
  {
    id: 'healing', name: 'Healing',
    sections: [
      { name: 'Hero', blocks: [
        { id: 'hl-hero-hl', label: 'Headline',   text: 'Transform at the root — not the surface.' },
        { id: 'hl-hero-sb', label: 'Subheading', text: 'A quantum healing modality that gently releases stored trauma, inherited patterns, and subconscious beliefs — held in the nervous system and the energy field.' },
      ]},
      { name: 'If You Recognize Any of This', blocks: [
        { id: 'hl-cy-hl', label: 'Heading',    text: 'You are not failing. The work has simply not yet gone deep enough.' },
        { id: 'hl-cy-q1', label: 'Question 1', text: 'Are you stuck in repeating emotional cycles or destructive patterns — despite your awareness, effort, or even therapy?' },
        { id: 'hl-cy-q2', label: 'Question 2', text: 'Do you feel triggered again and again, overwhelmed by the intensity of your reactions and unsure how to move through them?' },
        { id: 'hl-cy-q3', label: 'Question 3', text: 'Do certain challenges — relationships, finances, life circumstances — seem to repeat, leaving you wondering why?' },
        { id: 'hl-cy-q4', label: 'Question 4', text: 'Are you experiencing patterns of lack in love, money, creativity, or meaningful work?' },
        { id: 'hl-cy-q5', label: 'Question 5', text: 'Do you long for peace in your relationships and within yourself?' },
      ]},
      { name: 'A Different Possibility', blocks: [
        { id: 'hl-dp-hl', label: 'Display text', text: 'What if lasting change was possible — at the root?' },
        { id: 'hl-dp-b1', label: 'Body 1',       text: 'What if you could go within and transform the deeper layers of your being — emotionally, mentally, physically, and spiritually?' },
        { id: 'hl-dp-b2', label: 'Body 2',       text: 'By gently releasing stored trauma, inherited patterns, and subconscious beliefs, profound shifts can occur. As your inner world changes, your outer reality begins to reflect that transformation. You may begin to feel calmer, more grounded, and more trusting of yourself and of life.' },
      ]},
      { name: 'About the Modality', blocks: [
        { id: 'hl-ab-hl', label: 'Heading', text: 'A modality that meets you at the subconscious and energetic level.' },
        { id: 'hl-ab-b1', label: 'Body 1',  text: 'I am a certified practitioner of Quanta Freedom Healing, working with this powerful quantum healing modality to release trauma, limiting beliefs, emotional imprints, and inherited family patterns held within the nervous system, subconscious, and energy field.' },
        { id: 'hl-ab-b2', label: 'Body 2',  text: 'During a session, you are guided to connect with your body and safely access where these patterns are stored. Through this process, you release dense emotional energy and reconnect with your Higher Self. Clients often experience a sense of lightness, clarity, and deep inner relief — along with a stronger connection to their own inner guidance, peace, and truth.' },
      ]},
      { name: 'Results', blocks: [
        { id: 'hl-rs-hl', label: 'Heading',   text: 'After a session — what often emerges.' },
        { id: 'hl-rs-b1', label: 'Body 1',    text: 'Many people feel calm, grounded, and deeply connected to their heart and Higher Self. A natural sense of trust and openness arises.' },
        { id: 'hl-rs-b2', label: 'Body 2',    text: 'Because the work occurs at the subconscious and energetic levels, it can create meaningful shifts across emotional, mental, physical, and spiritual well-being.' },
        { id: 'hl-rs-e1', label: 'Emotional', text: 'A loosening of long-held feeling-states. Less reactivity, more room.' },
        { id: 'hl-rs-m1', label: 'Mental',    text: 'Clarity. The thought-loops that ran the show begin to quiet.' },
        { id: 'hl-rs-p1', label: 'Physical',  text: 'The body softens. Patterns held as tension or symptom can begin to shift.' },
        { id: 'hl-rs-s1', label: 'Spiritual', text: 'A return to the deeper knowing — your own Higher Self made audible again.' },
      ]},
      { name: 'Approach', blocks: [
        { id: 'hl-ap-hl', label: 'Heading', text: 'Certified practitioner. Twenty-five years of intuitive listening.' },
        { id: 'hl-ap-b1', label: 'Body 1',  text: 'In addition to being a certified Quanta Freedom Healing™ practitioner, I bring over twenty-five years of experience as an intuitive and spiritual counselor, working with both humans and animals.' },
        { id: 'hl-ap-b2', label: 'Body 2',  text: 'Each session is guided not only by the QFH process, but also by intuitive insight — allowing us to access and address what is most ready to be healed.' },
      ]},
      { name: 'Testimonials', blocks: [
        { id: 'hl-t1-qt', label: 'Teresa', text: "I've been working with Rhianna Gray since 2022, and she continues to amaze me with her gifts as an intuitive, astrologer, and Quanta Freedom Healing practitioner. When we first connected, she helped me navigate some big life questions through my astrological chart. Her accuracy and insight were remarkable — she truly saw me. When Rhianna began offering Quanta Freedom Healing, I couldn't wait to experience it. Her ability to pinpoint the core issue and guide the healing process with such precision made the work incredibly fast and effective. Challenges I had been carrying for over twenty years were resolved in a single session." },
        { id: 'hl-t2-qt', label: 'Bob',    text: "Rhianna Gray's Quanta Freedom Healing sessions are a dynamic and powerful way to resolve trauma and layered challenges. What was clouding my life felt like it lifted in a single session. She clearly identifies the core issue, then guides you step-by-step through the healing process to release what's been held in your body and energy field. The result felt like a complete reset — I experienced a level of lightness and clarity I hadn't been able to access before." },
      ]},
    ],
  },
  {
    id: 'animal', name: 'Animal',
    sections: [
      { name: 'Hero', blocks: [
        { id: 'ac-hero-hl', label: 'Headline',   text: 'A deeper way to understand your animal.' },
        { id: 'ac-hero-sb', label: 'Subheading', text: "Animals are deeply aware, sensitive beings who communicate in ways that go beyond words. Sometimes you sense they are trying to express something — but you can't quite hear it yet." },
      ]},
      { name: 'You May Be Wondering', blocks: [
        { id: 'ac-wn-hl', label: 'Heading',    text: 'Three quiet questions most people arrive with.' },
        { id: 'ac-wn-q1', label: 'Question 1', text: 'Why is this behavior happening — and is it asking something of me?' },
        { id: 'ac-wn-q2', label: 'Question 2', text: "Is my animal trying to tell me something I haven't yet heard?" },
        { id: 'ac-wn-q3', label: 'Question 3', text: 'How can I better support them, especially now?' },
      ]},
      { name: 'Listening Beyond Words', blocks: [
        { id: 'ac-lb-hl', label: 'Heading', text: 'The communication itself.' },
        { id: 'ac-lb-b1', label: 'Body 1',  text: 'Through intuitive connection, I communicate with your animal at an empathic level — receiving physical sensations, impressions, emotions, images, and insights that reflect their experience.' },
        { id: 'ac-lb-b2', label: 'Body 2',  text: 'These sessions offer a space where your animal, and you, can be heard, understood, and supported. As clarity unfolds, a sense of peace can follow. Often, what they share brings not only clarity — but a deeper sense of connection between you.' },
        { id: 'ac-lb-qt', label: 'Quote',   text: 'You and your animal share a deep bond, where supporting one another creates harmony for both.' },
      ]},
      { name: 'Shared Journey', blocks: [
        { id: 'ac-sj-hl', label: 'Heading', text: 'What they carry — and what we carry back.' },
        { id: 'ac-sj-b1', label: 'Body 1',  text: 'Animals are often deeply connected to our own emotional and spiritual lives. At times, what they express may reflect not only their experience — but also aspects of the environment, or the people they are bonded with.' },
        { id: 'ac-sj-b2', label: 'Body 2',  text: 'As with our deepest relationships, they can transform us, and lead us more fully into our own hearts. These sessions can open a deeper awareness of that connection, bringing healing, insight, and harmony to both you and your animal.' },
      ]},
      { name: 'Flower Essences', blocks: [
        { id: 'ac-fe-hl', label: 'Heading', text: 'Custom flower essence formulas.' },
        { id: 'ac-fe-b1', label: 'Body 1',  text: 'When appropriate, I create customized flower essence formulas to support your animal in gently shifting habitual patterns and emotional imprints — helping them move toward greater calm, trust, and ease.' },
        { id: 'ac-fe-b2', label: 'Body 2',  text: 'The essences are formulated specifically for what your animal has shared during our session, and follow them home as a quiet continuation of the work.' },
      ]},
      { name: 'Approach', blocks: [
        { id: 'ac-ap-hl', label: 'Heading', text: 'Twenty-five years of listening — over Zoom, or by phone.' },
        { id: 'ac-ap-b1', label: 'Body 1',  text: 'In 2000, I worked as an assistant at a holistic veterinary practice and discovered my ability to communicate with animals. Soon, clients were scheduling sessions with me — in the office and beyond.' },
        { id: 'ac-ap-b2', label: 'Body 2',  text: "I approach each communication with openness and care, allowing your animal's voice to come forward in a way that feels clear and supportive. The work itself is energetic, so your animal does not need to be on camera. Most simply rest nearby while we speak." },
      ]},
      { name: 'Closing', blocks: [
        { id: 'ac-cl-qt', label: 'Quote', text: 'When your animal is heard, something softens — and a deeper connection naturally unfolds.' },
      ]},
    ],
  },
  {
    id: 'contact', name: 'Contact',
    sections: [
      { name: 'Hero', blocks: [
        { id: 'ct-hero-hl', label: 'Heading', text: 'Begin a conversation.' },
        { id: 'ct-hero-tl', label: 'Tagline', text: 'Choose a session below, or send a note — whichever feels easier. I read everything that comes in and reply within a few days.' },
      ]},
      { name: 'Contact Form', blocks: [
        { id: 'ct-cf-hl', label: 'Heading', text: 'Not sure where to start? Tell me a little.' },
        { id: 'ct-cf-bd', label: 'Body',    text: "If you would rather not book directly, send a message. I'll reply with the doorway that feels most appropriate for what you're carrying." },
      ]},
      { name: 'FAQ', blocks: [
        { id: 'ct-faq-q1', label: 'Q: Right session?',   text: 'How do I know which session is right for me?' },
        { id: 'ct-faq-a1', label: 'A: Right session?',   text: "If you are dealing with patterns that keep repeating in your life, Quanta Freedom Healing is often the most direct. If you are at a crossroads, in a major life transition, or want to understand the larger arc, astrology is the deeper map. Animal Communication is for when an animal in your life is asking for something — even if you can't quite name what. If you're unsure, write to me — I'll point you toward the right doorway." },
        { id: 'ct-faq-a2', label: 'A: Remote?',          text: 'All sessions are held remotely, over Zoom or by phone. The work is energetic, not geographic — clients join from across the United States and around the world. Many people prefer the quiet of their own space.' },
        { id: 'ct-faq-a4', label: 'A: Sliding scale?',   text: 'Sliding scale is available on every offering. Please ask. Money should never be the obstacle to receiving the work.' },
        { id: 'ct-faq-a5', label: 'A: Response time?',   text: 'Within 2–4 days, almost always. If something is urgent — a transition with an animal, a crisis — please say so in your note.' },
      ]},
      { name: 'Closing', blocks: [
        { id: 'ct-cl-hl', label: 'Heading', text: 'My work is quiet, precise, and deeply transformative. I look forward to hearing from you.' },
      ]},
    ],
  },
]

const RATING_COLOR: Record<number, string> = {
  1: '#dc2626', 2: '#f97316', 3: '#eab308', 4: '#22c55e', 5: '#16a34a',
}
const RATING_LABEL: Record<number, string> = {
  1: 'Not acceptable', 2: 'Needs work', 3: 'Needs review', 4: 'Good', 5: 'Perfect as is',
}
const STORAGE_KEY   = 'vtt-ratings-v1'
const REVISIONS_KEY = 'vtt-revisions-v1'

export default function VetThatText() {
  const [ratings,    setRatings]    = useState<Record<string, number>>({})
  const [revisions,  setRevisions]  = useState<Record<string, string>>({})
  const [activeBlock, setActiveBlock] = useState<Block | null>(null)
  const [editText,   setEditText]   = useState('')
  const [copied,     setCopied]     = useState(false)
  const [saved,      setSaved]      = useState(false)
  const [collapsed,  setCollapsed]  = useState<Record<string, boolean>>({})

  useEffect(() => {
    try {
      const r = localStorage.getItem(STORAGE_KEY)
      if (r) setRatings(JSON.parse(r))
      const v = localStorage.getItem(REVISIONS_KEY)
      if (v) setRevisions(JSON.parse(v))
    } catch {}
  }, [])

  const rate = (id: string, value: number) => {
    const next = { ...ratings, [id]: value }
    setRatings(next)
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)) } catch {}
  }

  const openEdit = (block: Block) => {
    setActiveBlock(block)
    setEditText(revisions[block.id] ?? block.text)
    setCopied(false)
    setSaved(false)
  }

  const saveRevision = () => {
    if (!activeBlock) return
    const next = { ...revisions, [activeBlock.id]: editText }
    setRevisions(next)
    try { localStorage.setItem(REVISIONS_KEY, JSON.stringify(next)) } catch {}
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const clearRevision = (id: string) => {
    const next = { ...revisions }
    delete next[id]
    setRevisions(next)
    try { localStorage.setItem(REVISIONS_KEY, JSON.stringify(next)) } catch {}
    if (activeBlock?.id === id) setEditText(activeBlock.text)
  }

  const copy = async () => {
    await navigator.clipboard.writeText(editText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const allBlocks  = PAGES.flatMap(p => p.sections.flatMap(s => s.blocks))
  const rated      = Object.keys(ratings).length
  const revised    = Object.keys(revisions).length
  const avg        = rated > 0
    ? (Object.values(ratings).reduce((a, b) => a + b, 0) / rated).toFixed(1)
    : '—'

  const s: Record<string, React.CSSProperties> = {
    page:      { minHeight: '100vh', background: '#f5f4f1', fontFamily: "'Inter', system-ui, sans-serif", fontSize: 14 },
    topbar:    { background: '#fff', borderBottom: '1px solid #e8e8e8', padding: '18px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100 },
    layout:    { display: 'grid', gridTemplateColumns: '1fr 400px', alignItems: 'start' },
    list:      { padding: '32px 24px 80px 32px', overflowY: 'auto' },
    sidebar:   { position: 'sticky', top: 61, height: 'calc(100vh - 61px)', padding: '24px 32px 24px 0', display: 'flex', flexDirection: 'column' },
    sideInner: { flex: 1, background: '#fff', border: '1px solid #e8e8e8', borderRadius: 12, display: 'flex', flexDirection: 'column', overflow: 'hidden' },
  }

  return (
    <div style={s.page}>
      {/* Top bar */}
      <div style={s.topbar}>
        <div>
          <div style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#aaa', marginBottom: 2 }}>Rhianna Gray · Internal</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#111', letterSpacing: '-0.01em' }}>Vet That Text</div>
        </div>
        <div style={{ display: 'flex', gap: 20, fontSize: 13, color: '#888' }}>
          <span><b style={{ color: '#111' }}>{rated}</b> / {allBlocks.length} rated</span>
          <span>Avg: <b style={{ color: '#111' }}>{avg}</b></span>
          {revised > 0 && <span><b style={{ color: '#111' }}>{revised}</b> revised</span>}
          {rated > 0 && (
            <button
              onClick={() => { setRatings({}); setRevisions({}); try { localStorage.removeItem(STORAGE_KEY); localStorage.removeItem(REVISIONS_KEY) } catch {} }}
              style={{ fontSize: 11, color: '#aaa', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
            >
              clear all
            </button>
          )}
        </div>
      </div>

      <div style={s.layout}>
        {/* ── Left: text blocks ── */}
        <div style={s.list}>
          {PAGES.map(page => {
            const pageRatings = page.sections.flatMap(s => s.blocks).map(b => ratings[b.id]).filter(Boolean) as number[]
            const pageAvg = pageRatings.length > 0
              ? (pageRatings.reduce((a, b) => a + b, 0) / pageRatings.length).toFixed(1)
              : null

            return (
              <div key={page.id} style={{ marginBottom: 36 }}>
                {/* Page header */}
                <button
                  onClick={() => setCollapsed(c => ({ ...c, [page.id]: !c[page.id] }))}
                  style={{ width: '100%', textAlign: 'left', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '11px 16px', background: '#111', borderRadius: 8, border: 'none', cursor: 'pointer', marginBottom: 14, color: '#fff' }}
                >
                  <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase' }}>{page.name}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    {pageAvg && <span style={{ fontSize: 12, opacity: 0.6 }}>avg {pageAvg}</span>}
                    <span style={{ fontSize: 16, opacity: 0.5 }}>{collapsed[page.id] ? '↓' : '↑'}</span>
                  </span>
                </button>

                {!collapsed[page.id] && page.sections.map(section => (
                  <div key={section.name} style={{ marginBottom: 20 }}>
                    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#bbb', padding: '0 4px', marginBottom: 8 }}>
                      {section.name}
                    </div>
                    {section.blocks.map(block => {
                      const r         = ratings[block.id]
                      const rev       = revisions[block.id]
                      const isActive  = activeBlock?.id === block.id
                      return (
                        <div
                          key={block.id}
                          style={{ background: isActive ? '#fffbf7' : '#fff', border: `1.5px solid ${isActive ? '#d4956a' : '#e8e8e8'}`, borderRadius: 8, padding: '12px 14px', marginBottom: 6, transition: 'border-color 0.15s' }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8, gap: 8 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 7, flexShrink: 0 }}>
                              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#bbb' }}>
                                {block.label}
                              </span>
                              {rev && (
                                <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', background: '#dbeafe', color: '#1d4ed8', borderRadius: 3, padding: '2px 5px' }}>
                                  REVISED
                                </span>
                              )}
                            </div>
                            <div style={{ display: 'flex', gap: 4, alignItems: 'center', flexShrink: 0 }}>
                              {[1,2,3,4,5].map(n => (
                                <button
                                  key={n}
                                  onClick={() => rate(block.id, n)}
                                  title={RATING_LABEL[n]}
                                  style={{ width: 24, height: 24, borderRadius: 4, border: 'none', cursor: 'pointer', fontSize: 11, fontWeight: 700, background: r === n ? RATING_COLOR[n] : '#f0f0f0', color: r === n ? '#fff' : '#aaa', transition: 'all 0.1s' }}
                                >
                                  {n}
                                </button>
                              ))}
                              <button
                                onClick={() => openEdit(block)}
                                style={{ height: 24, padding: '0 9px', marginLeft: 4, borderRadius: 4, border: `1.5px solid ${isActive ? '#d4956a' : '#e0e0e0'}`, background: isActive ? '#d4956a' : '#fff', color: isActive ? '#fff' : '#888', cursor: 'pointer', fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', transition: 'all 0.15s' }}
                              >
                                EDIT ↗
                              </button>
                            </div>
                          </div>
                          {rev ? (
                            <div>
                              <p style={{ margin: '0 0 6px', fontSize: 13.5, lineHeight: 1.65, color: '#111' }}>{rev}</p>
                              <p style={{ margin: 0, fontSize: 12, lineHeight: 1.55, color: '#bbb', textDecoration: 'line-through' }}>{block.text}</p>
                            </div>
                          ) : (
                            <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.65, color: '#333' }}>{block.text}</p>
                          )}
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 7 }}>
                            {r ? (
                              <div style={{ fontSize: 11, fontWeight: 600, color: RATING_COLOR[r] }}>
                                {r === 5 ? '✓ ' : r === 1 ? '✗ ' : ''}{RATING_LABEL[r]}
                              </div>
                            ) : <span />}
                            {rev && (
                              <button
                                onClick={() => clearRevision(block.id)}
                                style={{ fontSize: 10, color: '#ccc', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
                              >
                                clear revision
                              </button>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
            )
          })}
        </div>

        {/* ── Right: editor ── */}
        <div style={s.sidebar}>
          <div style={s.sideInner}>
            <div style={{ padding: '14px 18px', borderBottom: '1px solid #f0f0f0', flexShrink: 0 }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#bbb' }}>Editing Area</div>
              {activeBlock && (
                <div style={{ fontSize: 12, color: '#888', marginTop: 3 }}>{activeBlock.label}</div>
              )}
            </div>

            {!activeBlock ? (
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32, textAlign: 'center' }}>
                <p style={{ color: '#ccc', fontSize: 13, lineHeight: 1.7, margin: 0 }}>
                  Click <b style={{ color: '#aaa' }}>EDIT ↗</b> on any block<br />to bring it here for refinement.
                </p>
              </div>
            ) : (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 18, gap: 14, overflow: 'hidden' }}>
                <div style={{ flexShrink: 0 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#ccc', marginBottom: 7 }}>Original</div>
                  <div style={{ fontSize: 12.5, lineHeight: 1.65, color: '#aaa', padding: '10px 12px', background: '#f8f8f8', borderRadius: 6, fontStyle: 'italic', maxHeight: 120, overflowY: 'auto' }}>
                    {activeBlock.text}
                  </div>
                </div>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#ccc', marginBottom: 7, flexShrink: 0 }}>Revised</div>
                  <textarea
                    value={editText}
                    onChange={e => setEditText(e.target.value)}
                    style={{ flex: 1, resize: 'none', border: '1.5px solid #e8e8e8', borderRadius: 6, padding: '10px 12px', fontSize: 13.5, lineHeight: 1.65, color: '#111', fontFamily: 'inherit', outline: 'none', minHeight: 100 }}
                  />
                </div>

                <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                  <button
                    onClick={saveRevision}
                    style={{ flex: 1, height: 36, borderRadius: 6, border: 'none', background: saved ? '#1d4ed8' : '#111', color: '#fff', cursor: 'pointer', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', transition: 'background 0.2s' }}
                  >
                    {saved ? '✓ SAVED' : 'SAVE REVISION'}
                  </button>
                  <button
                    onClick={copy}
                    style={{ height: 36, padding: '0 12px', borderRadius: 6, border: '1.5px solid #e8e8e8', background: copied ? '#22c55e' : '#fff', color: copied ? '#fff' : '#888', cursor: 'pointer', fontSize: 11, fontWeight: 700, transition: 'all 0.2s' }}
                    title="Copy to clipboard"
                  >
                    {copied ? '✓' : 'COPY'}
                  </button>
                  <button
                    onClick={() => setEditText(revisions[activeBlock.id] ?? activeBlock.text)}
                    style={{ height: 36, padding: '0 12px', borderRadius: 6, border: '1.5px solid #e8e8e8', background: '#fff', color: '#888', cursor: 'pointer', fontSize: 11, fontWeight: 700 }}
                    title="Reset to saved (or original)"
                  >
                    ↺
                  </button>
                  <button
                    onClick={() => { setActiveBlock(null); setEditText('') }}
                    style={{ height: 36, padding: '0 12px', borderRadius: 6, border: '1.5px solid #e8e8e8', background: '#fff', color: '#888', cursor: 'pointer', fontSize: 13 }}
                    title="Close"
                  >
                    ✕
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
