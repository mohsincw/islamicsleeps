"use client";

import { useEffect, useMemo, useRef } from "react";
import { useReadAloud } from "@/hooks/useReadAloud";
import { useHydrated } from "@/lib/localStore";

interface StoryReaderProps {
  text: string;
  /** When false, renders only the read-aloud controls (e.g. favorites list). */
  showText?: boolean;
}

function PlayIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8 5.14v13.72c0 .8.87 1.3 1.56.88l10.9-6.86a1.03 1.03 0 0 0 0-1.76L9.56 4.26A1.03 1.03 0 0 0 8 5.14Z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <rect x="6" y="5" width="4" height="14" rx="1" />
      <rect x="14" y="5" width="4" height="14" rx="1" />
    </svg>
  );
}

function StopIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <rect x="6" y="6" width="12" height="12" rx="2" />
    </svg>
  );
}

export default function StoryReader({ text, showText = true }: StoryReaderProps) {
  const {
    status,
    paragraphs,
    currentIndex,
    play,
    pause,
    resume,
    stop,
    rate,
    setRate,
    voices,
    voiceURI,
    setVoiceURI,
  } = useReadAloud(text);
  const hydrated = useHydrated();
  const activeRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (currentIndex >= 0) {
      activeRef.current?.scrollIntoView({ block: "center", behavior: "smooth" });
    }
  }, [currentIndex]);

  const supported = hydrated && status !== "unsupported";
  const playing = status === "speaking";
  const paused = status === "paused";

  // Global sentence index of each paragraph's first sentence.
  const paragraphOffsets = useMemo(() => {
    const offsets: number[] = [];
    let acc = 0;
    for (const p of paragraphs) {
      offsets.push(acc);
      acc += p.length;
    }
    return offsets;
  }, [paragraphs]);

  return (
    <div>
      {supported && (
        <div className="flex flex-wrap items-center gap-x-4 gap-y-3 bg-surface border border-border rounded-2xl px-4 py-3 mb-6">
          <div className="flex items-center gap-2">
            <button
              onClick={playing ? pause : paused ? resume : play}
              aria-label={playing ? "Pause reading" : "Read aloud"}
              className="flex items-center gap-2 bg-primary text-white rounded-full px-4 py-2 text-sm font-bold hover:bg-primary-dark transition-colors cursor-pointer"
            >
              {playing ? <PauseIcon /> : <PlayIcon />}
              <span>{playing ? "Pause" : paused ? "Resume" : "Read aloud"}</span>
            </button>
            {(playing || paused) && (
              <button
                onClick={stop}
                aria-label="Stop reading"
                className="flex items-center gap-1.5 text-muted hover:text-foreground border border-border rounded-full px-3 py-2 text-sm font-semibold transition-colors cursor-pointer"
              >
                <StopIcon />
                <span>Stop</span>
              </button>
            )}
          </div>

          <label className="flex items-center gap-2 text-xs text-muted font-semibold">
            <span>Calm</span>
            <input
              type="range"
              min={0.6}
              max={1.2}
              step={0.05}
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-24 accent-primary"
              aria-label="Reading speed"
            />
            <span>Lively</span>
          </label>

          {voices.length > 0 && (
            <select
              value={voiceURI ?? ""}
              onChange={(e) => setVoiceURI(e.target.value)}
              aria-label="Voice"
              className="text-xs bg-background border border-border rounded-full px-3 py-2 text-foreground max-w-40 truncate"
            >
              <option value="">Default voice</option>
              {voices.map((v) => (
                <option key={v.voiceURI} value={v.voiceURI}>
                  {v.name}
                </option>
              ))}
            </select>
          )}
        </div>
      )}

      {showText && (
        <div className="story-text">
          {paragraphs.map((sentencesInParagraph, p) => (
            <p key={p}>
              {sentencesInParagraph.map((sentence, i) => {
                const sentenceIndex = paragraphOffsets[p] + i;
                const active = sentenceIndex === currentIndex;
                return (
                  <span
                    key={sentenceIndex}
                    ref={active ? activeRef : undefined}
                    className={active ? "tts-highlight" : undefined}
                  >
                    {sentence}{" "}
                  </span>
                );
              })}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
