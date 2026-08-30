import { NextRequest, NextResponse } from "next/server";
import { clientIp, rateLimit } from "@/lib/rateLimit";
import { getSupabase } from "@/lib/supabase";

const KINDS = ["up", "down", "suggestion"] as const;

export async function POST(req: NextRequest) {
  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json({ ok: false }, { status: 503 });
  }

  if (!rateLimit(`feedback:${clientIp(req.headers)}`, 20, 10 * 60 * 1000)) {
    return NextResponse.json({ ok: false }, { status: 429 });
  }

  try {
    const body = await req.json();
    const kind = KINDS.includes(body.kind) ? body.kind : null;
    const storyRef =
      typeof body.storyRef === "string" && body.storyRef.trim()
        ? body.storyRef.trim().slice(0, 100)
        : null;
    const comment =
      typeof body.comment === "string" && body.comment.trim()
        ? body.comment.trim().slice(0, 1000)
        : null;

    if (!kind || !storyRef) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    const { error } = await supabase.from("feedback").insert({
      story_ref: storyRef,
      kind,
      comment,
    });
    if (error) {
      console.error("Feedback insert error:", error.message);
      return NextResponse.json({ ok: false }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
