"use client";

import { useActionState } from "react";
import { submitContact, type ContactState } from "@/app/contact/actions";

export default function ContactForm() {
  const [state, formAction, pending] = useActionState<ContactState, FormData>(
    submitContact,
    null,
  );

  if (state?.ok) {
    return (
      <div className="contact-form" role="status" aria-live="polite">
        <p className="note" style={{ fontSize: 16 }}>
          Thank you — your note is on its way to Rhianna. She’ll be in touch soon.
        </p>
      </div>
    );
  }

  return (
    <form className="contact-form" action={formAction}>
      <div className="row">
        <div>
          <label htmlFor="name">Your Name</label>
          <input id="name" name="name" type="text" required />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required />
        </div>
      </div>
      <div className="field">
        <label htmlFor="service">I&apos;m Interested In</label>
        <select id="service" name="service" defaultValue="Astrological Reading">
          <option>Astrological Reading</option>
          <option>Animal Communication</option>
          <option>Quanta Freedom Healing™</option>
          <option>I&apos;m not sure yet — let&apos;s talk</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="message">What is calling for support?</label>
        <textarea
          id="message"
          name="message"
          placeholder="A few sentences is plenty. The more honest, the better I can meet you."
          required
        />
      </div>
      {state?.error ? (
        <p className="note" role="alert" style={{ color: "crimson" }}>
          {state.error}
        </p>
      ) : null}
      <div className="submit-row">
        <p className="note">
          {pending ? "Sending…" : "Sends straight to Rhianna’s inbox."}
        </p>
        <button type="submit" disabled={pending}>
          {pending ? "Sending…" : "Send Note →"}
        </button>
      </div>
    </form>
  );
}
