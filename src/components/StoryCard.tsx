import Link from "next/link";
import type { Story } from "@/data/types";
import { getTopic } from "@/data/topics";
import { ageGroupsLabel } from "@/lib/ages";

const ageBadgeColors: Record<string, string> = {
  "2-4": "bg-secondary/10 text-secondary",
  "5-8": "bg-primary/10 text-primary",
  "9-12": "bg-accent/20 text-accent",
};

export default function StoryCard({ story }: { story: Story }) {
  const topic = getTopic(story.topicId);
  const badgeColor =
    story.ageGroups.length === 1
      ? ageBadgeColors[story.ageGroups[0]]
      : "bg-accent/20 text-accent";

  return (
    <Link href={`/stories/${story.id}`} className="group block h-full">
      <div className="h-full bg-surface rounded-2xl p-6 border border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
        <div className="flex items-center gap-2 mb-3">
          <span
            className={`text-xs font-medium px-2.5 py-1 rounded-full ${badgeColor}`}
          >
            {ageGroupsLabel(story.ageGroups)}
          </span>
          <span className="text-xs text-muted truncate">
            {topic ? `${topic.emoji} ` : ""}
            {story.theme}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
          {story.title}
        </h3>
        <p className="text-muted text-sm leading-relaxed line-clamp-2">
          {story.preview}
        </p>
        <div className="mt-4 flex items-center text-primary text-sm font-medium">
          Read story
          <svg
            className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
}
