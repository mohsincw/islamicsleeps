"use client";

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <div className="text-5xl mb-6">&#10022;</div>
      <h1 className="text-3xl font-bold text-foreground mb-3">
        Something went a little sideways
      </h1>
      <p className="text-muted mb-8 leading-relaxed">
        Don&apos;t worry — try again and, insha&apos;Allah, all will be well.
      </p>
      <button
        onClick={reset}
        className="px-6 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary-light transition-colors cursor-pointer"
      >
        Try again
      </button>
    </div>
  );
}
