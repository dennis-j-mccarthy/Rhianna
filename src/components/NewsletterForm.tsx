"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [subscribed, setSubscribed] = useState(false);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubscribed(true);
        (e.currentTarget.querySelector("input") as HTMLInputElement).value = "";
      }}
    >
      <input type="email" placeholder="your email address" required />
      <button type="submit">{subscribed ? "Subscribed ✦" : "Subscribe"}</button>
    </form>
  );
}
