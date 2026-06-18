import Link from "next/link";
import { levels } from "@/data/levels";
import { redirect } from "next/navigation";

export default async function StepPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string; step: string }>;
  searchParams: Promise<{ answer?: string }>;
}) {
  const { id, step } = await params;
  const { answer } = await searchParams;
  const levelId = Number(id);
  const stepNum = Number(step);
  const level = levels.find((l) => l.id === levelId);

  if (!level) redirect("/learn");

  const totalLessons = level.lessons.length;
  const totalSteps = totalLessons + level.quiz.length;
  const isQuiz = stepNum > totalLessons;
  const quizIndex = stepNum - totalLessons - 1;
  const lessonIndex = stepNum - 1;
  const progress = (stepNum / totalSteps) * 100;
  const isLastStep = stepNum >= totalSteps;

  if (stepNum < 1 || stepNum > totalSteps) redirect(`/learn/${levelId}`);

  const nextHref = isLastStep
    ? `/learn/${levelId}/complete`
    : `/learn/${levelId}/${stepNum + 1}`;

  // QUIZ PAGE
  if (isQuiz) {
    const quiz = level.quiz[quizIndex];
    const answered = answer !== undefined ? Number(answer) : null;
    const isCorrect = answered === quiz.correctIndex;

    return (
      <div className="px-5 py-6 max-w-lg mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <Link href="/learn" className="text-sm text-accent font-bold">
              ← Back
            </Link>
            <span className="text-xs text-foreground/50 font-semibold">
              {stepNum}/{totalSteps}
            </span>
          </div>
          <div className="w-full h-3 bg-surface rounded-full overflow-hidden border border-card-border">
            <div
              className="h-full gradient-btn rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="inline-flex items-center gap-2 bg-pink-50 text-pink-600 text-xs font-bold px-3 py-1.5 rounded-full mb-4">
          🧠 Quiz — Question {quizIndex + 1} of {level.quiz.length}
        </div>
        <h2 className="text-lg font-extrabold text-foreground mb-6 leading-tight">
          {quiz.question}
        </h2>

        <div className="space-y-3">
          {quiz.options.map((option, i) => {
            let style = "bg-card border border-card-border glow-card";
            let circleStyle = "bg-surface border border-card-border text-foreground/50";
            let circleText = String.fromCharCode(65 + i);

            if (answered !== null) {
              if (i === quiz.correctIndex) {
                style = "bg-success/10 border-2 border-success shadow-md shadow-success/10";
                circleStyle = "bg-success text-white";
                circleText = "✓";
              } else if (i === answered) {
                style = "bg-danger/10 border-2 border-danger";
                circleStyle = "bg-danger text-white";
                circleText = "✗";
              } else {
                style = "bg-card border border-card-border opacity-40";
              }
            }

            if (answered !== null) {
              return (
                <div
                  key={i}
                  className={`w-full text-left p-4 rounded-xl text-sm font-medium ${style}`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${circleStyle}`}>
                      {circleText}
                    </span>
                    <span>{option}</span>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={i}
                href={`/learn/${levelId}/${stepNum}?answer=${i}`}
                className={`block w-full text-left p-4 rounded-xl text-sm font-medium transition-all ${style} active:opacity-70`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${circleStyle}`}>
                    {circleText}
                  </span>
                  <span>{option}</span>
                </div>
              </Link>
            );
          })}
        </div>

        {answered !== null && (
          <>
            {isCorrect ? (
              <div className="mt-6 rounded-2xl overflow-hidden border-2 border-success bg-gradient-to-br from-success/5 to-success/10 animate-slide-up animate-pulse-success">
                <div className="bg-success/10 px-5 py-3 border-b border-success/20">
                  <p className="text-success font-bold text-base">
                    🎉 Correct! You're getting it!
                  </p>
                </div>
                <div className="px-5 py-4">
                  <p className="text-xs font-bold text-success/70 uppercase tracking-wide mb-1">
                    Mind-blowing fact:
                  </p>
                  <p className="text-foreground/70 text-sm leading-relaxed">
                    {quiz.funFact}
                  </p>
                </div>
              </div>
            ) : (
              <div className="mt-6 rounded-2xl overflow-hidden border-2 border-danger bg-gradient-to-br from-danger/5 to-danger/10 animate-slide-up animate-pulse-danger">
                <div className="bg-danger/10 px-5 py-3 border-b border-danger/20">
                  <p className="text-danger font-bold text-base">
                    Not quite — but that's how you learn!
                  </p>
                </div>
                <div className="px-5 py-4">
                  <p className="text-xs font-bold text-danger/70 uppercase tracking-wide mb-1">
                    Here's why:
                  </p>
                  <p className="text-foreground/70 text-sm leading-relaxed">
                    {quiz.whyWrong}
                  </p>
                </div>
              </div>
            )}

            <Link
              href={nextHref}
              className="block w-full gradient-btn py-4 rounded-xl font-bold text-sm shadow-lg shadow-accent/25 text-center mt-6 active:opacity-90"
            >
              {isLastStep ? "See My Results 🎉" : "Next Question →"}
            </Link>
          </>
        )}
      </div>
    );
  }

  // LESSON PAGE
  const lesson = level.lessons[lessonIndex];

  return (
    <div className="px-5 py-6 max-w-lg mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <Link href="/learn" className="text-sm text-accent font-bold">
            ← Back
          </Link>
          <span className="text-xs text-foreground/50 font-semibold">
            {stepNum}/{totalSteps}
          </span>
        </div>
        <div className="w-full h-3 bg-surface rounded-full overflow-hidden border border-card-border">
          <div
            className="h-full gradient-btn rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Lesson label */}
      <div className="inline-flex items-center gap-2 bg-accent/10 text-accent text-xs font-bold px-3 py-1.5 rounded-full mb-4">
        📖 Lesson {lessonIndex + 1} of {totalLessons}
      </div>

      <h2 className="text-xl font-extrabold text-foreground mb-6 leading-tight">
        {lesson.question}
      </h2>

      {/* Analogy card - the star of the show */}
      <div className="bg-white rounded-2xl p-6 border-2 border-accent/15 shadow-lg shadow-accent/5 mb-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl">💡</span>
          <span className="text-xs font-bold text-accent uppercase tracking-wide">Think of it like this</span>
        </div>
        <p className="text-foreground text-lg leading-relaxed font-semibold">
          &ldquo;{lesson.analogy}&rdquo;
        </p>
      </div>

      {/* Expand for more */}
      <details className="bg-surface rounded-xl overflow-hidden mb-8 group border border-card-border">
        <summary className="p-4 cursor-pointer flex items-center justify-between text-sm font-semibold text-foreground/60 list-none">
          <span>📚 Want the full explanation?</span>
          <span className="text-lg text-accent transition-transform group-open:rotate-45">+</span>
        </summary>
        <div className="px-4 pb-4 pt-0 border-t border-card-border">
          <p className="text-foreground/70 text-sm leading-relaxed pt-3">
            {lesson.explanation}
          </p>
        </div>
      </details>

      <Link
        href={nextHref}
        className="block w-full gradient-btn py-4 rounded-xl font-bold text-base shadow-xl shadow-accent/25 text-center active:opacity-90"
      >
        {stepNum < totalLessons ? "Next Lesson →" : "I'm Ready for the Quiz! 🎯"}
      </Link>
    </div>
  );
}
