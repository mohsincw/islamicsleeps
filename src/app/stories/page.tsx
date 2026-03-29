"use client";

import { useState } from "react";
import { stories } from "@/data/stories";
import StoryCard from "@/components/StoryCard";

const ageFilters = [
  { value: "all", label: "All Ages" },
  { value: "toddler", label: "Toddlers (2-5)" },
  { value: "kids", label: "Kids (5-10)" },
];

export default function StoriesPage() {
  const [ageFilter, setAgeFilter] = useState("all");

  const filtered =
    ageFilter === "all"
      ? stories
      : stories.filter(
          (s) => s.ageGroup === ageFilter || s.ageGroup === "all"
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

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {ageFilters.map((f) => (
          <button
            key={f.value}
            onClick={() => setAgeFilter(f.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              ageFilter === f.value
                ? "bg-primary text-white"
                : "bg-surface border border-border text-foreground hover:border-primary/30"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Stories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((story) => (
          <StoryCard
            key={story.id}
            id={story.id}
            title={story.title}
            theme={story.theme}
            preview={story.preview}
            ageGroup={story.ageGroup}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-muted">
          <p className="text-lg">No stories found for this age group yet.</p>
          <p className="text-sm mt-2">Check back soon — we&apos;re adding more!</p>
        </div>
      )}
    </div>
  );
}
