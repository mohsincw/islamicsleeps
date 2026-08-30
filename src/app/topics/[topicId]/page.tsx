import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import StoryCard from "@/components/StoryCard";
import { getStoriesByTopic } from "@/data/stories";
import { getTopic, topics } from "@/data/topics";

// Every topic id is known at build time; anything else is a hard 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return topics.map((topic) => ({ topicId: topic.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ topicId: string }>;
}): Promise<Metadata> {
  const { topicId } = await params;
  const topic = getTopic(topicId);
  if (!topic) return {};
  return {
    title: topic.question,
    description: topic.answer.slice(0, 160),
    openGraph: { title: topic.question, description: topic.answer.slice(0, 160) },
  };
}

export default async function TopicPage({
  params,
}: {
  params: Promise<{ topicId: string }>;
}) {
  const { topicId } = await params;
  const topic = getTopic(topicId);
  if (!topic) notFound();

  const topicStories = getStoriesByTopic(topic.id);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        href="/topics"
        className="inline-flex items-center text-muted hover:text-primary transition-colors mb-8"
      >
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        All topics
      </Link>

      {/* The WHY explainer */}
      <div className="bg-surface rounded-2xl p-6 sm:p-10 border border-border mb-10 islamic-pattern">
        <div className="text-4xl mb-4">{topic.emoji}</div>
        <p className="text-xs font-semibold text-accent uppercase tracking-wide mb-2">
          {topic.concept}
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
          {topic.question}
        </h1>
        <p className="text-foreground/80 leading-relaxed text-lg max-w-3xl">
          {topic.answer}
        </p>
      </div>

      {/* Stories */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">
          Stories about {topic.concept.split(" (")[0].toLowerCase()}
        </h2>
        <Link
          href={`/generate?topic=${topic.id}`}
          className="hidden sm:inline-flex px-4 py-2 bg-primary text-white rounded-full text-sm font-semibold hover:bg-primary-light transition-colors"
        >
          ✨ Generate a new one
        </Link>
      </div>

      {topicStories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topicStories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-muted bg-surface rounded-2xl border border-border">
          <p className="text-lg">Stories for this topic are on their way.</p>
          <p className="text-sm mt-2">
            Meanwhile, you can{" "}
            <Link href={`/generate?topic=${topic.id}`} className="text-primary font-medium">
              generate a personalised story
            </Link>{" "}
            about it tonight.
          </p>
        </div>
      )}

      <div className="mt-8 text-center sm:hidden">
        <Link
          href={`/generate?topic=${topic.id}`}
          className="inline-flex px-6 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary-light transition-colors"
        >
          ✨ Generate a story about this
        </Link>
      </div>
    </div>
  );
}
