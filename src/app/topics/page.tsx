import type { Metadata } from "next";
import Link from "next/link";
import SuggestTopicForm from "@/components/SuggestTopicForm";
import { getStoriesByTopic } from "@/data/stories";
import { topics } from "@/data/topics";

export const metadata: Metadata = {
  title: "Topics — the big WHY questions",
  description:
    "Choose a topic your child wonders about — why should I pray, why be kind, why tell the truth — each answered with warm Islamic bedtime stories.",
};

export default function TopicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10 max-w-2xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
          The big <span className="text-primary">WHY</span> questions
        </h1>
        <p className="text-muted mt-3 leading-relaxed">
          Kids don&apos;t just want rules — they want to know <em>why</em>.
          Pick the question your little one is wondering about, and we&apos;ll
          answer it the gentle way: with a story.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map((topic) => {
          const count = getStoriesByTopic(topic.id).length;
          return (
            <Link key={topic.id} href={`/topics/${topic.id}`} className="group block h-full">
              <div className="h-full bg-surface rounded-2xl p-6 border border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                <div className="text-3xl mb-3">{topic.emoji}</div>
                <h2 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-1">
                  {topic.question}
                </h2>
                <p className="text-xs font-semibold text-accent mb-3">
                  {topic.concept}
                </p>
                <p className="text-sm text-muted leading-relaxed line-clamp-3">
                  {topic.answer}
                </p>
                <p className="mt-4 text-sm text-primary font-medium">
                  {count > 0
                    ? `${count} ${count === 1 ? "story" : "stories"} →`
                    : "Explore →"}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      <SuggestTopicForm />
    </div>
  );
}
