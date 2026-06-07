import Link from "next/link";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

type NavKey = "home" | "astrology" | "animal" | "healing" | "notebook" | "contact";

const left: { key: NavKey; href: string; label: string }[] = [
  { key: "home", href: "/", label: "Home" },
  { key: "healing", href: "/quanta-freedom-healing", label: "Healing" },
  { key: "astrology", href: "/astrology", label: "Astrology" },
  { key: "animal", href: "/animal-communication", label: "Animal" },
];

const right: { key: NavKey; href: string; label: string }[] = [
  { key: "notebook", href: "/notebook", label: "Notebook" },
  { key: "contact", href: "/contact", label: "Contact" },
];

export default function SiteHeader({ active }: { active?: NavKey }) {
  return (
    <header className="site-header">
      <div className="wrap">
        <nav className="site-nav left">
          {left.map((l) => (
            <Link key={l.key} href={l.href} className={active === l.key ? "active" : undefined}>
              {l.label}
            </Link>
          ))}
        </nav>
        <Logo />
        <nav className="site-nav right">
          {right.map((l) => (
            <Link key={l.key} href={l.href} className={active === l.key ? "active" : undefined}>
              {l.label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
