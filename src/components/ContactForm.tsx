"use client";

const TO = "dennisjmccarthy@gmail.com";

export default function ContactForm() {
  return (
    <form
      className="contact-form"
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;
        const name = (form.elements.namedItem("name") as HTMLInputElement).value.trim();
        const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();
        const service = (form.elements.namedItem("service") as HTMLSelectElement).value;
        const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value.trim();

        const subject = `New inquiry — ${service}`;
        const body =
          `Name: ${name}\n` +
          `Email: ${email}\n` +
          `Interested in: ${service}\n\n` +
          `${message}\n`;

        window.location.href =
          `mailto:${TO}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      }}
    >
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
      <div className="submit-row">
        <p className="note">Opens your email app, addressed to Rhianna.</p>
        <button type="submit">Send Note →</button>
      </div>
    </form>
  );
}
