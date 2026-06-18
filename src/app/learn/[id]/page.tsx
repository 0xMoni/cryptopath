import Link from "next/link";
import { levels } from "@/data/levels";
import { redirect } from "next/navigation";

export default async function LevelPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const levelId = Number(id);
  const level = levels.find((l) => l.id === levelId);

  if (!level) redirect("/learn");

  return (
    <div className="px-5 py-6 max-w-lg mx-auto">
      <Link
        href="/learn"
        className="inline-flex items-center gap-1 text-sm text-accent font-bold mb-8"
      >
        ← Back
      </Link>

      {/* Hero */}
      <div className="text-center mb-8">
        <div className="w-24 h-24 rounded-full gradient-btn flex items-center justify-center text-5xl mx-auto mb-4 shadow-xl shadow-accent/25">
          {level.icon}
        </div>
        <p className="text-xs font-bold text-accent uppercase tracking-widest mb-1">Level {level.id}</p>
        <h1 className="text-2xl font-extrabold text-foreground mb-2">
          {level.title}
        </h1>
        <p className="text-foreground/50 text-sm">
          {level.description}
        </p>
      </div>

      {/* What you'll learn */}
      <div className="bg-white rounded-2xl p-5 border border-card-border shadow-md shadow-accent/5 mb-6">
        <h2 className="text-sm font-bold text-foreground mb-4">What you&apos;ll learn:</h2>
        <div className="space-y-3">
          {level.lessons.map((lesson, i) => (
            <div key={lesson.id} className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full gradient-btn flex items-center justify-center text-xs font-bold text-white shrink-0">
                {i + 1}
              </div>
              <span className="text-sm text-foreground/70 pt-0.5">{lesson.question}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-3 border-t border-card-border flex items-center gap-2">
          <span className="text-lg">🧠</span>
          <span className="text-sm text-accent font-semibold">+ {level.quiz.length} quiz questions</span>
        </div>
      </div>

      {/* Time estimate */}
      <div className="text-center mb-6">
        <span className="inline-flex items-center gap-2 bg-accent/5 text-accent text-xs font-semibold px-4 py-2 rounded-full border border-accent/10">
          ⏱ Takes about 5 minutes
        </span>
      </div>

      <Link
        href={`/learn/${level.id}/1`}
        className="block w-full gradient-btn py-4 rounded-xl font-bold text-base shadow-xl shadow-accent/25 text-center active:opacity-90"
      >
        Let&apos;s Go! 🚀
      </Link>
    </div>
  );
}
