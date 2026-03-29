"use client";

import Link from "next/link";

interface StoryCardProps {
  id: string;
  title: string;
  theme: string;
  preview: string;
  ageGroup: string;
  href?: string;
}

const ageBadgeColors: Record<string, string> = {
  toddler: "bg-secondary/10 text-secondary",
  kids: "bg-primary/10 text-primary",
  all: "bg-accent/20 text-accent",
};

export default function StoryCard({
  id,
  title,
  theme,
  preview,
  ageGroup,
  href,
}: StoryCardProps) {
  const link = href || `/stories/${id}`;
  const ageLabel =
    ageGroup === "toddler"
      ? "Ages 2-5"
      : ageGroup === "kids"
        ? "Ages 5-10"
        : "All Ages";

  return (
    <Link href={link} className="group block">
      <div className="bg-surface rounded-2xl p-6 border border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
        <div className="flex items-center gap-2 mb-3">
          <span
            className={`text-xs font-medium px-2.5 py-1 rounded-full ${ageBadgeColors[ageGroup] || ageBadgeColors.all}`}
          >
            {ageLabel}
          </span>
          <span className="text-xs text-muted">{theme}</span>
        </div>
        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
          {title}
        </h3>
        <p className="text-muted text-sm leading-relaxed line-clamp-2">
          {preview}
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
