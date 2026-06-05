"use client";

import { useEffect, useState } from "react";

type Item = { id: string; label: string };

const ITEMS: Item[] = [
  { id: "more-photos", label: "More photos" },
  { id: "staged-zoom-photo", label: "Staged photo of a Zoom call" },
  { id: "home-text", label: "Work together on completion of home page text" },
  { id: "astrology-animation", label: "Add cool animation to top of astrology page" },
  { id: "astrology-text-signoff", label: "Work together on signoff of text on astrology page" },
  { id: "astrology-interactive", label: "Consider an interactive element for astrology page" },
  { id: "healing-position", label: "Move healing page to position 2" },
  { id: "healing-image", label: "Add a nice image to top of healing page" },
  { id: "healing-text", label: "Work together on completion of healing page text" },
  { id: "pricing-model", label: "Develop and add the pricing model and attach to payment?" },
  { id: "starter-articles", label: "Agree on 12 starter articles for notebook page" },
  { id: "admin-tools", label: "Complete admin tools for creating blogs and newsletters (about 85% now)" },
  { id: "write-and-images", label: "Write these and get images to match (we can use AI for the writing)" },
  { id: "contact-page", label: "Complete the contact page" },
  { id: "newsletter-capture", label: "Add a newsletter capture" },
];

const STORAGE_KEY = "rg-punch-list";

export default function PunchList() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setChecked(JSON.parse(raw));
    } catch {}
    setLoaded(true);
  }, []);

  function toggle(id: string) {
    setChecked((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  }

  const done = ITEMS.filter((i) => checked[i.id]).length;

  return (
    <div className="punch-list">
      <p className="punch-progress" aria-live="polite">
        {loaded ? `${done} of ${ITEMS.length} complete` : " "}
      </p>
      <ul>
        {ITEMS.map((item) => {
          const isDone = !!checked[item.id];
          return (
            <li key={item.id} className={isDone ? "is-done" : undefined}>
              <label>
                <input
                  type="checkbox"
                  checked={isDone}
                  onChange={() => toggle(item.id)}
                />
                <span className="box" aria-hidden="true" />
                <span className="text">{item.label}</span>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
