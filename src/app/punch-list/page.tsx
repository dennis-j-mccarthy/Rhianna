import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Divider from "@/components/Divider";
import PunchList from "@/components/PunchList";

export const metadata = {
  title: "Punch List — Rhianna Gray",
  description: "Outstanding items to complete before launch.",
};

export default function PunchListPage() {
  return (
    <>
      <SiteHeader />

      <section className="contact-hero">
        <div className="wrap-narrow">
          <span className="eyebrow">Build &amp; Launch</span>
          <h1>
            Punch <em>list.</em>
          </h1>
          <p className="tagline">
            Everything still open before the site is ready. Check items off as we finish —
            your progress is saved in this browser.
          </p>
        </div>
      </section>

      <Divider />

      <section className="punch-section">
        <div className="wrap-narrow">
          <PunchList />
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
