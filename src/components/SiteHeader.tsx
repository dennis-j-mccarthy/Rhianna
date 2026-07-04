import Link from "next/link";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

type NavKey = "home" | "astrology" | "animal" | "healing" | "notebook" | "contact";

const navItems: { key: NavKey; href: string; label: string }[] = [
  { key: "healing", href: "/quanta-freedom-healing", label: "Quanta Freedom Healing™" },
  { key: "astrology", href: "/astrology", label: "Astrology" },
  { key: "animal", href: "/animal-communication", label: "Animal" },
  { key: "notebook", href: "/notebook", label: "Notebook" },
  { key: "contact", href: "/contact", label: "Contact" },
];

function HouseIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-9.5z" />
      <path d="M9 21V13h6v8" />
    </svg>
  );
}

export default function SiteHeader({ active }: { active?: NavKey }) {
  return (
    <header className="site-header">
      <div className="wrap">
        <Logo />
        <nav className="site-nav">
          <Link href="/" className={`nav-icon${active === "home" ? " active" : ""}`} aria-label="Home">
            <HouseIcon />
          </Link>
          {navItems.map((item) => (
            <Link key={item.key} href={item.href} className={active === item.key ? "active" : undefined}>
              {item.label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
