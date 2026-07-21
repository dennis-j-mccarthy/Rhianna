"use server";

import { Resend } from "resend";

export type ContactState = { ok: boolean; error?: string } | null;

// Recipient + sender are env-overridable so we can switch inboxes without a code change.
// During launch testing this points at Dennis; flip CONTACT_TO to rhianna@rhiannagray.com when ready.
const TO = process.env.CONTACT_TO || "dennisjmccarthy@gmail.com";
const FROM = process.env.CONTACT_FROM || "Rhianna Gray <onboarding@resend.dev>";

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const service = String(formData.get("service") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    return { ok: false, error: "Please add your name, email, and a short message." };
  }
  if (!process.env.RESEND_API_KEY) {
    return { ok: false, error: "The form isn’t connected yet — please email directly for now." };
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const subject = `New inquiry — ${service || "General"}`;
  const text =
    `Name: ${name}\n` +
    `Email: ${email}\n` +
    `Interested in: ${service || "—"}\n\n` +
    `${message}\n`;

  try {
    const { error } = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email,
      subject,
      text,
    });
    if (error) {
      return { ok: false, error: "Something went wrong sending your note. Please try again." };
    }
    return { ok: true };
  } catch {
    return { ok: false, error: "Something went wrong sending your note. Please try again." };
  }
}
