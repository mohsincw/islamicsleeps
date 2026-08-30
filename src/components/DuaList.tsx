"use client";

import { useState } from "react";
import type { Dua } from "@/data/duas";

export function DuaCard({ dua, compact = false }: { dua: Dua; compact?: boolean }) {
  return (
    <div className="bg-surface rounded-2xl p-6 sm:p-8 border border-border">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-secondary/10 text-secondary">
          {dua.category}
        </span>
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-4">{dua.title}</h3>
      <div
        className={`arabic-text text-right leading-loose text-foreground mb-4 ${
          compact ? "text-xl sm:text-2xl" : "text-2xl sm:text-3xl"
        }`}
      >
        {dua.arabic}
      </div>
      <p className="text-primary/70 italic mb-2 text-sm">{dua.transliteration}</p>
      <p className="text-foreground/80 mb-3">{dua.translation}</p>
      <p className="text-xs text-muted">{dua.reference}</p>
    </div>
  );
}

export default function DuaList({ duas }: { duas: Dua[] }) {
  const categories = ["All", ...Array.from(new Set(duas.map((d) => d.category)))];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filtered =
    selectedCategory === "All"
      ? duas
      : duas.filter((d) => d.category === selectedCategory);

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
              selectedCategory === cat
                ? "bg-primary text-white"
                : "bg-surface border border-border text-foreground hover:border-primary/30"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {filtered.map((dua) => (
          <DuaCard key={dua.id} dua={dua} compact />
        ))}
      </div>
    </>
  );
}
