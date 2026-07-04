"use client";

import { useState } from "react";

const TO = "rhianna@rhiannagray.com";

export default function NewsletterForm() {
  const [sent, setSent] = useState(false);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const input = e.currentTarget.querySelector("input") as HTMLInputElement;
        const email = input.value.trim();
        if (!email) return;
        const subject = "Newsletter signup";
        const body = `Please add me to your newsletter:\n${email}\n`;
        window.location.href =
          `mailto:${TO}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        setSent(true);
      }}
    >
      <input type="email" placeholder="your email address" required />
      <button type="submit">{sent ? "Check your email app ✦" : "Subscribe"}</button>
    </form>
  );
}
