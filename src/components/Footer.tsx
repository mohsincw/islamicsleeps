import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">&#9790;</span>
              <span className="text-lg font-bold text-primary">IslamicSleeps</span>
            </div>
            <p className="text-muted text-sm leading-relaxed">
              Beautiful Islamic bedtime stories and duas to help your little ones
              drift off to sleep with peace, faith, and love in their hearts.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-3">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/stories" className="text-muted hover:text-primary transition-colors">Story Library</Link></li>
              <li><Link href="/generate" className="text-muted hover:text-primary transition-colors">Story Generator</Link></li>
              <li><Link href="/dua" className="text-muted hover:text-primary transition-colors">Daily Dua</Link></li>
              <li><Link href="/favorites" className="text-muted hover:text-primary transition-colors">My Favorites</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-3">About</h3>
            <p className="text-muted text-sm leading-relaxed">
              All stories are crafted with care to reflect authentic Islamic values
              and teachings from the Quran and Sunnah. We strive to nurture faith,
              good character, and a love for Allah in young hearts.
            </p>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-border text-center text-sm text-muted">
          <p>Bismillah — Made with love for the Ummah</p>
        </div>
      </div>
    </footer>
  );
}
