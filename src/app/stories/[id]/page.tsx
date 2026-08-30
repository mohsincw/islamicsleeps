import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import FavoriteButton from "@/components/FavoriteButton";
import StoryReader from "@/components/StoryReader";
import StorySections from "@/components/StorySections";
import { getStoriesByTopic, getStory, stories } from "@/data/stories";
import { getTopic } from "@/data/topics";
import { ageGroupsLabel } from "@/lib/ages";

// Every story id is known at build time; anything else is a hard 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return stories.map((story) => ({ id: story.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const story = getStory(id);
  if (!story) return {};
  return {
    title: story.title,
    description: story.preview,
    openGraph: { title: story.title, description: story.preview },
  };
}

export default async function StoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const story = getStory(id);
  if (!story) notFound();

  const topic = getTopic(story.topicId);
  const moreFromTopic = getStoriesByTopic(story.topicId)
    .filter((s) => s.id !== story.id)
    .slice(0, 2);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back link */}
      <Link
        href="/stories"
        className="inline-flex items-center text-muted hover:text-primary transition-colors mb-8"
      >
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to stories
      </Link>

      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary">
            {ageGroupsLabel(story.ageGroups)}
          </span>
          {topic ? (
            <Link
              href={`/topics/${topic.id}`}
              className="text-xs text-muted hover:text-primary transition-colors"
            >
              {topic.emoji} {story.theme}
            </Link>
          ) : (
            <span className="text-xs text-muted">{story.theme}</span>
          )}
        </div>
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
            {story.title}
          </h1>
        </div>
      </div>

      {/* Story content with read-aloud */}
      <div className="mb-6">
        <div className="bg-surface rounded-2xl p-6 sm:p-10 border border-border">
          <StoryReader text={story.content} />
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 mb-8">
        <FavoriteButton
          story={{
            id: story.id,
            title: story.title,
            preview: story.preview,
            content: story.content,
            ageGroup: ageGroupsLabel(story.ageGroups),
            theme: story.theme,
            moral: story.moral,
            whatItMeans: story.whatItMeans,
          }}
        />
      </div>

      <StorySections
        moral={story.moral}
        whatItMeans={story.whatItMeans}
        quranOrHadith={story.quranOrHadith}
        talkAboutIt={story.talkAboutIt}
      />

      {/* More from this topic */}
      {topic && (
        <div className="mt-10 pt-8 border-t border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-foreground">
              More about {topic.concept}
            </h2>
            <Link
              href={`/topics/${topic.id}`}
              className="text-sm text-primary font-medium hover:text-primary-light transition-colors"
            >
              {topic.question}
            </Link>
          </div>
          {moreFromTopic.length > 0 ? (
            <ul className="space-y-2">
              {moreFromTopic.map((s) => (
                <li key={s.id}>
                  <Link
                    href={`/stories/${s.id}`}
                    className="text-primary hover:text-primary-light transition-colors"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted">
              <Link href={`/generate?topic=${topic.id}`} className="text-primary font-medium">
                Generate a new story
              </Link>{" "}
              about this topic for tonight.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
