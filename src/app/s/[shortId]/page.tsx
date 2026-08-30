import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";
import StoryReader from "@/components/StoryReader";
import StorySections from "@/components/StorySections";
import type { WhatItMeans } from "@/data/types";
import { ageLabel } from "@/lib/ages";
import { isShortId } from "@/lib/shortId";
import { getSupabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

interface SharedStoryRow {
  short_id: string;
  title: string;
  story: string;
  moral: string | null;
  what_it_means: WhatItMeans | null;
  age_bucket: string | null;
  topic: string | null;
  child_name: string | null;
}

// cache() dedupes the lookup between generateMetadata and the page render.
const fetchSharedStory = cache(async (shortId: string): Promise<SharedStoryRow | null> => {
  if (!isShortId(shortId)) return null;
  const supabase = getSupabase();
  if (!supabase) return null;
  const { data, error } = await supabase
    .rpc("get_shared_story", { p_short_id: shortId })
    .maybeSingle<SharedStoryRow>();
  if (error) {
    console.error("Shared story lookup error:", error.message);
    return null;
  }
  return data;
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ shortId: string }>;
}): Promise<Metadata> {
  const { shortId } = await params;
  const story = await fetchSharedStory(shortId);
  if (!story) notFound();
  const description = `An Islamic bedtime story${
    story.child_name ? ` for ${story.child_name}` : ""
  }${story.topic ? ` about ${story.topic}` : ""} — made with IslamicSleeps.`;
  return {
    title: story.title,
    description,
    openGraph: { title: story.title, description },
  };
}

export default async function SharedStoryPage({
  params,
}: {
  params: Promise<{ shortId: string }>;
}) {
  const { shortId } = await params;
  const story = await fetchSharedStory(shortId);
  if (!story) notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {story.age_bucket && (
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary">
              {ageLabel(story.age_bucket)}
            </span>
          )}
          {story.topic && <span className="text-xs text-muted">{story.topic}</span>}
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
          {story.title}
        </h1>
        {story.child_name && (
          <p className="text-muted mt-2">
            A special story for {story.child_name} 💜
          </p>
        )}
      </div>

      <div className="bg-surface rounded-2xl p-6 sm:p-10 border border-border mb-6">
        <StoryReader text={story.story} />
      </div>

      {story.moral && (
        <StorySections
          moral={story.moral}
          whatItMeans={story.what_it_means ?? undefined}
        />
      )}

      {/* Growth loop */}
      <div className="mt-10 bg-primary/5 rounded-2xl p-6 sm:p-8 border border-primary/10 text-center islamic-pattern">
        <div className="text-3xl mb-3">&#9790;</div>
        <h2 className="text-xl font-bold text-foreground mb-2">
          Made with IslamicSleeps
        </h2>
        <p className="text-muted mb-5 text-sm leading-relaxed">
          Free Islamic bedtime stories for Muslim families — with read-aloud,
          the big WHY questions answered, and stories personalised for your
          child.
        </p>
        <Link
          href="/generate"
          className="inline-block px-6 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary-light transition-colors"
        >
          Create your own story
        </Link>
      </div>
    </div>
  );
}
