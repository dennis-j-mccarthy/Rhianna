import Link from "next/link";

type Props = {
  align?: "center" | "start";
};

export default function Logo({ align = "center" }: Props) {
  return (
    <Link
      href="/"
      className="logo"
      style={align === "start" ? { alignItems: "flex-start", borderBottom: "none" } : undefined}
    >
      <span className="logo-mark">
        <span className="crescent" />
        Rhianna Gray
      </span>
      <span className="logo-tag">Healer · Intuitive · Astrologer</span>
    </Link>
  );
}
