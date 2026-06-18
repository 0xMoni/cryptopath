"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Quiz {
  question: string;
  options: string[];
  correctIndex: number;
}

export function QuizClient({
  quiz,
  nextHref,
  isLast,
}: {
  quiz: Quiz;
  nextHref: string;
  isLast: boolean;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="space-y-3">
        {quiz.options.map((option, i) => (
          <Link
            key={i}
            href={`?answer=${i}`}
            className="block w-full text-left p-4 rounded-xl text-sm font-medium bg-card border border-card-border glow-card"
          >
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 bg-surface border border-card-border text-foreground/50">
                {String.fromCharCode(65 + i)}
              </span>
              <span>{option}</span>
            </div>
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="space-y-3">
        {quiz.options.map((option, i) => {
          let style = "bg-card border border-card-border glow-card";
          let circleStyle =
            "bg-surface border border-card-border text-foreground/50";
          let circleText = String.fromCharCode(65 + i);

          if (selected !== null) {
            if (i === quiz.correctIndex) {
              style =
                "bg-success/10 border-2 border-success shadow-md shadow-success/10";
              circleStyle = "bg-success text-white";
              circleText = "✓";
            } else if (i === selected) {
              style = "bg-danger/10 border-2 border-danger";
              circleStyle = "bg-danger text-white";
              circleText = "✗";
            } else {
              style = "bg-card border border-card-border opacity-40";
            }
          }

          return (
            <button
              key={i}
              onClick={() => selected === null && setSelected(i)}
              disabled={selected !== null}
              className={`w-full text-left p-4 rounded-xl text-sm font-medium transition-all ${style}`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${circleStyle}`}
                >
                  {circleText}
                </span>
                <span>{option}</span>
              </div>
            </button>
          );
        })}
      </div>

      {selected !== null && (
        <>
          <div className="mt-5 p-4 rounded-xl bg-surface border border-card-border">
            <p
              className={`text-sm font-bold ${
                selected === quiz.correctIndex ? "text-success" : "text-danger"
              }`}
            >
              {selected === quiz.correctIndex
                ? "🎉 Correct! Nice one."
                : `Not quite — the answer is: "${quiz.options[quiz.correctIndex]}"`}
            </p>
          </div>

          <Link
            href={nextHref}
            className="block w-full gradient-btn py-4 rounded-xl font-bold text-sm shadow-lg shadow-accent/25 text-center mt-6"
          >
            {isLast ? "See My Results 🎉" : "Next Question →"}
          </Link>
        </>
      )}
    </div>
  );
}
