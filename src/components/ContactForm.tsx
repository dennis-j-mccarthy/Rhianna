"use client";

export default function ContactForm() {
  return (
    <form
      className="contact-form"
      onSubmit={(e) => {
        e.preventDefault();
        alert("Thank you. Rhianna will reply within a few days.");
        (e.currentTarget as HTMLFormElement).reset();
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
        <p className="note">Everything you write stays between us.</p>
        <button type="submit">Send Note →</button>
      </div>
    </form>
  );
}
