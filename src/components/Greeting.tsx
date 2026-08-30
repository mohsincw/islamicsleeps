"use client";

import { useProfile } from "@/hooks/useProfile";

/** Personal salaam under the hero heading once a child profile exists. */
export default function Greeting() {
  const { profile, mounted } = useProfile();
  if (!mounted || !profile?.name) return null;
  return (
    <p className="mt-4 text-lg text-primary font-semibold animate-fade-in-up">
      Assalamu alaikum, {profile.name} 🌙 Ready for tonight&apos;s story?
    </p>
  );
}
