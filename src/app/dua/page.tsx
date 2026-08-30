import type { Metadata } from "next";
import DuaList from "@/components/DuaList";
import { duas } from "@/data/duas";

export const metadata: Metadata = {
  title: "Daily Dua",
  description:
    "Bedtime duas for children with Arabic, transliteration, translation, and authentic references.",
};

// Re-render hourly so the Dua of the Day rolls over without a rebuild.
export const revalidate = 3600;

export default function DuaPage() {
  // Deterministic server-side pick — same value for server and client render.
  const dayIndex = new Date().getUTCDate() % duas.length;
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
        <div className="arabic-text text-right text-2xl sm:text-3xl leading-loose text-foreground mb-4">
          {duaOfDay.arabic}
        </div>
        <p className="text-primary/80 italic mb-2">{duaOfDay.transliteration}</p>
        <p className="text-foreground/80 mb-3">{duaOfDay.translation}</p>
        <p className="text-xs text-muted">{duaOfDay.reference}</p>
      </div>

      <DuaList duas={duas} />
    </div>
  );
}
