import { getSetting, WRITING_VOICE_KEY } from "@/lib/settings";
import { saveWritingVoice } from "@/app/admin/settings-actions";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const voice = (await getSetting(WRITING_VOICE_KEY)) ?? "";

  return (
    <section className="admin-page">
      <div className="admin-page-head">
        <h1>Settings</h1>
      </div>

      <form action={saveWritingVoice} className="admin-form">
        <div className="field">
          <label htmlFor="voice">Writing voice</label>
          <p className="admin-hint">
            Paste a paragraph or two of Rhianna&apos;s existing writing. The &ldquo;Draft with
            AI&rdquo; tool studies this sample and matches its tone for every article it drafts.
          </p>
          <textarea
            id="voice"
            name="voice"
            rows={12}
            defaultValue={voice}
            placeholder="Paste a representative sample of the author's writing here…"
          />
        </div>
        <div className="admin-form-actions">
          <button type="submit" className="btn">
            Save voice
          </button>
        </div>
      </form>
    </section>
  );
}
