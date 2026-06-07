import Link from "next/link";

type Props = {
  align?: "center" | "start";
  showTag?: boolean;
};

export default function Logo({ align = "center", showTag = false }: Props) {
  return (
    <Link
      href="/"
      className="logo"
      style={align === "start" ? { alignItems: "flex-start", borderBottom: "none" } : undefined}
    >
      <span className="logo-mark">
        Rhianna Gray
      </span>
      {showTag && <span className="logo-tag">Healer · Intuitive · Astrologer</span>}
    </Link>
  );
}
