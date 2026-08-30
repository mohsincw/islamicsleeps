import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <div className="text-5xl mb-6 animate-float">&#9790;</div>
      <h1 className="text-3xl font-bold text-foreground mb-3">
        This page has drifted off to sleep
      </h1>
      <p className="text-muted mb-8 leading-relaxed">
        We couldn&apos;t find what you were looking for — but there are plenty of
        stories waiting for you.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/stories"
          className="px-6 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary-light transition-colors"
        >
          Browse Stories
        </Link>
        <Link
          href="/"
          className="px-6 py-3 bg-surface border border-border text-foreground rounded-full font-medium hover:border-primary/30 transition-colors"
        >
          Back Home
        </Link>
      </div>
    </div>
  );
}
