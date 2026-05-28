"use client";

import { useEffect, useRef, useState } from "react";

type Theme = "plain" | "light" | "dark";

const THEMES: { id: Theme; label: string }[] = [
  { id: "plain", label: "Plain" },
  { id: "light", label: "Gradient Light" },
  { id: "dark", label: "Gradient Dark" },
];

export default function ThemeToggle() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>(() =>
    typeof document !== "undefined"
      ? ((document.documentElement.dataset.theme as Theme) || "plain")
      : "plain",
  );
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;
    function onDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  function apply(next: Theme) {
    if (next === "plain") {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", next);
    }
    try {
      localStorage.setItem("rg-theme", next);
    } catch {}
    setTheme(next);
    setOpen(false);
  }

  return (
    <span className="theme-toggle" ref={ref}>
      <button
        type="button"
        className="theme-moon"
        aria-label="Change color theme"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        ☽
      </button>
      {open ? (
        <span className="theme-menu" role="menu">
          {THEMES.map((t) => (
            <button
              key={t.id}
              type="button"
              role="menuitemradio"
              aria-checked={theme === t.id}
              className={theme === t.id ? "theme-opt is-active" : "theme-opt"}
              onClick={() => apply(t.id)}
            >
              <span className={`theme-swatch ${t.id}`} aria-hidden="true" />
              {t.label}
            </button>
          ))}
        </span>
      ) : null}
    </span>
  );
}
