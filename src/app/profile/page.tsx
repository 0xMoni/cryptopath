import { cookies } from "next/headers";
import Link from "next/link";
import { badges } from "@/data/badges";
import { levels } from "@/data/levels";

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

const AVATARS = ["🧑‍🚀", "🦊", "🐱", "🦁", "🐼", "🦄", "🐉", "🎭", "👾", "🤖"];
const NAMES = ["Crypto Explorer", "Diamond Hands", "Moon Walker", "DeFi Degen", "HODLer", "Satoshi Jr"];

function computeEarnedBadges(
  completedLevels: number[],
  sim: SimData | null
): Set<string> {
  const earned = new Set<string>();
  if (completedLevels.includes(1)) earned.add("first-steps");
  if (completedLevels.includes(2)) earned.add("safety-first");
  if (completedLevels.includes(3)) earned.add("smart-shopper");
  if (completedLevels.includes(4)) earned.add("beyond-basic");
  if ([1, 2, 3, 4].every((l) => completedLevels.includes(l))) earned.add("scholar");
  if (sim) {
    if (sim.totalTrades >= 1) earned.add("paper-trader");
    const holdings = sim.holdings || [];
    if (holdings.length >= 3) earned.add("diversified");
    if (sim.diamondHands) earned.add("diamond-hands");
    if (sim.profitTrades && sim.profitTrades > 0) earned.add("profit-taker");
    const holdingsValue = holdings.reduce((sum, h) => sum + h.amount * h.avgPrice, 0);
    if (sim.balance + holdingsValue > 5000) earned.add("whale");
  }
  return earned;
}

export default async function ProfilePage({
  searchParams,
}: {
  searchParams: Promise<{ avatar?: string; name?: string; setavatar?: string; setname?: string }>;
}) {
  const params = await searchParams;
  const cookieStore = await cookies();

  let completedLevels: number[] = [];
  const progressCookie = cookieStore.get("cryptopath-progress");
  if (progressCookie) {
    try { completedLevels = JSON.parse(progressCookie.value); } catch { completedLevels = []; }
  }

  let sim: SimData | null = null;
  const simCookie = cookieStore.get("cryptopath-sim");
  if (simCookie) {
    try { sim = JSON.parse(decodeURIComponent(simCookie.value)); } catch { sim = null; }
  }

  let profile = { name: "Crypto Explorer", avatar: "🧑‍🚀" };
  const profileCookie = cookieStore.get("cryptopath-profile");
  if (profileCookie) {
    try { profile = JSON.parse(decodeURIComponent(profileCookie.value)); } catch {}
  }

  const showAvatarPicker = params.setavatar === "1";
  const showNameEdit = params.setname === "1";
  const earnedBadges = computeEarnedBadges(completedLevels, sim);
  const earnedCount = earnedBadges.size;
  const totalTrades = sim?.totalTrades ?? 0;
  const learningProgress = Math.round((completedLevels.length / levels.length) * 100);
  const holdings = sim?.holdings || [];
  const holdingsValue = holdings.reduce((sum, h) => sum + h.amount * h.avgPrice, 0);
  const portfolioValue = (sim?.balance ?? 1000) + holdingsValue;
  const portfolioGain = portfolioValue - 1000;
  const portfolioGainPct = ((portfolioGain / 1000) * 100).toFixed(1);

  // Avatar picker
  if (showAvatarPicker) {
    return (
      <div className="px-5 py-8 max-w-lg mx-auto">
        <Link href="/profile" className="inline-flex items-center gap-1 text-sm text-accent font-semibold mb-8">
          ← Back
        </Link>
        <h1 className="text-2xl font-extrabold text-foreground mb-1">Pick Your Avatar</h1>
        <p className="text-sm text-foreground/50 mb-8">Express yourself</p>
        <div className="grid grid-cols-5 gap-4">
          {AVATARS.map((av) => (
            <Link
              key={av}
              href={`/profile?avatar=${encodeURIComponent(av)}`}
              className={`aspect-square rounded-2xl flex items-center justify-center text-3xl transition-all ${
                av === profile.avatar
                  ? "bg-accent/10 border-2 border-accent shadow-lg shadow-accent/20 scale-105"
                  : "bg-white border-2 border-transparent shadow-sm hover:shadow-md hover:scale-105"
              }`}
            >
              {av}
            </Link>
          ))}
        </div>
        {params.avatar && (
          <>
            <script dangerouslySetInnerHTML={{ __html: `(function(){var p={};try{p=JSON.parse(decodeURIComponent(document.cookie.match(/cryptopath-profile=([^;]+)/)?.[1]||'{}'))}catch(e){}p.avatar=decodeURIComponent("${encodeURIComponent(params.avatar)}");document.cookie="cryptopath-profile="+encodeURIComponent(JSON.stringify(p))+";path=/;max-age=31536000"})()` }} />
            <meta httpEquiv="refresh" content="0;url=/profile" />
          </>
        )}
      </div>
    );
  }

  // Name editor
  if (showNameEdit) {
    return (
      <div className="px-5 py-8 max-w-lg mx-auto">
        <Link href="/profile" className="inline-flex items-center gap-1 text-sm text-accent font-semibold mb-8">
          ← Back
        </Link>
        <h1 className="text-2xl font-extrabold text-foreground mb-1">Choose a Name</h1>
        <p className="text-sm text-foreground/50 mb-8">What should we call you?</p>
        <div className="flex flex-col gap-3">
          {NAMES.map((n) => (
            <Link
              key={n}
              href={`/profile?name=${encodeURIComponent(n)}`}
              className={`rounded-2xl px-5 py-4 font-semibold text-sm transition-all ${
                n === profile.name
                  ? "bg-accent/10 border-2 border-accent text-accent shadow-sm"
                  : "bg-white border-2 border-transparent shadow-sm text-foreground/70 hover:shadow-md"
              }`}
            >
              {n}
            </Link>
          ))}
        </div>
        {params.name && (
          <>
            <script dangerouslySetInnerHTML={{ __html: `(function(){var p={};try{p=JSON.parse(decodeURIComponent(document.cookie.match(/cryptopath-profile=([^;]+)/)?.[1]||'{}'))}catch(e){}p.name=decodeURIComponent("${encodeURIComponent(params.name)}");document.cookie="cryptopath-profile="+encodeURIComponent(JSON.stringify(p))+";path=/;max-age=31536000"})()` }} />
            <meta httpEquiv="refresh" content="0;url=/profile" />
          </>
        )}
      </div>
    );
  }

  return (
    <div className="px-5 pt-6 pb-24 max-w-lg mx-auto">
      {/* Profile Hero */}
      <div className="text-center mb-8">
        <Link href="/profile?setavatar=1" className="inline-block mb-4">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-accent/20 to-pink-100 flex items-center justify-center border-[3px] border-white shadow-xl shadow-accent/10 mx-auto">
            <span className="text-5xl">{profile.avatar}</span>
          </div>
        </Link>
        <Link href="/profile?setname=1" className="block">
          <h1 className="text-2xl font-extrabold text-foreground">{profile.name}</h1>
        </Link>
        <p className="text-foreground/40 text-sm mt-1">
          {earnedCount >= 8 ? "👑 Crypto Master" : earnedCount >= 5 ? "⭐ Rising Star" : earnedCount >= 2 ? "🌱 Getting Started" : "🌱 Beginner"}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
          <p className="text-2xl font-black text-foreground">{completedLevels.length}</p>
          <p className="text-[10px] text-foreground/40 font-semibold uppercase mt-1">Levels</p>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
          <p className="text-2xl font-black text-foreground">{totalTrades}</p>
          <p className="text-[10px] text-foreground/40 font-semibold uppercase mt-1">Trades</p>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
          <p className="text-2xl font-black text-foreground">{earnedCount}</p>
          <p className="text-[10px] text-foreground/40 font-semibold uppercase mt-1">Badges</p>
        </div>
      </div>

      {/* Portfolio */}
      <div className="bg-white rounded-2xl p-5 shadow-sm mb-4">
        <div className="flex items-center justify-between mb-1">
          <p className="text-xs font-semibold text-foreground/40 uppercase tracking-wide">Portfolio</p>
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${portfolioGain >= 0 ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"}`}>
            {portfolioGain >= 0 ? "↑" : "↓"} {portfolioGain >= 0 ? "+" : ""}{portfolioGainPct}%
          </span>
        </div>
        <p className="text-3xl font-black text-foreground mb-3">
          ${portfolioValue.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
        </p>
        {holdings.length > 0 ? (
          <div className="flex gap-2 flex-wrap">
            {holdings.slice(0, 3).map((h) => (
              <span key={h.coinId} className="text-[11px] font-semibold text-foreground/50 bg-surface px-2.5 py-1 rounded-full">
                {h.symbol.toUpperCase()}
              </span>
            ))}
            {holdings.length > 3 && <span className="text-[11px] text-foreground/30 py-1">+{holdings.length - 3}</span>}
          </div>
        ) : (
          <p className="text-xs text-foreground/30">Start trading to build your portfolio</p>
        )}
      </div>

      {/* Learning Progress */}
      <div className="bg-white rounded-2xl p-5 shadow-sm mb-6">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold text-foreground/40 uppercase tracking-wide">Learning</p>
          <span className="text-xs font-bold text-accent">{learningProgress}%</span>
        </div>
        <div className="w-full h-2 bg-surface rounded-full overflow-hidden mb-3">
          <div className="h-full bg-accent rounded-full" style={{ width: `${learningProgress}%` }} />
        </div>
        <div className="flex justify-between">
          {levels.map((level) => {
            const done = completedLevels.includes(level.id);
            return (
              <div key={level.id} className="flex flex-col items-center gap-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${done ? "bg-emerald-100" : "bg-surface"}`}>
                  {done ? "✓" : level.icon}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Achievements */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-base font-extrabold text-foreground">Achievements</p>
          <span className="text-xs text-foreground/30 font-semibold">{earnedCount}/{badges.length}</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {badges.map((badge) => {
            const isEarned = earnedBadges.has(badge.id);
            return (
              <div
                key={badge.id}
                className={`rounded-2xl p-4 text-center transition-all ${
                  isEarned
                    ? "bg-white shadow-sm"
                    : "bg-surface/50 opacity-40"
                }`}
              >
                <span className={`text-2xl block mb-1.5 ${isEarned ? "" : "grayscale"}`}>{badge.icon}</span>
                <p className="text-[11px] font-bold text-foreground">{badge.name}</p>
                <p className="text-[9px] text-foreground/40 mt-0.5">
                  {isEarned ? "Earned ✓" : badge.condition}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-3">
        <Link href="/wallet-guide" className="bg-white rounded-2xl p-4 shadow-sm text-center hover:shadow-md transition-shadow">
          <span className="text-xl block mb-1">👛</span>
          <p className="text-[11px] font-bold text-foreground">Wallet Guide</p>
        </Link>
        <Link href="/simulator" className="bg-white rounded-2xl p-4 shadow-sm text-center hover:shadow-md transition-shadow">
          <span className="text-xl block mb-1">📈</span>
          <p className="text-[11px] font-bold text-foreground">Trade</p>
        </Link>
      </div>
    </div>
  );
}
