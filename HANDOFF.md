# IslamicSleeps — Handoff Brief

**Claude: this file is your instructions.** Read it end to end, then carry out
"Your task" below. Work autonomously — don't stop to confirm each step.

You are working in a clone of **`Zorpal/islamicsleeps`** (private, you have push access).

---

## Your task

A complete v1 rebuild of this app is finished and pushed, but it lives in a **different repo**
from the one Vercel builds. Get it onto this repo's `main` so the live site serves it.

### 1. Orient yourself

```bash
git log --oneline -5 && git branch -a && git status
cat AGENTS.md
```

`AGENTS.md` requires you to read the relevant guides in `node_modules/next/dist/docs/`
**before writing any Next.js code** (after `npm install`). This is Next 16 — do not assume
your training-data conventions hold. See "Gotchas" below for the ones that bite.

### 2. Pull down the work

`mohsincw/islamicsleeps` is **public**, so the session git proxy serves it with nothing to attach:

```bash
git remote add upstream https://github.com/mohsincw/islamicsleeps.git
git fetch upstream claude/islamic-bedtime-stories-dk2gso
```

If the fetch fails on network/auth, retry a few times with backoff before concluding it's blocked.

### 3. Get the work onto a branch

The histories are **unrelated** — this repo is a Vercel scaffold with one squashed commit, and
shares no ancestor with the upstream branch. Do **not** try to merge them directly. Instead:

```bash
git checkout -b port-v1 upstream/claude/islamic-bedtime-stories-dk2gso
```

Before going further, check whether `main` holds anything the upstream branch lacks — config,
env files, tweaks made after the scaffold:

```bash
git diff --stat main port-v1
```

Carry anything Zorpal-only forward. For app code, upstream wins.

### 4. Validate — all four must pass

```bash
npm install
npm run build      # expect ~49 static pages: 24 /stories/[id] + 12 /topics/[topicId]
npm run lint
npx tsc --noEmit
```

If anything fails, fix it before pushing. Do not push a red build.

### 5. Land it on `main`

`main` is the branch Vercel builds for production.

```bash
git checkout main
git merge port-v1
git push -u origin main
```

Pushing is all that's needed — the GitHub integration auto-builds. **Do not call the Vercel API
or MCP tools; you don't need them and the permission prompt will stall you.** If a Vercel
permission prompt appears anyway, deny it.

### 6. Verify on the live site

Fetch `https://islamicsleeps.vercel.app` once the new deployment is READY and confirm:

1. Nav shows a **Topics** link; landing page has the "Tonight's story about…?" grid
2. Age pills read **2-4 / 5-8 / 9-12** ← the definitive proof the new code shipped
3. `/topics` lists 12 WHY questions; each topic page shows 2 stories
4. A story page shows **But WHY?**, the Quran & Sunnah card, and Talk about it tonight
5. Read aloud plays and highlights sentences as it goes
6. Generator with topic + name + age + gender returns a story (confirms the Groq key)
7. Share button returns a `/s/<id>` link that opens in a fresh browser
8. `/manifest.webmanifest` returns 200 and Chrome offers Install
9. `/stories/does-not-exist` returns a genuine 404

If the site still shows "Toddlers (2-5)", the old snapshot is still live — the push didn't reach
`main`, or the deployment hasn't finished. Check before reporting success.

### Hard rules

- **Never force-push.** Never rewrite the existing `8ae86e9` initial commit.
- Never commit `.env.local`.
- Don't skip or weaken tests/checks to get green.
- If you genuinely can't push or can't determine the production branch, say so plainly and give
  the user the exact commands to finish it themselves. Don't quietly stop.

### Report at the end

Which branch you pushed and the resulting sha; the strategy you used; anything Zorpal-only you
preserved; build/lint/typecheck results; and what the live site actually showed for checks 1 and 2.

---

# Reference

## Why the live site looks stale

`islamicsleeps.vercel.app` currently serves the OLD app (age labels "Toddlers (2-5) / Kids (5-10) /
Preteens (10+)", no Topics nav, generator returns "Failed to generate story").

Both production deployments are the **same commit** `8ae86e9a65402d45bb89c98c113c199ff3f6613d`,
message *"Initial commit / Created from https://vercel.com/new"*. The newer one was an
`action: redeploy` of the older. So redeploying rebuilt the identical old snapshot — the new code
has never reached Vercel.

Consequence: **the "Failed to generate story" error is the OLD route's catch-all 500.** The
`GROQ_API_KEY` on the project is almost certainly fine; it simply never ran. The new
`/api/generate` returns a friendly 503 `not_configured` when a key is missing, never that error.

## Facts

| Thing | Value |
|---|---|
| Source repo (public) | `https://github.com/mohsincw/islamicsleeps` |
| Source branch | `claude/islamic-bedtime-stories-dk2gso` |
| Target repo | `Zorpal/islamicsleeps` (private) |
| Target branch | `main` (Vercel production branch) |
| Existing target commit | `8ae86e9` — Vercel scaffold, old code |
| Vercel project | `islamicsleeps` / `prj_sbdgMEpCFdppSGLn4LXIKPwQIFlS` |
| Vercel team | Mohsin's projects / `team_0sO0cw7ScATjRAd9kcfQT8oU` |
| Live domain | `https://islamicsleeps.vercel.app` |
| Supabase project | `islamicsleeps` / ref `uuwylnbshmrsczdcpcne` (eu-west-2, ACTIVE) |

Proof `main` is the production branch: the project exposes the alias
`islamicsleeps-git-main-mohsins-projects-54c41fbe.vercel.app`, and both deployments carry
`githubCommitRef: "main"`.

## What's in the release

Built against the original brief (from the WhatsApp thread):

- **"Read out loud or read yourself"** — browser Web Speech TTS on every story: calm-pace slider,
  voice picker, sentence-by-sentence highlighting. Chunked per sentence so it survives Chrome's
  ~15s utterance cutoff, and starts synchronously inside the click handler for iOS Safari.
- **"Kids always ask WHY"** — every story carries a **But WHY?** section: *what it means* / *why it
  matters* / *in your life*, written to the child in second person. Plus a Quran-or-hadith card and
  "Talk about it tonight" parent questions.
- **"Choose your topic" (morals)** — 12 topics phrased as kids ask them ("Why should I pray
  namaaz?", "Why is it important to be good?", "Who made the stars and the sky?"), each with its own
  page, explainer and stories.
- **Age + gender of child** — unified buckets **2-4 / 5-8 / 9-12** app-wide (the old
  toddler/kids/preteen mismatch is gone); generator takes name, age, gender; a child profile is
  remembered on-device and pre-fills the form.
- **Content** — library grown 6 → **24 stories** (2 per topic), one file per topic for scholar
  review via PR. Footer carries a "pending scholar review" note.
- **Add to home screen** — PWA manifest + generated crescent-and-star icon set (192 / 512 /
  maskable / apple-touch). Ash's install wizard hooks `beforeinstallprompt`.
- **Share loop (Supabase)** — generated stories get `/s/<12-char-id>` links to drop into family
  WhatsApp groups; the shared page renders read-only with read-aloud and a "create your own" CTA.
  Plus a feedback table and topic-suggestion form.
- **Bugs fixed** — favorite heart that never stayed filled on generated stories (unstable
  `Date.now()` id), dark-mode flash on load, dua-of-the-day hydration mismatch, soft-404s.

## File map

| Area | Files |
|---|---|
| Data model | `src/data/types.ts`, `src/data/topics.ts`, `src/data/stories/*.ts` (12 topic files + `index.ts`) |
| Read-aloud | `src/hooks/useReadAloud.ts`, `src/components/StoryReader.tsx` |
| WHY sections | `src/components/StorySections.tsx` |
| Topics | `src/app/topics/page.tsx`, `src/app/topics/[topicId]/page.tsx` |
| Generator | `src/components/GeneratorForm.tsx`, `src/app/api/generate/route.ts` |
| Share loop | `src/lib/supabase.ts`, `src/app/api/share/route.ts`, `src/app/s/[shortId]/page.tsx`, `src/components/ShareButton.tsx` |
| PWA | `src/app/manifest.ts`, `public/icons/`, `public/apple-touch-icon.png` |
| Shared utils | `src/lib/ages.ts` (age labels + legacy migration), `src/lib/localStore.ts` |

## Environment

- **`GROQ_API_KEY`** — already set on the Vercel project. Powers `/api/generate`
  (`llama-3.3-70b-versatile`, JSON mode). Missing key ⇒ graceful 503, library still works.
- **Supabase** — needs **no env vars**. `src/lib/supabase.ts` carries publishable defaults.
  The publishable key is public by design; row-level security is the boundary: anon can only
  INSERT, and can read only via the `get_shared_story(short_id)` security-definer RPC, so shared
  stories cannot be listed or enumerated. Override with `SUPABASE_URL` / `SUPABASE_ANON_KEY`.
- **`NEXT_PUBLIC_SITE_URL`** — optional, for share-link metadata.

## Gotchas

- Next **16.2.1**, React **19.2.4**, Tailwind **v4** (CSS-first `@theme inline`, no config file),
  Turbopack by default.
- `params` and `searchParams` are **Promises** — must be awaited in server components.
- `viewport` is a **separate export** from `metadata` (themeColor lives there).
- `/stories/[id]` and `/topics/[topicId]` set `dynamicParams = false` so unknown ids are real 404s.
  Without it Next serves a soft-404 with HTTP 200.
- Dev mode returns 200 for everything — **only test status codes against `npm run start`**.
- Only dependency added over the original: `@supabase/supabase-js`.

## Roadmap (v1.1)

Offline reading via service worker · install-wizard UI (Ash) · recorded human narration ·
Urdu/Arabic · per-story Open Graph images · scholar-review workflow + reviewed badge.

---

### Note on an in-flight session

A cloud session (`session_01KM9vREcYbj5uoTpPhRTW4f`) was already doing this port: it cherry-picked
onto `port-v1` and got a green build (49 pages), then stalled waiting for approval on a Vercel
"List Teams" permission prompt it never needed. Either clear that prompt and let it finish, or
ignore it and follow the steps above — the work is idempotent.
