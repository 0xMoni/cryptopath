import { cookies } from "next/headers";
import Link from "next/link";
import { badges } from "@/data/badges";

interface Holding {
  coinId: string;
  symbol: string;
  name: string;
  amount: number;
  avgPrice: number;
}

interface SimData {
  balance: number;
  holdings: Holding[];
  totalTrades: number;
  profitTrades?: number;
  diamondHands?: boolean;
}

function computeEarnedBadges(
  completedLevels: number[],
  sim: SimData | null
): Set<string> {
  const earned = new Set<string>();

  // Level completion badges
  if (completedLevels.includes(1)) earned.add("first-steps");
  if (completedLevels.includes(2)) earned.add("safety-first");
  if (completedLevels.includes(3)) earned.add("smart-shopper");
  if (completedLevels.includes(4)) earned.add("beyond-basic");
  if (
    completedLevels.includes(1) &&
    completedLevels.includes(2) &&
    completedLevels.includes(3) &&
    completedLevels.includes(4)
  ) {
    earned.add("scholar");
  }

  // Trading badges
  if (sim) {
    if (sim.totalTrades >= 1) earned.add("paper-trader");

    const holdings = sim.holdings || [];
    if (holdings.length >= 3) earned.add("diversified");

    if (sim.diamondHands) earned.add("diamond-hands");
    if (sim.profitTrades && sim.profitTrades > 0) earned.add("profit-taker");

    // Calculate portfolio value
    const holdingsValue = holdings.reduce((sum, h) => {
      return sum + h.amount * h.avgPrice;
    }, 0);
    const totalValue = sim.balance + holdingsValue;
    if (totalValue > 5000) earned.add("whale");
  }

  return earned;
}

export default async function ProfilePage() {
  const cookieStore = await cookies();

  // Read progress cookie
  let completedLevels: number[] = [];
  const progressCookie = cookieStore.get("cryptopath-progress");
  if (progressCookie) {
    try {
      completedLevels = JSON.parse(progressCookie.value);
    } catch {
      completedLevels = [];
    }
  }

  // Read simulator cookie
  let sim: SimData | null = null;
  const simCookie = cookieStore.get("cryptopath-sim");
  if (simCookie) {
    try {
      sim = JSON.parse(decodeURIComponent(simCookie.value));
    } catch {
      sim = null;
    }
  }

  const earnedBadges = computeEarnedBadges(completedLevels, sim);
  const totalTrades = sim?.totalTrades ?? 0;
  const earnedCount = earnedBadges.size;

  return (
    <div className="px-5 py-8 max-w-lg mx-auto">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-accent to-pink-500 flex items-center justify-center shadow-lg">
          <span className="text-4xl">🧑‍🚀</span>
        </div>
        <h1 className="text-2xl font-bold text-foreground">Crypto Explorer</h1>
        <p className="text-foreground/50 text-sm mt-1">
          On a mission to master crypto
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        <div className="bg-card glow-card rounded-2xl p-4 border border-card-border text-center">
          <p className="text-2xl font-bold gradient-text">
            {completedLevels.length}
          </p>
          <p className="text-foreground/50 text-xs mt-1">Levels Done</p>
        </div>
        <div className="bg-card glow-card rounded-2xl p-4 border border-card-border text-center">
          <p className="text-2xl font-bold gradient-text">{totalTrades}</p>
          <p className="text-foreground/50 text-xs mt-1">Trades Made</p>
        </div>
        <div className="bg-card glow-card rounded-2xl p-4 border border-card-border text-center">
          <p className="text-2xl font-bold gradient-text">{earnedCount}</p>
          <p className="text-foreground/50 text-xs mt-1">Badges</p>
        </div>
      </div>

      {/* Badges Section */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-foreground mb-4">
          🏅 Your Badges
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {badges.map((badge) => {
            const isEarned = earnedBadges.has(badge.id);
            return (
              <div
                key={badge.id}
                className={`rounded-2xl p-4 border text-center ${
                  isEarned
                    ? "bg-card glow-card border-card-border"
                    : "bg-surface/50 border-card-border/50 opacity-50"
                }`}
              >
                <div className="text-3xl mb-2">
                  {isEarned ? badge.icon : "🔒"}
                </div>
                <p
                  className={`text-sm font-bold ${
                    isEarned ? "text-foreground" : "text-foreground/40"
                  }`}
                >
                  {badge.name}
                </p>
                <p
                  className={`text-xs mt-1 ${
                    isEarned ? "text-foreground/60" : "text-foreground/30"
                  }`}
                >
                  {isEarned ? badge.description : badge.condition}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Wallet Guide Link */}
      <Link
        href="/wallet-guide"
        className="block bg-card glow-card rounded-2xl p-5 border border-card-border hover:scale-[1.02] transition-transform"
      >
        <div className="flex items-center gap-4">
          <span className="text-3xl">👛</span>
          <div>
            <h2 className="font-bold text-lg text-foreground">Wallet Guide</h2>
            <p className="text-foreground/50 text-sm">
              Ready to go real? Learn how to set up your first wallet.
            </p>
          </div>
        </div>
      </Link>

      {/* Back to home */}
      <div className="mt-6 text-center">
        <Link
          href="/"
          className="text-accent text-sm font-medium hover:underline"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
