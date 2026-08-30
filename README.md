# 🌙 IslamicSleeps

**Free Islamic bedtime stories for Muslim families** — built as a sadaqah jariyah, not for profit.

Kids always ask **WHY**. Why should I pray? Why must I be good? Why do we say Alhamdulillah? IslamicSleeps answers those questions the gentle way — with warm bedtime stories, each one carrying not just a moral but a "But WHY?" section that explains what it means, why Allah asks it of us, and what it looks like in a child's own life.

## Features

- **📚 Story library** — hand-crafted stories organised by 12 moral topics, filterable by age (2–4, 5–8, 9–12)
- **🤔 The big WHY questions** — every topic is phrased the way kids ask it ("Why should I pray namaaz?"), with a kid-friendly answer and stories to match
- **🔊 Read aloud or read yourself** — free browser text-to-speech with a calm bedtime pace, sentence-by-sentence highlighting, adjustable speed, and voice choice (works offline, costs nothing)
- **✨ Personalised story generator** — pick the topic, your child's name, age, and gender; get a brand-new story with the moral and WHY section included (Groq / llama-3.3-70b)
- **🔗 Shareable stories** — generated stories get a share link (`/s/abc…`) to send to family; each shared page invites the reader to create their own (Supabase-backed)
- **💜 Talk about it tonight** — parent discussion questions with every story
- **🙌 Daily duas** — Arabic, transliteration, translation, and references
- **❤️ Favorites & child profile** — stored on-device (localStorage), no accounts needed
- **📲 Installable PWA** — web app manifest + icons; parents can Add to Home Screen on iOS and Android
- **🌗 Dark mode** — flash-free, follows system preference

## Content & scholar review

All story content currently **pending review by scholars**. Quran/hadith citations deliberately stick to well-known references. The stories live in the repo (`src/data/stories/`, one file per topic) precisely so reviewers can read and correct them via normal pull requests.

## Running locally

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev
```

Environment variables (all optional — features degrade gracefully without them):

| Variable | Purpose |
| --- | --- |
| `GROQ_API_KEY` | AI story generation. Free key from [console.groq.com](https://console.groq.com). Without it the generator shows a friendly notice. |
| `SUPABASE_URL` / `SUPABASE_ANON_KEY` | Shareable story links + feedback. Server-only (never exposed to the browser). Without them, sharing/feedback quietly hide. |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for metadata (defaults to the Vercel production URL). |

## Supabase schema

One migration (see the project's migration history): `shared_stories` and `feedback` tables, RLS enabled with **insert-only** anon policies. Public reads of shared stories happen exclusively through the `get_shared_story(short_id)` security-definer function, so stories can only be fetched by their exact 12-character link id — never listed.

## Stack

Next.js 16 (App Router) · React 19 · Tailwind CSS v4 · Supabase · Groq · Vercel

## Roadmap (v1.1+)

- Offline reading via a service worker (stories cached for airplane-mode bedtimes)
- Install-wizard UI for Add to Home Screen (in progress — Ash)
- Recorded human narration / higher-quality voices
- Urdu and Arabic translations
- Dynamic Open Graph images per story
- Scholar review workflow + reviewed-content badge
