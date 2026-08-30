import { NextRequest, NextResponse } from "next/server";
import { generateShortId } from "@/lib/shortId";
import { clientIp, rateLimit } from "@/lib/rateLimit";
import { getSupabase } from "@/lib/supabase";
import { isAgeBucket } from "@/lib/ages";

function str(v: unknown, max: number): string | null {
  return typeof v === "string" && v.trim().length > 0
    ? v.trim().slice(0, max)
    : null;
}

export async function POST(req: NextRequest) {
  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json(
      { error: "Sharing isn't available right now." },
      { status: 503 }
    );
  }

  if (!rateLimit(`share:${clientIp(req.headers)}`, 5, 10 * 60 * 1000)) {
    return NextResponse.json(
      { error: "You're sharing very fast, mashallah! Please wait a few minutes." },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();
    const title = str(body.title, 200);
    const story = str(body.story, 20000);
    const moral = str(body.moral, 2000);
    const w = body.whatItMeans;
    const whatItMeans =
      w &&
      typeof w === "object" &&
      typeof w.meaning === "string" &&
      typeof w.whyItMatters === "string" &&
      typeof w.inYourLife === "string"
        ? {
            meaning: w.meaning.slice(0, 2000),
            whyItMatters: w.whyItMatters.slice(0, 2000),
            inYourLife: w.inYourLife.slice(0, 2000),
          }
        : null;

    if (!title || !story) {
      return NextResponse.json({ error: "Invalid story." }, { status: 400 });
    }

    const shortId = generateShortId();
    const { error } = await supabase.from("shared_stories").insert({
      short_id: shortId,
      title,
      story,
      moral,
      what_it_means: whatItMeans,
      age_bucket: isAgeBucket(body.ageBucket) ? body.ageBucket : null,
      topic: str(body.topic, 100),
      child_name: str(body.childName, 60),
    });

    if (error) {
      console.error("Share insert error:", error.message);
      return NextResponse.json(
        { error: "Couldn't create a share link. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ shortId, url: `/s/${shortId}` });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
