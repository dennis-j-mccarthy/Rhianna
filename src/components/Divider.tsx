import ThemeToggle from "@/components/ThemeToggle";

export default function Divider() {
  return (
    <div className="divider">
      <span className="glyph">
        ✦ &nbsp; <ThemeToggle /> &nbsp; ✦
      </span>
    </div>
  );
}
