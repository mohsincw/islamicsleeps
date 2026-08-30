import type { Metadata } from "next";
import Link from "next/link";
import StoryCard from "@/components/StoryCard";
import { stories } from "@/data/stories";
import { getTopic, topics } from "@/data/topics";
import { AGE_BUCKETS, isAgeBucket } from "@/lib/ages";

export const metadata: Metadata = {
  title: "Story Library",
  description:
    "Handcrafted Islamic bedtime stories organised by age and moral topic — honesty, patience, gratitude, salah, and more.",
};

function filterHref(age?: string, topic?: string) {
  const params = new URLSearchParams();
  if (age) params.set("age", age);
  if (topic) params.set("topic", topic);
  const qs = params.toString();
  return qs ? `/stories?${qs}` : "/stories";
}

function Pill({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
        active
          ? "bg-primary text-white"
          : "bg-surface border border-border text-foreground hover:border-primary/30"
      }`}
    >
      {children}
    </Link>
  );
}

export default async function StoriesPage({
  searchParams,
}: {
  searchParams: Promise<{ age?: string; topic?: string }>;
}) {
  const params = await searchParams;
  const age = params.age && isAgeBucket(params.age) ? params.age : undefined;
  const topic = params.topic && getTopic(params.topic) ? params.topic : undefined;

  const filtered = stories.filter(
    (s) =>
      (!age || s.ageGroups.includes(age)) && (!topic || s.topicId === topic)
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
          Story Library
        </h1>
        <p className="text-muted mt-2">
          Handcrafted Islamic bedtime stories to nurture faith and good character
        </p>
      </div>

      {/* Age filter */}
      <div className="flex flex-wrap gap-2 mb-4">
        <Pill href={filterHref(undefined, topic)} active={!age}>
          All ages
        </Pill>
        {AGE_BUCKETS.map((b) => (
          <Pill
            key={b.id}
            href={filterHref(b.id, topic)}
            active={age === b.id}
          >
            {b.label}
          </Pill>
        ))}
      </div>

      {/* Topic filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        <Pill href={filterHref(age, undefined)} active={!topic}>
          All topics
        </Pill>
        {topics.map((t) => (
          <Pill key={t.id} href={filterHref(age, t.id)} active={topic === t.id}>
            {t.emoji} {t.concept}
          </Pill>
        ))}
      </div>

      {/* Stories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((story) => (
          <StoryCard key={story.id} story={story} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-muted">
          <p className="text-lg">No stories here just yet.</p>
          <p className="text-sm mt-2">
            Try a different filter, or{" "}
            <Link href="/generate" className="text-primary font-medium">
              generate a brand-new story
            </Link>{" "}
            about this topic.
          </p>
        </div>
      )}
    </div>
  );
}
