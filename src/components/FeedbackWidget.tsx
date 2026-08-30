"use client";

import { useState } from "react";
import { createLocalStore, useLocalStore } from "@/lib/localStore";

// Remembers which stories this device has already rated.
const votedStore = createLocalStore<Record<string, string>>(
  "islamicsleeps-feedback",
  {}
);

export default function FeedbackWidget({ storyRef }: { storyRef: string }) {
  const voted = useLocalStore(votedStore);
  const [pendingDown, setPendingDown] = useState(false);
  const [comment, setComment] = useState("");

  const existingVote = voted[storyRef];

  function send(kind: "up" | "down", text?: string) {
    votedStore.set((v) => ({ ...v, [storyRef]: kind }));
    setPendingDown(false);
    // Fire and forget — feedback must never get in the way of bedtime.
    fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ storyRef, kind, comment: text || undefined }),
    }).catch(() => {});
  }

  if (existingVote) {
    return (
      <p className="text-sm text-muted">
        JazakAllah khair for your feedback 💜
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted">Was this story good?</span>
        <button
          onClick={() => send("up")}
          aria-label="Yes, it was good"
          className="p-2 rounded-full bg-surface-hover hover:bg-secondary/20 transition-colors cursor-pointer"
        >
          👍
        </button>
        <button
          onClick={() => setPendingDown(true)}
          aria-label="It could be better"
          className="p-2 rounded-full bg-surface-hover hover:bg-border transition-colors cursor-pointer"
        >
          👎
        </button>
      </div>
      {pendingDown && (
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            maxLength={500}
            placeholder="What could be better? (optional)"
            className="flex-1 bg-surface border border-border rounded-full px-4 py-2 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-primary/40"
          />
          <button
            onClick={() => send("down", comment)}
            className="px-4 py-2 rounded-full bg-primary text-white text-sm font-semibold hover:bg-primary-light transition-colors cursor-pointer"
          >
            Send
          </button>
        </div>
      )}
    </div>
  );
}
