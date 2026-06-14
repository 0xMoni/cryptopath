"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { levels } from "@/data/levels";

export default function LearnPage() {
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("cryptopath-progress");
    if (saved) setCompletedLevels(JSON.parse(saved));
  }, []);

  function isUnlocked(levelId: number) {
    if (levelId === 1) return true;
    return completedLevels.includes(levelId - 1);
  }

  return (
    <div className="px-5 py-8 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-1">
        <span className="gradient-text">Your Learning Path</span>
      </h1>
      <p className="text-foreground/50 text-sm mb-6">
        Complete each level to unlock the next. No rushing.
      </p>

      <div className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-card-border z-0" />

        <div className="space-y-5 relative z-10">
          {levels.map((level) => {
            const unlocked = isUnlocked(level.id);
            const completed = completedLevels.includes(level.id);

            return (
              <div key={level.id} className="flex items-start gap-4">
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl shrink-0 ${
                    completed
                      ? "gradient-btn shadow-lg shadow-accent/20"
                      : unlocked
                      ? "bg-card border-2 border-accent"
                      : "bg-surface border border-card-border opacity-50"
                  }`}
                >
                  {completed ? "✓" : level.icon}
                </div>

                <div className="flex-1 pt-1">
                  {unlocked ? (
                    <Link href={`/learn/${level.id}`}>
                      <h3 className="font-bold text-foreground text-base mb-0.5">
                        {level.title}
                      </h3>
                      <p className="text-foreground/50 text-xs mb-2">
                        {level.description}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-medium text-accent bg-accent/10 rounded-full px-2.5 py-0.5">
                          {level.lessons.length} lessons
                        </span>
                        <span className="text-[10px] font-medium text-success bg-success/10 rounded-full px-2.5 py-0.5">
                          {level.quiz.length} quiz questions
                        </span>
                      </div>
                      {unlocked && !completed && (
                        <button className="mt-3 gradient-btn text-xs font-medium px-4 py-2 rounded-full shadow-lg shadow-accent/20">
                          {completedLevels.includes(level.id - 1) || level.id === 1
                            ? "Start Level"
                            : "Continue"}
                        </button>
                      )}
                    </Link>
                  ) : (
                    <div className="opacity-50">
                      <h3 className="font-bold text-foreground/60 text-base mb-0.5">
                        {level.title}
                      </h3>
                      <p className="text-foreground/40 text-xs mb-2">
                        {level.description}
                      </p>
                      <span className="text-[10px] font-medium text-foreground/40 bg-surface rounded-full px-2.5 py-0.5 border border-card-border">
                        🔒 Complete Level {level.id - 1} to unlock
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
