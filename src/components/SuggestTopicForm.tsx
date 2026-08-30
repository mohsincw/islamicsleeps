"use client";

import { useState } from "react";

export default function SuggestTopicForm() {
  const [text, setText] = useState("");
  const [sent, setSent] = useState(false);

  function submit() {
    if (!text.trim()) return;
    setSent(true);
    fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        storyRef: "topic-suggestion",
        kind: "suggestion",
        comment: text.trim().slice(0, 500),
      }),
    }).catch(() => {});
  }

  return (
    <div className="mt-12 bg-surface rounded-2xl p-6 sm:p-8 border border-border text-center">
      <h2 className="font-semibold text-foreground mb-1">
        Is your child asking a different WHY?
      </h2>
      {sent ? (
        <p className="text-muted text-sm mt-3">
          JazakAllah khair — we&apos;ll look into it, insha&apos;Allah 💜
        </p>
      ) : (
        <>
          <p className="text-sm text-muted mb-4">
            Tell us the question and we&apos;ll work on answering it with a story.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-xl mx-auto">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              maxLength={500}
              placeholder='e.g. "Why do we fast in Ramadan?"'
              className="flex-1 bg-background border border-border rounded-full px-4 py-2.5 text-sm text-foreground placeholder:text-muted/60 focus:outline-none focus:border-primary/40"
            />
            <button
              onClick={submit}
              className="px-6 py-2.5 rounded-full bg-primary text-white text-sm font-semibold hover:bg-primary-light transition-colors cursor-pointer"
            >
              Suggest
            </button>
          </div>
        </>
      )}
    </div>
  );
}
