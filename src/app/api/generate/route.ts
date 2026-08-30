import { NextRequest, NextResponse } from "next/server";
import { getTopic } from "@/data/topics";
import type { GeneratedStory, Gender } from "@/data/types";
import { AGE_BUCKETS, isAgeBucket } from "@/lib/ages";

const GENDERS: Gender[] = ["boy", "girl", "unspecified"];

function sanitizeName(raw: unknown): string {
  if (typeof raw !== "string") return "";
  return raw.replace(/[^\p{L} '\-]/gu, "").trim().slice(0, 40);
}

function sanitizeTheme(raw: unknown): string {
  if (typeof raw !== "string") return "";
  return raw.replace(/\s+/g, " ").trim().slice(0, 80);
}

function isGeneratedStory(v: unknown): v is GeneratedStory {
  if (!v || typeof v !== "object") return false;
  const o = v as Record<string, unknown>;
  const w = o.whatItMeans as Record<string, unknown> | null | undefined;
  return (
    typeof o.title === "string" &&
    typeof o.story === "string" &&
    typeof o.moral === "string" &&
    !!w &&
    typeof w === "object" &&
    typeof w.meaning === "string" &&
    typeof w.whyItMatters === "string" &&
    typeof w.inYourLife === "string"
  );
}

/** Groq occasionally wraps JSON in fences or prose despite JSON mode. */
function extractJson(content: string): unknown {
  const stripped = content
    .replace(/^\s*```(?:json)?\s*/i, "")
    .replace(/```\s*$/, "")
    .trim();
  try {
    return JSON.parse(stripped);
  } catch {}
  const start = stripped.indexOf("{");
  const end = stripped.lastIndexOf("}");
  if (start >= 0 && end > start) {
    try {
      return JSON.parse(stripped.slice(start, end + 1));
    } catch {}
  }
  return null;
}

async function callGroq(
  apiKey: string,
  prompt: string,
  nudge: boolean
): Promise<string> {
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content:
            "You are a warm, gentle Islamic storyteller who crafts beautiful bedtime stories for Muslim children. Your stories are rooted in the Quran and Sunnah, promoting good character, love for Allah, and Islamic values. You always reply with a single valid JSON object and nothing else.",
        },
        {
          role: "user",
          content: nudge
            ? `${prompt}\n\nIMPORTANT: your previous reply was not valid JSON. Reply with ONLY the JSON object.`
            : prompt,
        },
      ],
      temperature: 0.8,
      max_tokens: 3000,
      response_format: { type: "json_object" },
    }),
  });

  if (!response.ok) {
    const errorData = await response.text();
    console.error("Groq API error:", response.status, errorData);
    throw new Error("groq_error");
  }
  const data = await response.json();
  return data.choices?.[0]?.message?.content || "";
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const ageBucket: string = typeof body.ageBucket === "string" ? body.ageBucket : "";
    const gender: Gender = GENDERS.includes(body.gender) ? body.gender : "unspecified";
    const childName = sanitizeName(body.childName);
    const topic = typeof body.topicId === "string" ? getTopic(body.topicId) : undefined;
    const customTheme = sanitizeTheme(body.theme);

    if (!isAgeBucket(ageBucket) || (!topic && !customTheme)) {
      return NextResponse.json(
        { error: "Please choose an age group and a topic." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "Story generation isn't switched on yet — but the story library is full of hand-crafted stories to enjoy tonight.",
          code: "not_configured",
        },
        { status: 503 }
      );
    }

    const ageInfo = AGE_BUCKETS.find((b) => b.id === ageBucket)!;

    const genderLine =
      gender === "boy"
        ? "The main character is a young boy."
        : gender === "girl"
          ? "The main character is a young girl."
          : "";
    const nameLine = childName
      ? `The main character's name is "${childName}".`
      : "Give the main character a common Muslim name.";

    const themeLine = topic
      ? `${topic.concept} — the story should help answer the child's question: "${topic.question}"`
      : customTheme;
    const topicContext = topic
      ? `\nUse this explanation as grounding for the whatItMeans section:\n${topic.answer}\n`
      : "";

    const prompt = `Write a beautiful, heartwarming Islamic bedtime story for ${ageInfo.promptHint}

The story must revolve around this Islamic topic: ${themeLine}
${genderLine}
${nameLine}
${topicContext}
Requirements:
- Grounded in authentic Islamic values from the Quran and Sunnah
- Warm, gentle, soothing bedtime tone — nothing scary, violent, or disturbing
- Vivid but calming imagery; you may reference Prophets, Companions, or Islamic teachings where appropriate
- A clear moral woven naturally into the story
- The whatItMeans section answers the child's "but WHY?" — speak directly to the child using "you"

Reply with ONLY a valid JSON object in exactly this shape (no markdown, no extra text):
{
  "title": "the story title",
  "story": "the full story text, with \\n\\n between paragraphs",
  "moral": "a warm 1-2 sentence lesson",
  "whatItMeans": {
    "meaning": "what this concept means, in words a child understands",
    "whyItMatters": "why Allah asks this of us",
    "inYourLife": "what it looks like in the child's own life this week"
  }
}`;

    let content = await callGroq(apiKey, prompt, false);
    let parsed = extractJson(content);
    if (!isGeneratedStory(parsed)) {
      content = await callGroq(apiKey, prompt, true);
      parsed = extractJson(content);
    }
    if (!isGeneratedStory(parsed)) {
      console.error("Unparseable generation:", content.slice(0, 400));
      return NextResponse.json(
        { error: "The storyteller got tongue-tied. Please try again." },
        { status: 502 }
      );
    }

    const result: GeneratedStory = {
      title: parsed.title.slice(0, 200),
      story: parsed.story.slice(0, 20000),
      moral: parsed.moral.slice(0, 2000),
      whatItMeans: {
        meaning: parsed.whatItMeans.meaning.slice(0, 2000),
        whyItMatters: parsed.whatItMeans.whyItMatters.slice(0, 2000),
        inYourLife: parsed.whatItMeans.inYourLife.slice(0, 2000),
      },
    };

    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof Error && error.message === "groq_error") {
      return NextResponse.json(
        { error: "Failed to generate story. Please try again." },
        { status: 502 }
      );
    }
    console.error("Generate error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
