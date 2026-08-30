import Link from "next/link";
import Greeting from "@/components/Greeting";
import StoryCard from "@/components/StoryCard";
import { stories } from "@/data/stories";
import { topics } from "@/data/topics";

const features = [
  {
    icon: "🤔",
    title: "The Big WHY Questions",
    desc: "Why should I pray? Why be kind? Every topic answers the questions your kids actually ask.",
    href: "/topics",
  },
  {
    icon: "🔊",
    title: "Read Aloud or Read Yourself",
    desc: "Every story can read itself out loud in a calm bedtime voice — or you can read together.",
    href: "/stories",
  },
  {
    icon: "✨",
    title: "Personalised Stories",
    desc: "Create a brand-new story for your child's name, age, and the topic on their mind tonight.",
    href: "/generate",
  },
  {
    icon: "🙌",
    title: "Daily Duas",
    desc: "Bedtime duas with Arabic, transliteration, and what they mean — build beautiful nightly habits.",
    href: "/dua",
  },
];

export default function Home() {
  const featuredStories = stories.slice(0, 3);
  const featuredTopics = topics.slice(0, 8);

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden islamic-pattern">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
          <div className="text-center max-w-3xl mx-auto">
            {/* Decorative crescent */}
            <div className="text-5xl mb-6 animate-float">&#9790;</div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight">
              Bedtime Stories{" "}
              <span className="text-primary">Rooted in Faith</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-muted leading-relaxed max-w-2xl mx-auto">
              Beautiful Islamic bedtime stories and duas to help your little ones
              drift off to sleep with peace, faith, and love in their hearts.
            </p>
            <Greeting />

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/topics"
                className="w-full sm:w-auto px-8 py-4 bg-primary text-white rounded-full font-semibold text-lg hover:bg-primary-light transition-colors shadow-lg shadow-primary/20"
              >
                Choose a Topic
              </Link>
              <Link
                href="/generate"
                className="w-full sm:w-auto px-8 py-4 bg-surface text-primary border-2 border-primary/20 rounded-full font-semibold text-lg hover:border-primary/40 hover:bg-surface-hover transition-colors"
              >
                Generate a Story
              </Link>
            </div>

            {/* Trust line */}
            <p className="mt-8 text-sm text-muted">
              Free for the Ummah · Inspired by the Quran &amp; Sunnah · Ages 2–12
            </p>
          </div>
        </div>

        {/* Decorative stars */}
        <div className="absolute top-10 left-10 text-accent/30 text-2xl animate-twinkle">&#10022;</div>
        <div className="absolute top-20 right-20 text-accent/20 text-lg animate-twinkle" style={{ animationDelay: "1s" }}>&#10022;</div>
        <div className="absolute bottom-20 left-1/4 text-accent/25 text-xl animate-twinkle" style={{ animationDelay: "2s" }}>&#10022;</div>
        <div className="absolute bottom-10 right-1/3 text-accent/15 text-2xl animate-twinkle" style={{ animationDelay: "0.5s" }}>&#10022;</div>
      </section>

      {/* Topics Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-foreground mb-4">
            Tonight&apos;s story about&hellip;?
          </h2>
          <p className="text-center text-muted mb-12 max-w-xl mx-auto">
            Kids always ask <span className="font-semibold text-primary">WHY</span>.
            Pick the question on your child&apos;s mind — each topic answers it
            with warm stories and real meaning.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featuredTopics.map((topic) => (
              <Link
                key={topic.id}
                href={`/topics/${topic.id}`}
                className="group bg-surface rounded-2xl p-5 border border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 text-center"
              >
                <div className="text-3xl mb-2">{topic.emoji}</div>
                <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
                  {topic.question}
                </p>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/topics" className="text-primary font-medium hover:text-primary-light transition-colors">
              See all topics &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-surface">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-foreground mb-4">
            Everything for a Blessed Bedtime
          </h2>
          <p className="text-center text-muted mb-14 max-w-xl mx-auto">
            Tools and stories designed to make bedtime a special moment of
            learning, reflection, and connection with Allah.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <Link
                key={feature.title}
                href={feature.href}
                className="group bg-background rounded-2xl p-6 border border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
              >
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {feature.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Stories */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-foreground">
                Featured Stories
              </h2>
              <p className="text-muted mt-2">
                Start with one of our most loved bedtime stories
              </p>
            </div>
            <Link
              href="/stories"
              className="hidden sm:flex items-center text-primary font-medium hover:text-primary-light transition-colors"
            >
              View all
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredStories.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link href="/stories" className="text-primary font-medium">
              View all stories &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/5 islamic-pattern">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-4xl mb-4">&#9790;</div>
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Create a Story Just for Your Child
          </h2>
          <p className="text-muted mb-8 leading-relaxed">
            Craft a unique Islamic bedtime story in seconds. Choose the topic,
            your child&apos;s age, and add their name — then read it together or
            let it read itself aloud.
          </p>
          <Link
            href="/generate"
            className="inline-block px-8 py-4 bg-primary text-white rounded-full font-semibold text-lg hover:bg-primary-light transition-colors shadow-lg shadow-primary/20"
          >
            Generate a Story Now
          </Link>
        </div>
      </section>
    </>
  );
}
