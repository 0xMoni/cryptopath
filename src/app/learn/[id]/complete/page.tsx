import Link from "next/link";
import { cookies } from "next/headers";
import { levels } from "@/data/levels";
import { redirect } from "next/navigation";

export default async function CompletePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const levelId = Number(id);
  const level = levels.find((l) => l.id === levelId);
  const nextLevel = levels.find((l) => l.id === levelId + 1);

  if (!level) redirect("/learn");

  const cookieStore = await cookies();
  const progressCookie = cookieStore.get("cryptopath-progress");
  const completed: number[] = progressCookie
    ? JSON.parse(progressCookie.value)
    : [];

  if (!completed.includes(levelId)) {
    completed.push(levelId);
  }

  return (
    <div className="px-5 py-10 max-w-lg mx-auto text-center">
      <SaveProgress completed={completed} />

      {/* Celebration card */}
      <div className="bg-white rounded-3xl p-8 border border-card-border/30 shadow-lg shadow-accent/5 mb-6">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center text-4xl mx-auto mb-5 shadow-md shadow-amber-200/50">
          🏆
        </div>
        <h1 className="text-2xl font-extrabold text-foreground mb-1">
          Level Complete!
        </h1>
        <p className="gradient-text text-base font-bold mb-3">
          {level.icon} {level.title}
        </p>
        <p className="text-foreground/40 text-sm">
          You&apos;re building real knowledge. Keep going!
        </p>

        {/* Stats */}
        <div className="flex items-center justify-center gap-6 mt-6 pt-5 border-t border-card-border/30">
          <div className="text-center">
            <p className="text-xl font-extrabold text-foreground">{level.lessons.length}</p>
            <p className="text-[10px] text-foreground/40">Lessons</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-extrabold text-success">{level.quiz.length}</p>
            <p className="text-[10px] text-foreground/40">Quizzes Passed</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-extrabold text-accent">{completed.length}/{levels.length}</p>
            <p className="text-[10px] text-foreground/40">Total Progress</p>
          </div>
        </div>
      </div>

      <div className="w-full space-y-3">
        {nextLevel && (
          <Link
            href={`/learn/${nextLevel.id}`}
            className="block w-full gradient-btn py-4 rounded-xl font-bold text-sm shadow-lg shadow-accent/25 text-center active:opacity-90"
          >
            Next: {nextLevel.icon} {nextLevel.title} →
          </Link>
        )}
        <Link
          href="/learn"
          className="block w-full bg-white border border-card-border/50 py-3.5 rounded-xl font-medium text-sm text-foreground/50 text-center"
        >
          Back to Path
        </Link>
      </div>
    </div>
  );
}

function SaveProgress({ completed }: { completed: number[] }) {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `document.cookie="cryptopath-progress=${JSON.stringify(completed)};path=/;max-age=31536000";localStorage.setItem("cryptopath-progress",JSON.stringify(${JSON.stringify(completed)}))`,
      }}
    />
  );
}
