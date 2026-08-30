import type { AgeBucket } from "@/data/types";

export interface AgeBucketInfo {
  id: AgeBucket;
  label: string;
  description: string;
  /** Fed into the story-generation prompt. */
  promptHint: string;
}

export const AGE_BUCKETS: AgeBucketInfo[] = [
  {
    id: "2-4",
    label: "Ages 2–4",
    description: "Little ones — simple words, short and gentle",
    promptHint:
      "a very young child aged 2-4. Use very simple words, short sentences, lots of repetition, and a gentle sing-song tone. The story should be about 200-300 words.",
  },
  {
    id: "5-8",
    label: "Ages 5–8",
    description: "Growing minds — a fuller story with a clear lesson",
    promptHint:
      "a child aged 5-8. Use friendly, moderate vocabulary with some descriptive language and simple dialogue. The story should be about 400-600 words.",
  },
  {
    id: "9-12",
    label: "Ages 9–12",
    description: "Big kids — richer language and deeper questions",
    promptHint:
      "an older child aged 9-12. Use rich vocabulary, a fuller narrative arc, and reflections that respect their intelligence. The story should be about 600-800 words.",
  },
];

export const ALL_AGE_BUCKETS: AgeBucket[] = AGE_BUCKETS.map((b) => b.id);

export function isAgeBucket(value: string): value is AgeBucket {
  return ALL_AGE_BUCKETS.includes(value as AgeBucket);
}

/**
 * Older versions of the app stored "toddler" / "kids" / "preteen" / "all".
 * These survive in localStorage favorites, so mapping must stay tolerant.
 */
export function migrateLegacyAge(value: string): AgeBucket[] {
  switch (value) {
    case "toddler":
      return ["2-4"];
    case "kids":
      return ["5-8"];
    case "preteen":
      return ["9-12"];
    case "all":
      return [...ALL_AGE_BUCKETS];
    default:
      return isAgeBucket(value) ? [value] : [...ALL_AGE_BUCKETS];
  }
}

/** Display label for a single stored age value (new bucket or legacy string). */
export function ageLabel(value: string): string {
  if (value === "all") return "All ages";
  const buckets = migrateLegacyAge(value);
  if (buckets.length === ALL_AGE_BUCKETS.length) return "All ages";
  const info = AGE_BUCKETS.find((b) => b.id === buckets[0]);
  return info ? info.label : "All ages";
}

/** Display label for a story's ageGroups array. */
export function ageGroupsLabel(buckets: AgeBucket[]): string {
  if (buckets.length >= ALL_AGE_BUCKETS.length) return "All ages";
  return AGE_BUCKETS.filter((b) => buckets.includes(b.id))
    .map((b) => b.label)
    .join(" · ");
}
