import Link from "next/link";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = await cookies();

  // Redirect first-time users to onboarding
  const onboarded = cookieStore.get("cryptopath-onboarded");
  const progressCookie = cookieStore.get("cryptopath-progress");
  const completedLevels: number[] = progressCookie
    ? JSON.parse(progressCookie.value)
    : [];

  const simCookie = cookieStore.get("cryptopath-sim");
  let totalTrades = 0;
  if (simCookie) {
    try {
      const sim = JSON.parse(decodeURIComponent(simCookie.value));
      totalTrades = sim.totalTrades ?? 0;
    } catch {}
  }

  const hasStarted = completedLevels.length > 0 || totalTrades > 0;

  if (!onboarded && !hasStarted) {
    return (
      <>
        <meta httpEquiv="refresh" content="0;url=/onboarding" />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 rounded-2xl gradient-btn flex items-center justify-center mx-auto mb-4 shadow-lg shadow-accent/25">
              <span className="text-3xl">₿</span>
            </div>
            <p className="text-foreground/40 text-sm">Loading...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="px-5 pt-10 pb-24 max-w-lg mx-auto">
      {/* Hero */}
      <div className="text-center mb-10">
        <div className="w-16 h-16 rounded-2xl gradient-btn flex items-center justify-center mx-auto mb-4 shadow-lg shadow-accent/25">
          <span className="text-3xl">₿</span>
        </div>
        <h1 className="text-3xl font-black text-foreground mb-2">CryptoPath</h1>
        <p className="text-foreground/50 text-[15px] leading-relaxed max-w-xs mx-auto">
          {hasStarted ? "Welcome back! Keep learning." : "Zero to first investment. No jargon. No fear."}
        </p>
      </div>

      {/* Progress indicator for returning users */}
      {hasStarted && (
        <div className="bg-white rounded-2xl p-4 shadow-sm mb-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
            <span className="text-xl">🔥</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-foreground">Your Progress</p>
            <p className="text-xs text-foreground/40">
              {completedLevels.length} levels · {totalTrades} trades
            </p>
          </div>
          <Link href="/profile" className="text-accent text-xs font-bold">
            View →
          </Link>
        </div>
      )}

      {/* Feature Cards */}
      <div className="space-y-3 mb-8">
        <Link href="/learn" className="block">
          <div className="bg-white rounded-2xl p-5 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-violet-50 flex items-center justify-center shrink-0">
              <span className="text-2xl">📚</span>
            </div>
            <div className="flex-1">
              <h2 className="font-bold text-[15px] text-foreground">Learn</h2>
              <p className="text-foreground/40 text-xs mt-0.5">Bite-sized lessons with real analogies</p>
            </div>
            <span className="text-foreground/20 text-lg">›</span>
          </div>
        </Link>

        <Link href="/simulator" className="block">
          <div className="bg-white rounded-2xl p-5 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
              <span className="text-2xl">📈</span>
            </div>
            <div className="flex-1">
              <h2 className="font-bold text-[15px] text-foreground">Paper Trade</h2>
              <p className="text-foreground/40 text-xs mt-0.5">Practice with fake money, real prices</p>
            </div>
            <span className="text-foreground/20 text-lg">›</span>
          </div>
        </Link>

        <Link href="/jargon" className="block">
          <div className="bg-white rounded-2xl p-5 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-pink-50 flex items-center justify-center shrink-0">
              <span className="text-2xl">🔍</span>
            </div>
            <div className="flex-1">
              <h2 className="font-bold text-[15px] text-foreground">Jargon Buster</h2>
              <p className="text-foreground/40 text-xs mt-0.5">Crypto terms in plain English</p>
            </div>
            <span className="text-foreground/20 text-lg">›</span>
          </div>
        </Link>

        <Link href="/wallet-guide" className="block">
          <div className="bg-white rounded-2xl p-5 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
              <span className="text-2xl">👛</span>
            </div>
            <div className="flex-1">
              <h2 className="font-bold text-[15px] text-foreground">Wallet Setup</h2>
              <p className="text-foreground/40 text-xs mt-0.5">Get ready for your first real purchase</p>
            </div>
            <span className="text-foreground/20 text-lg">›</span>
          </div>
        </Link>
      </div>

      {/* Trust badge */}
      <div className="text-center">
        <p className="text-[11px] text-foreground/30 font-medium">
          No selling · No affiliate links · Just learning
        </p>
      </div>
    </div>
  );
}
