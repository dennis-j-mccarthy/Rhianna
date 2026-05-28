"use client";

import { useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { quickCreateArticle } from "@/app/admin/ai-actions";

type SpeechResultList = { length: number; [i: number]: { 0: { transcript: string } } };
type SpeechEvent = { results: SpeechResultList };
type Recognition = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start(): void;
  stop(): void;
  onresult: ((e: SpeechEvent) => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
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

function CreateButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn" disabled={pending}>
      {pending ? "Drafting…" : "Create draft"}
    </button>
  );
}

export default function QuickCreate() {
  const [open, setOpen] = useState(false);
  const [idea, setIdea] = useState("");
  const [recording, setRecording] = useState(false);
  const [supported] = useState(() => getRecognitionCtor() !== null);
  const recRef = useRef<Recognition | null>(null);
  const baseRef = useRef("");

  function toggleMic() {
    if (recording) {
      recRef.current?.stop();
      return;
    }
    const Ctor = getRecognitionCtor();
    if (!Ctor) return;
    const rec = new Ctor();
    rec.lang = "en-US";
    rec.continuous = true;
    rec.interimResults = true;
    baseRef.current = idea.trim();
    rec.onresult = (e) => {
      let spoken = "";
      for (let i = 0; i < e.results.length; i++) spoken += e.results[i][0].transcript;
      setIdea((baseRef.current ? baseRef.current + " " : "") + spoken);
    };
    rec.onend = () => setRecording(false);
    rec.onerror = () => setRecording(false);
    recRef.current = rec;
    rec.start();
    setRecording(true);
  }

  if (!open) {
    return (
      <button type="button" className="btn ghost" onClick={() => setOpen(true)}>
        Quick create
      </button>
    );
  }

  return (
    <div className="quick-create">
      <div className="quick-create-head">
        <span className="ai-badge">AI</span>
        <strong>Quick create</strong>
        <button
          type="button"
          className="admin-bar-link admin-linkbtn quick-create-close"
          onClick={() => setOpen(false)}
        >
          Close
        </button>
      </div>
      <p className="admin-hint">
        {supported
          ? "Tap Speak and say your title and idea (or type it). Claude drafts a full article in your voice that you can edit before publishing."
          : "Speech input isn't available in this browser — type your idea and Claude will draft it."}
      </p>
      <form action={quickCreateArticle} className="quick-create-form">
        <textarea
          name="idea"
          rows={4}
          required
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          placeholder="e.g. Title: Mercury retrograde. Write about why it's misunderstood and the inward turn it really invites…"
        />
        <div className="quick-create-actions">
          {supported ? (
            <button
              type="button"
              className={recording ? "btn clay" : "btn ghost"}
              onClick={toggleMic}
            >
              {recording ? "Stop recording" : "Speak"}
            </button>
          ) : null}
          <CreateButton />
        </div>
      </form>
    </div>
  );
}
