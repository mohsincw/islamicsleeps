"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createLocalStore, useLocalStore } from "@/lib/localStore";

export type SpeechStatus = "idle" | "speaking" | "paused" | "unsupported";

interface TtsPrefs {
  rate: number;
  voiceURI: string | null;
}

const prefsStore = createLocalStore<TtsPrefs>("islamicsleeps-tts", {
  rate: 0.9,
  voiceURI: null,
});

const MIN_CHUNK = 25;
const MAX_CHUNK = 220;

/**
 * Split story text into paragraphs of speakable sentence chunks. One
 * utterance per chunk sidesteps Chrome's ~15s cutoff on long utterances and
 * gives us reliable sentence-level highlighting without the flaky
 * onboundary event. Paragraph grouping is preserved for rendering.
 */
export function chunkStory(text: string): string[][] {
  const paragraphs: string[][] = [];
  for (const paragraph of text.split(/\n+/)) {
    const trimmed = paragraph.trim();
    if (!trimmed) continue;
    const chunks: string[] = [];
    for (const raw of trimmed.split(/(?<=[.!?…])(?=\s)/)) {
      const sentence = raw.trim();
      if (!sentence) continue;
      if (chunks.length > 0 && sentence.length < MIN_CHUNK) {
        chunks[chunks.length - 1] += " " + sentence;
        continue;
      }
      if (sentence.length <= MAX_CHUNK) {
        chunks.push(sentence);
        continue;
      }
      // Very long sentence: split at commas/spaces near the limit.
      let rest = sentence;
      while (rest.length > MAX_CHUNK) {
        const window = rest.slice(0, MAX_CHUNK);
        let cut = window.lastIndexOf(", ");
        if (cut < MIN_CHUNK) cut = window.lastIndexOf(" ");
        if (cut < MIN_CHUNK) cut = MAX_CHUNK;
        chunks.push(rest.slice(0, cut + 1).trim());
        rest = rest.slice(cut + 1).trim();
      }
      if (rest) chunks.push(rest);
    }
    if (chunks.length > 0) paragraphs.push(chunks);
  }
  return paragraphs;
}

export function useReadAloud(text: string) {
  const supported =
    typeof window !== "undefined" && "speechSynthesis" in window;

  const paragraphs = useMemo(() => chunkStory(text), [text]);
  const sentences = useMemo(() => paragraphs.flat(), [paragraphs]);
  const prefs = useLocalStore(prefsStore);

  const [status, setStatus] = useState<SpeechStatus>("idle");
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  // Incremented on every play()/stop() so onend callbacks from a cancelled
  // run can't advance the new one.
  const sessionRef = useRef(0);
  // Chrome garbage-collects utterances that aren't referenced, which silently
  // kills their onend callback — keep the live one pinned here.
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const keepAliveRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!supported) return;
    const load = () => {
      const en = window.speechSynthesis
        .getVoices()
        .filter((v) => v.lang.toLowerCase().startsWith("en"));
      setVoices(en);
    };
    load();
    window.speechSynthesis.addEventListener("voiceschanged", load);
    return () =>
      window.speechSynthesis.removeEventListener("voiceschanged", load);
  }, [supported]);

  const clearKeepAlive = () => {
    if (keepAliveRef.current) {
      clearInterval(keepAliveRef.current);
      keepAliveRef.current = null;
    }
  };

  const stop = useCallback(() => {
    sessionRef.current += 1;
    clearKeepAlive();
    if (supported) window.speechSynthesis.cancel();
    utteranceRef.current = null;
    setStatus("idle");
    setCurrentIndex(-1);
  }, [supported]);

  // Cancel speech when the component unmounts or the text changes.
  useEffect(() => stop, [stop, sentences]);

  /** Must be called synchronously from a user gesture (iOS Safari). */
  const play = useCallback(() => {
    if (!supported || sentences.length === 0) return;
    sessionRef.current += 1;
    const session = sessionRef.current;

    const speakFrom = (index: number) => {
      if (session !== sessionRef.current) return;
      if (index >= sentences.length) {
        clearKeepAlive();
        utteranceRef.current = null;
        setStatus("idle");
        setCurrentIndex(-1);
        return;
      }
      const { rate, voiceURI } = prefsStore.getSnapshot();
      const utterance = new SpeechSynthesisUtterance(sentences[index]);
      utterance.rate = rate;
      const voice = window.speechSynthesis
        .getVoices()
        .find((v) => v.voiceURI === voiceURI);
      if (voice) utterance.voice = voice;
      utterance.onend = () => speakFrom(index + 1);
      utterance.onerror = () => {
        if (session === sessionRef.current) {
          clearKeepAlive();
          setStatus("idle");
          setCurrentIndex(-1);
        }
      };
      utteranceRef.current = utterance;
      setCurrentIndex(index);
      window.speechSynthesis.speak(utterance);
    };

    window.speechSynthesis.cancel();
    setStatus("speaking");
    speakFrom(0);
    clearKeepAlive();
    // Chrome pauses long speech sessions when idle; nudging resume() is a
    // harmless keep-alive on top of per-sentence chunking.
    keepAliveRef.current = setInterval(() => {
      if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
    }, 10000);
  }, [supported, sentences]);

  const pause = useCallback(() => {
    if (!supported) return;
    window.speechSynthesis.pause();
    setStatus("paused");
  }, [supported]);

  const resume = useCallback(() => {
    if (!supported) return;
    window.speechSynthesis.resume();
    setStatus("speaking");
  }, [supported]);

  const setRate = useCallback((rate: number) => {
    prefsStore.set((p) => ({ ...p, rate }));
  }, []);

  const setVoiceURI = useCallback((voiceURI: string) => {
    prefsStore.set((p) => ({ ...p, voiceURI }));
  }, []);

  return {
    status: supported ? status : ("unsupported" as const),
    paragraphs,
    sentences,
    currentIndex,
    play,
    pause,
    resume,
    stop,
    rate: prefs.rate,
    setRate,
    voices,
    voiceURI: prefs.voiceURI,
    setVoiceURI,
  };
}
