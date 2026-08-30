import type { Metadata } from "next";
import GeneratorForm from "@/components/GeneratorForm";

export const metadata: Metadata = {
  title: "Generate a Story",
  description:
    "Create a personalised Islamic bedtime story for your child — choose their name, age, gender, and the topic on their mind tonight.",
};

export default async function GeneratePage({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string }>;
}) {
  const { topic } = await searchParams;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
          Generate a Story
        </h1>
        <p className="text-muted mt-2">
          A brand-new bedtime story, made just for your child — with the WHY
          explained, insha&apos;Allah in under a minute.
        </p>
      </div>
      <GeneratorForm initialTopicId={topic} />
    </div>
  );
}
