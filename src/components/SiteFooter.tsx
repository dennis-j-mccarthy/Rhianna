import Link from "next/link";
import Logo from "./Logo";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div>
          <Logo align="start" />
          <p style={{ marginTop: 24, color: "rgba(245,239,228,.6)", maxWidth: "32ch" }}>
            Twenty-five years of intuitive guidance, evolutionary astrology, and Quanta Freedom
            Healing™. Boulder, Colorado &amp; worldwide.
          </p>
        </div>
        <div>
          <h4>Services</h4>
          <ul>
            <li>
              <Link href="/astrology">Astrological Readings</Link>
            </li>
            <li>
              <Link href="/animal-communication">Animal Communication</Link>
            </li>
            <li>
              <Link href="/quanta-freedom-healing">Quanta Freedom Healing</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4>Read &amp; Connect</h4>
          <ul>
            <li>
              <Link href="/threshold">Threshold (Journal)</Link>
            </li>
            <li>
              <Link href="/contact">Contact &amp; Booking</Link>
            </li>
            <li>
              <Link href="/threshold">Newsletter</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4>Reach Out</h4>
          <ul>
            <li>
              <a href="mailto:Rhianna@rhiannagray.com">Rhianna@rhiannagray.com</a>
            </li>
            <li>Boulder, Colorado · USA</li>
            <li>Sessions worldwide via Zoom</li>
          </ul>
        </div>
        <div className="colophon">
          <span>© 2026 Rhianna Gray</span>
          <span>Certified QFH™ Practitioner · Forrest Center for Evolutionary Astrology</span>
        </div>
      </div>
    </footer>
  );
}
