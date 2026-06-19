import Link from "next/link";
import { cookies } from "next/headers";
import { levels } from "@/data/levels";

export default async function LearnPage() {
  const cookieStore = await cookies();
  const progressCookie = cookieStore.get("cryptopath-progress");
  const completedLevels: number[] = progressCookie
    ? JSON.parse(progressCookie.value)
    : [];

  function isUnlocked(levelId: number) {
    if (levelId === 1) return true;
    return completedLevels.includes(levelId - 1);
  }

  return (
    <div className="px-5 pt-8 pb-10 max-w-lg mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-extrabold gradient-text mb-1">Learn Crypto</h1>
        <p className="text-sm text-foreground/50">Tap a level to begin. No rush.</p>
      </div>

      {/* Path */}
      <div className="flex flex-col items-center gap-5">
        {levels.map((level) => {
          const unlocked = isUnlocked(level.id);
          const completed = completedLevels.includes(level.id);

          if (completed) {
            return (
              <Link key={level.id} href={`/learn/${level.id}`} className="block w-full">
                <div className="bg-white rounded-2xl p-4 border border-emerald-200 shadow-sm flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-md shadow-emerald-200/50 shrink-0">
                    <span className="text-white text-2xl font-bold">✓</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground text-[15px]">
                      {level.icon} {level.title}
                    </h3>
                    <p className="text-emerald-600 text-xs font-semibold mt-0.5">
                      Completed ✨
                    </p>
                  </div>
                  <span className="text-foreground/20 text-lg">›</span>
                </div>
              </Link>
            );
          }

          if (unlocked) {
            return (
              <Link key={level.id} href={`/learn/${level.id}`} className="block w-full">
                <div className="relative">
                  <div className="absolute -inset-0.5 gradient-btn rounded-2xl opacity-30 blur-[2px]" />
                  <div className="relative bg-white rounded-2xl p-5 shadow-lg shadow-accent/10">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 rounded-full gradient-btn flex items-center justify-center shadow-md shadow-accent/30 shrink-0">
                        <span className="text-2xl">{level.icon}</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-[10px] font-bold text-accent uppercase tracking-wider">Level {level.id}</p>
                        <h3 className="font-extrabold text-foreground text-lg leading-tight">
                          {level.title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-foreground/50 text-sm mb-3">
                      {level.description}
                    </p>
                    <div className="flex gap-3 mb-4">
                      <span className="text-xs text-accent font-semibold bg-accent/8 px-3 py-1 rounded-full">
                        📖 {level.lessons.length} lessons
                      </span>
                      <span className="text-xs text-pink-600 font-semibold bg-pink-50 px-3 py-1 rounded-full">
                        🧠 {level.quiz.length} quizzes
                      </span>
                    </div>
                    <span className="block w-full gradient-btn py-3.5 rounded-xl font-bold text-sm text-center shadow-lg shadow-accent/25">
                      Start Level →
                    </span>
                  </div>
                </div>
              </Link>
            );
          }

          return (
            <div key={level.id} className="w-full">
              <div className="bg-surface/80 rounded-2xl p-4 border border-card-border/50 flex items-center gap-4 opacity-50">
                <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center shrink-0 border-2 border-dashed border-gray-300">
                  <span className="text-xl grayscale">{level.icon}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-foreground/50 text-[15px]">
                    {level.title}
                  </h3>
                  <p className="text-foreground/30 text-xs mt-0.5">
                    🔒 Complete Level {level.id - 1} to unlock
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
