"use client";

import { useState } from "react";
import type { AgeBucket, GeneratedStory } from "@/data/types";

interface ShareButtonProps {
  story: GeneratedStory;
  ageBucket: AgeBucket;
  topic?: string;
  childName?: string;
}

type ShareState =
  | { status: "idle" }
  | { status: "working" }
  | { status: "done"; url: string; copied: boolean }
  | { status: "error"; message: string };

export default function ShareButton({
  story,
  ageBucket,
  topic,
  childName,
}: ShareButtonProps) {
  const [state, setState] = useState<ShareState>({ status: "idle" });

  async function copy(url: string) {
    try {
      await navigator.clipboard.writeText(url);
      setState({ status: "done", url, copied: true });
    } catch {
      setState({ status: "done", url, copied: false });
    }
  }

  async function share() {
    // Re-clicks reuse the link we already have instead of re-inserting.
    if (state.status === "done") {
      await copy(state.url);
      return;
    }
    if (state.status === "working") return;
    setState({ status: "working" });
    try {
      const res = await fetch("/api/share", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...story, ageBucket, topic, childName }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.url) {
        setState({
          status: "error",
          message: data?.error ?? "Sharing isn't available right now.",
        });
        return;
      }
      const url = new URL(data.url, window.location.origin).toString();
      if (navigator.share) {
        try {
          await navigator.share({ title: story.title, url });
          setState({ status: "done", url, copied: false });
          return;
        } catch {
          // fall through to clipboard (user may have dismissed the sheet)
        }
      }
      await copy(url);
    } catch {
      setState({ status: "error", message: "Sharing isn't available right now." });
    }
  }

  return (
    <div className="flex flex-col items-start gap-2">
      <button
        onClick={share}
        disabled={state.status === "working"}
        className="flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 text-secondary px-4 py-2 text-sm font-semibold hover:bg-secondary/20 transition-colors cursor-pointer disabled:opacity-60"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
          />
        </svg>
        {state.status === "working"
          ? "Creating link…"
          : state.status === "done"
            ? state.copied
              ? "Link copied!"
              : "Share again"
            : "Share this story"}
      </button>
      {state.status === "done" && (
        <p className="text-xs text-muted break-all">
          {state.url} — send it to family so they can read it too 💜
        </p>
      )}
      {state.status === "error" && (
        <p className="text-xs text-muted">{state.message}</p>
      )}
    </div>
  );
}
