"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { levels } from "@/data/levels";

type Phase = "lesson" | "quiz" | "complete";

export default function LevelPage() {
  const params = useParams();
  const router = useRouter();
  const levelId = Number(params.id);
  const level = levels.find((l) => l.id === levelId);

  const [phase, setPhase] = useState<Phase>("lesson");
  const [lessonIndex, setLessonIndex] = useState(0);
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    if (!level) router.push("/learn");
  }, [level, router]);

  if (!level) return null;

  const currentLesson = level.lessons[lessonIndex];
  const currentQuiz = level.quiz[quizIndex];
  const progress =
    phase === "lesson"
      ? ((lessonIndex + 1) / (level.lessons.length + level.quiz.length)) * 100
      : phase === "quiz"
      ? ((level.lessons.length + quizIndex + 1) /
          (level.lessons.length + level.quiz.length)) *
        100
      : 100;

  function nextLesson() {
    setShowExplanation(false);
    if (lessonIndex < level!.lessons.length - 1) {
      setLessonIndex((i) => i + 1);
    } else {
      setPhase("quiz");
    }
  }

  function submitAnswer(index: number) {
    setSelectedAnswer(index);
    if (index === currentQuiz.correctIndex) {
      setScore((s) => s + 1);
    }
  }

  function nextQuiz() {
    setSelectedAnswer(null);
    if (quizIndex < level!.quiz.length - 1) {
      setQuizIndex((i) => i + 1);
    } else {
      setPhase("complete");
      const saved = localStorage.getItem("cryptopath-progress");
      const completed: number[] = saved ? JSON.parse(saved) : [];
      if (!completed.includes(levelId)) {
        completed.push(levelId);
        localStorage.setItem("cryptopath-progress", JSON.stringify(completed));
      }
    }
  }

  return (
    <div className="px-5 py-8 max-w-lg mx-auto min-h-screen flex flex-col">
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={() => router.push("/learn")}
            className="text-sm text-foreground/50 font-medium"
          >
            ← Back
          </button>
          <span className="text-xs text-foreground/40 font-medium">
            {level.icon} {level.title}
          </span>
        </div>
        <div className="w-full h-2 bg-surface rounded-full overflow-hidden">
          <div
            className="h-full gradient-btn rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Lesson Phase */}
      {phase === "lesson" && (
        <div className="flex-1 flex flex-col">
          <div className="flex-1">
            <p className="text-xs text-accent font-bold uppercase mb-3">
              Lesson {lessonIndex + 1} of {level.lessons.length}
            </p>
            <h2 className="text-xl font-bold text-foreground mb-6">
              {currentLesson.question}
            </h2>

            <div className="bg-card border border-card-border glow-card rounded-2xl p-5 mb-4">
              <p className="gradient-text text-xs font-bold mb-2">
                Think of it as:
              </p>
              <p className="text-foreground/80 text-base leading-relaxed">
                {currentLesson.analogy}
              </p>
            </div>

            {!showExplanation ? (
              <button
                onClick={() => setShowExplanation(true)}
                className="text-sm text-accent font-medium underline underline-offset-2"
              >
                Tell me more →
              </button>
            ) : (
              <div className="bg-surface border border-card-border rounded-2xl p-5 animate-in">
                <p className="text-foreground/60 text-sm leading-relaxed">
                  {currentLesson.explanation}
                </p>
              </div>
            )}
          </div>

          <button
            onClick={nextLesson}
            className="w-full gradient-btn py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-accent/20 mt-6"
          >
            {lessonIndex < level.lessons.length - 1
              ? "Next →"
              : "Ready for Quiz! 🎯"}
          </button>
        </div>
      )}

      {/* Quiz Phase */}
      {phase === "quiz" && (
        <div className="flex-1 flex flex-col">
          <div className="flex-1">
            <p className="text-xs text-accent font-bold uppercase mb-3">
              Quiz — Question {quizIndex + 1} of {level.quiz.length}
            </p>
            <h2 className="text-lg font-bold text-foreground mb-6">
              {currentQuiz.question}
            </h2>

            <div className="space-y-3">
              {currentQuiz.options.map((option, i) => {
                let style = "bg-card border border-card-border";
                if (selectedAnswer !== null) {
                  if (i === currentQuiz.correctIndex) {
                    style = "bg-success/10 border-2 border-success";
                  } else if (i === selectedAnswer) {
                    style = "bg-danger/10 border-2 border-danger";
                  }
                }
                return (
                  <button
                    key={i}
                    onClick={() => selectedAnswer === null && submitAnswer(i)}
                    disabled={selectedAnswer !== null}
                    className={`w-full text-left p-4 rounded-xl text-sm font-medium transition-all ${style} ${
                      selectedAnswer === null
                        ? "hover:border-accent active:scale-[0.98]"
                        : ""
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>

            {selectedAnswer !== null && (
              <div className="mt-4 p-3 rounded-xl bg-surface border border-card-border">
                <p
                  className={`text-sm font-medium ${
                    selectedAnswer === currentQuiz.correctIndex
                      ? "text-success"
                      : "text-danger"
                  }`}
                >
                  {selectedAnswer === currentQuiz.correctIndex
                    ? "✓ Correct!"
                    : `✗ The answer is: ${currentQuiz.options[currentQuiz.correctIndex]}`}
                </p>
              </div>
            )}
          </div>

          {selectedAnswer !== null && (
            <button
              onClick={nextQuiz}
              className="w-full gradient-btn py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-accent/20 mt-6"
            >
              {quizIndex < level.quiz.length - 1 ? "Next Question →" : "See Results 🎉"}
            </button>
          )}
        </div>
      )}

      {/* Complete Phase */}
      {phase === "complete" && (
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <div className="text-6xl mb-4">
            {score === level.quiz.length ? "🏆" : score >= level.quiz.length / 2 ? "🎉" : "📚"}
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            {score === level.quiz.length
              ? "Perfect!"
              : score >= level.quiz.length / 2
              ? "Well done!"
              : "Keep learning!"}
          </h2>
          <p className="text-foreground/50 text-sm mb-2">
            You got {score}/{level.quiz.length} correct
          </p>
          <p className="gradient-text text-sm font-bold mb-8">
            Level {level.id} Complete ✓
          </p>

          <div className="w-full space-y-3">
            {level.id < levels.length && (
              <button
                onClick={() => router.push(`/learn/${level.id + 1}`)}
                className="w-full gradient-btn py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-accent/20"
              >
                Next Level: {levels[level.id]?.title} →
              </button>
            )}
            <button
              onClick={() => router.push("/learn")}
              className="w-full bg-card border border-card-border py-3.5 rounded-xl font-medium text-sm text-foreground/60"
            >
              Back to Path
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
