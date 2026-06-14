"use client";

import { useState, useEffect } from "react";

const onboardingSlides = [
  {
    icon: "🌊",
    title: "Overwhelmed by crypto?",
    subtitle: "You're not alone. 63% of people feel the same way.",
    gradient: "from-violet-100 to-pink-100",
  },
  {
    icon: "🧩",
    title: "We break it into tiny pieces",
    subtitle: "Bite-sized lessons. Real analogies. No jargon dumps.",
    gradient: "from-purple-100 to-indigo-100",
  },
  {
    icon: "🎮",
    title: "Practice without risk",
    subtitle: "Trade with fake money using real prices. Learn by doing.",
    gradient: "from-fuchsia-100 to-purple-100",
  },
  {
    icon: "🚀",
    title: "Your path to confidence",
    subtitle: "From zero knowledge to your first real investment.",
    gradient: "from-pink-100 to-rose-100",
  },
];

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"splash" | "onboarding">("splash");
  const [slideIndex, setSlideIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setPhase("onboarding"), 2000);
    return () => clearTimeout(timer);
  }, []);

  function nextSlide() {
    if (slideIndex < onboardingSlides.length - 1) {
      setFadeIn(false);
      setTimeout(() => {
        setSlideIndex((i) => i + 1);
        setFadeIn(true);
      }, 200);
    } else {
      onComplete();
    }
  }

  function skip() {
    onComplete();
  }

  if (phase === "splash") {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50">
        <div className="text-center animate-pulse">
          <h1 className="text-5xl font-bold mb-3">
            <span className="gradient-text">CryptoPath</span>
          </h1>
          <p className="text-foreground/40 text-sm">
            Your journey starts here
          </p>
        </div>
      </div>
    );
  }

  const slide = onboardingSlides[slideIndex];

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50">
      <div className="flex justify-end p-5">
        <button
          onClick={skip}
          className="text-sm text-foreground/40 font-medium"
        >
          Skip
        </button>
      </div>

      <div
        className={`flex-1 flex flex-col items-center justify-center px-8 transition-opacity duration-200 ${
          fadeIn ? "opacity-100" : "opacity-0"
        }`}
      >
        <div
          className={`w-32 h-32 rounded-full bg-gradient-to-br ${slide.gradient} flex items-center justify-center mb-8 shadow-lg`}
        >
          <span className="text-5xl">{slide.icon}</span>
        </div>
        <h2 className="text-2xl font-bold text-foreground text-center mb-3">
          {slide.title}
        </h2>
        <p className="text-foreground/50 text-center text-base max-w-xs">
          {slide.subtitle}
        </p>
      </div>

      <div className="px-8 pb-12">
        <div className="flex justify-center gap-2 mb-6">
          {onboardingSlides.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i === slideIndex
                  ? "w-8 gradient-btn"
                  : "w-2 bg-foreground/15"
              }`}
            />
          ))}
        </div>
        <button
          onClick={nextSlide}
          className="w-full gradient-btn py-4 rounded-2xl font-bold text-base shadow-lg shadow-accent/30"
        >
          {slideIndex < onboardingSlides.length - 1
            ? "Next"
            : "Let's Go! 🚀"}
        </button>
      </div>
    </div>
  );
}
