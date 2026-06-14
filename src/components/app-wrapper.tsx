"use client";

import { useState, useEffect } from "react";
import { SplashScreen } from "./splash-screen";

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [showSplash, setShowSplash] = useState<boolean | null>(null);

  useEffect(() => {
    const seen = localStorage.getItem("cryptopath-onboarded");
    setShowSplash(!seen);
  }, []);

  function handleComplete() {
    localStorage.setItem("cryptopath-onboarded", "true");
    setShowSplash(false);
  }

  if (showSplash === null) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50">
        <h1 className="text-5xl font-bold">
          <span className="gradient-text">CryptoPath</span>
        </h1>
      </div>
    );
  }

  if (showSplash) {
    return <SplashScreen onComplete={handleComplete} />;
  }

  return <>{children}</>;
}
