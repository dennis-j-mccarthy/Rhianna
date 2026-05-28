"use client";

import { useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { quickCreateArticle } from "@/app/admin/ai-actions";

type SpeechResultList = { length: number; [i: number]: { 0: { transcript: string } } };
type SpeechEvent = { results: SpeechResultList };
type SpeechErrorEvent = { error: string };
type Recognition = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: ((e: SpeechEvent) => void) | null;
  onend: (() => void) | null;
  onerror: ((e: SpeechErrorEvent) => void) | null;
};
type RecognitionCtor = new () => Recognition;

function getRecognitionCtor(): RecognitionCtor | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as {
    SpeechRecognition?: RecognitionCtor;
    webkitSpeechRecognition?: RecognitionCtor;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

function DraftButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn" disabled={pending}>
      {pending ? "Drafting…" : "Draft article"}
    </button>
  );
}

export default function QuickCreate() {
  const [open, setOpen] = useState(false);
  const [idea, setIdea] = useState("");
  const [recording, setRecording] = useState(false);
  const [speechError, setSpeechError] = useState<string | null>(null);
  const [supported] = useState(() => getRecognitionCtor() !== null);

  const recRef = useRef<Recognition | null>(null);
  const activeRef = useRef(false);
  const baseRef = useRef("");
  const ideaRef = useRef("");

  // Close on Escape while the modal is open.
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function stopRecognition() {
    activeRef.current = false;
    try {
      recRef.current?.abort();
    } catch {}
    setRecording(false);
  }

  function begin() {
    const Ctor = getRecognitionCtor();
    if (!Ctor) return;
    const rec = new Ctor();
    rec.lang = "en-US";
    rec.continuous = true;
    rec.interimResults = true;
    rec.onresult = (e) => {
      let spoken = "";
      for (let i = 0; i < e.results.length; i++) spoken += e.results[i][0].transcript;
      const full = (baseRef.current ? baseRef.current + " " : "") + spoken;
      ideaRef.current = full;
      setIdea(full);
    };
    rec.onerror = (e) => {
      if (e.error === "not-allowed" || e.error === "service-not-allowed") {
        activeRef.current = false;
        setRecording(false);
        setSpeechError("Microphone access is blocked — allow it in your browser, or just type your idea.");
      }
    };
    rec.onend = () => {
      // Browsers (esp. Safari/Chrome on macOS) stop recognition after short pauses.
      // While the user still wants to record, fold the transcript into the base and restart.
      if (activeRef.current) {
        baseRef.current = ideaRef.current.trim();
        try {
          rec.start();
        } catch {
          setTimeout(() => {
            if (activeRef.current) begin();
          }, 250);
        }
      } else {
        setRecording(false);
      }
    };
    recRef.current = rec;
    try {
      rec.start();
    } catch {}
  }

  function toggleMic() {
    setSpeechError(null);
    if (recording) {
      stopRecognition();
      return;
    }
    if (!getRecognitionCtor()) return;
    baseRef.current = idea.trim();
    activeRef.current = true;
    setRecording(true);
    begin();
  }

  function close() {
    stopRecognition();
    setOpen(false);
  }

  return (
    <>
      <button type="button" className="btn ghost" onClick={() => setOpen(true)}>
        Dictate
      </button>

      {open ? (
        <div className="modal-overlay" onClick={close}>
          <div
            className="modal-card"
            role="dialog"
            aria-modal="true"
            aria-label="Dictate your article"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-head">
              <span className="ai-badge">AI</span>
              <strong>Dictate your article</strong>
            </div>
            <p className="admin-hint">
              Speak your article idea and a working title. Claude drafts a full first article in
              your saved writing voice, then opens it for editing.
            </p>

            <form action={quickCreateArticle} className="modal-form">
              <textarea
                name="idea"
                rows={5}
                required
                autoFocus
                value={idea}
                onChange={(e) => {
                  ideaRef.current = e.target.value;
                  setIdea(e.target.value);
                }}
                placeholder="e.g. Title: Mercury retrograde. Cover why it is misunderstood and the inward turn it really invites…"
              />
              {speechError ? <p className="admin-error">{speechError}</p> : null}
              {!supported ? (
                <p className="admin-hint">
                  Speech input is not available in this browser — type your idea above.
                </p>
              ) : null}

              <div className="modal-actions">
                {supported ? (
                  <button
                    type="button"
                    className={recording ? "btn clay mic-on" : "btn ghost"}
                    onClick={toggleMic}
                  >
                    {recording ? "● Stop" : "Speak"}
                  </button>
                ) : (
                  <span />
                )}
                <div className="modal-actions-right">
                  <button type="button" className="btn ghost" onClick={close}>
                    Cancel
                  </button>
                  <DraftButton />
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
