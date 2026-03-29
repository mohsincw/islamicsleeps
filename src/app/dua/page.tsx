"use client";

import { useState } from "react";
import { duas } from "@/data/duas";

const categories = ["All", ...Array.from(new Set(duas.map((d) => d.category)))];

export default function DuaPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filtered =
    selectedCategory === "All"
      ? duas
      : duas.filter((d) => d.category === selectedCategory);

  // Pick a "dua of the day" based on date
  const dayIndex = new Date().getDate() % duas.length;
  const duaOfDay = duas[dayIndex];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
          Daily Dua
        </h1>
        <p className="text-muted mt-2">
          Bedtime supplications with Arabic, transliteration, and translation
        </p>
      </div>

      {/* Dua of the Day */}
      <div className="bg-primary/5 rounded-2xl p-6 sm:p-8 border border-primary/10 mb-10 islamic-pattern">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl">&#10024;</span>
          <h2 className="font-semibold text-primary">Dua of the Day</h2>
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-4">
          {duaOfDay.title}
        </h3>
        <div className="text-right text-2xl sm:text-3xl leading-loose text-foreground mb-4 font-serif">
          {duaOfDay.arabic}
        </div>
        <p className="text-primary/80 italic mb-2">{duaOfDay.transliteration}</p>
        <p className="text-foreground/80 mb-3">{duaOfDay.translation}</p>
        <p className="text-xs text-muted">{duaOfDay.reference}</p>
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === cat
                ? "bg-primary text-white"
                : "bg-surface border border-border text-foreground hover:border-primary/30"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* All Duas */}
      <div className="space-y-6">
        {filtered.map((dua) => (
          <div
            key={dua.id}
            className="bg-surface rounded-2xl p-6 sm:p-8 border border-border"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-secondary/10 text-secondary">
                {dua.category}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-4">
              {dua.title}
            </h3>
            <div className="text-right text-xl sm:text-2xl leading-loose text-foreground mb-4 font-serif">
              {dua.arabic}
            </div>
            <p className="text-primary/70 italic mb-2 text-sm">
              {dua.transliteration}
            </p>
            <p className="text-foreground/80 mb-3">{dua.translation}</p>
            <p className="text-xs text-muted">{dua.reference}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
