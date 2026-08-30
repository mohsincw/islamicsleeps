import type { Story } from "../types";
import { allahMadeEverythingStories } from "./allah-made-everything";
import { beingGoodStories } from "./being-good";
import { forgivenessStories } from "./forgiveness";
import { gratitudeStories } from "./gratitude";
import { honestyStories } from "./honesty";
import { kindnessStories } from "./kindness";
import { parentsStories } from "./parents";
import { patienceStories } from "./patience";
import { prophetLoveStories } from "./prophet-love";
import { salahStories } from "./salah";
import { sharingStories } from "./sharing";
import { trustingAllahStories } from "./trusting-allah";

export type { Story } from "../types";

export const stories: Story[] = [
  ...beingGoodStories,
  ...salahStories,
  ...kindnessStories,
  ...honestyStories,
  ...patienceStories,
  ...gratitudeStories,
  ...sharingStories,
  ...forgivenessStories,
  ...parentsStories,
  ...trustingAllahStories,
  ...prophetLoveStories,
  ...allahMadeEverythingStories,
];

export function getStory(id: string): Story | undefined {
  return stories.find((s) => s.id === id);
}

export function getStoriesByTopic(topicId: string): Story[] {
  return stories.filter((s) => s.topicId === topicId);
}
