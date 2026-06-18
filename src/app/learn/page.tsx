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
      <div className="text-center mb-10">
        <h1 className="text-2xl font-extrabold gradient-text mb-1">Learn Crypto</h1>
        <p className="text-sm text-foreground/50">Tap a level to begin. No rush.</p>
      </div>

      {/* Path */}
      <div className="flex flex-col items-center gap-6">
        {levels.map((level) => {
          const unlocked = isUnlocked(level.id);
          const completed = completedLevels.includes(level.id);

          if (completed) {
            return (
              <Link key={level.id} href={`/learn/${level.id}`} className="block w-full">
                <div className="level-node-completed">
                  <div className="w-[72px] h-[72px] rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-200/50 mx-auto">
                    <span className="text-white text-3xl font-bold">✓</span>
                  </div>
                  <h3 className="text-center font-bold text-foreground text-base mt-3">
                    {level.title}
                  </h3>
                  <p className="text-center text-emerald-600 text-xs font-semibold mt-0.5">
                    Completed ✨
                  </p>
                </div>
              </Link>
            );
          }

          if (unlocked) {
            return (
              <Link key={level.id} href={`/learn/${level.id}`} className="block w-full">
                <div className="relative">
                  <div className="absolute -inset-1 gradient-btn rounded-3xl opacity-20 blur-sm" />
                  <div className="relative bg-white rounded-2xl p-6 border-2 border-accent/30 shadow-xl shadow-accent/10">
                    <div className="w-[72px] h-[72px] rounded-full gradient-btn flex items-center justify-center shadow-lg shadow-accent/30 mx-auto">
                      <span className="text-3xl">{level.icon}</span>
                    </div>
                    <h3 className="text-center font-extrabold text-foreground text-lg mt-3">
                      {level.title}
                    </h3>
                    <p className="text-center text-foreground/50 text-xs mt-1">
                      {level.description}
                    </p>
                    <div className="flex justify-center gap-4 mt-3">
                      <span className="text-xs text-accent font-semibold bg-accent/8 px-3 py-1 rounded-full">
                        {level.lessons.length} lessons
                      </span>
                      <span className="text-xs text-pink-600 font-semibold bg-pink-50 px-3 py-1 rounded-full">
                        {level.quiz.length} quizzes
                      </span>
                    </div>
                    <div className="mt-5">
                      <span className="block w-full gradient-btn py-3.5 rounded-xl font-bold text-sm text-center shadow-lg shadow-accent/25">
                        Start Level →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          }

          return (
            <div key={level.id} className="w-full">
              <div className="flex flex-col items-center opacity-40">
                <div className="w-[72px] h-[72px] rounded-full bg-gray-200 flex items-center justify-center mx-auto border-2 border-dashed border-gray-300">
                  <span className="text-2xl grayscale">{level.icon}</span>
                </div>
                <h3 className="text-center font-bold text-foreground/50 text-base mt-3">
                  {level.title}
                </h3>
                <p className="text-center text-foreground/30 text-xs mt-0.5">
                  🔒 Complete Level {level.id - 1} to unlock
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
