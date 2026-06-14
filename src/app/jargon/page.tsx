"use client";

import { useState } from "react";
import { jargonList } from "@/data/jargon";

export default function JargonPage() {
  const [search, setSearch] = useState("");

  const filtered = jargonList.filter(
    (j) =>
      j.term.toLowerCase().includes(search.toLowerCase()) ||
      j.simple.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="px-5 py-8 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-1">
        <span className="gradient-text">Jargon Translator</span>
      </h1>
      <p className="text-foreground/50 text-sm mb-5">
        Search any crypto term. Get a human explanation.
      </p>

      <div className="relative mb-6">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/30">
          🔍
        </span>
        <input
          type="text"
          placeholder="Search... (e.g. gas fee, wallet, DeFi)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-card border border-card-border glow-card rounded-xl pl-10 pr-4 py-3.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all placeholder:text-foreground/30"
        />
      </div>

      <p className="text-xs text-foreground/40 mb-3 font-medium">
        {filtered.length} term{filtered.length !== 1 ? "s" : ""}
      </p>

      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="text-center py-10 text-foreground/40 text-sm">
            No matching terms found. Try a different search.
          </div>
        ) : (
          filtered.map((entry) => (
            <div
              key={entry.term}
              className="bg-card border border-card-border glow-card rounded-xl p-4"
            >
              <h3 className="font-bold text-accent text-sm mb-1.5">
                {entry.term}
              </h3>
              <p className="text-foreground/70 text-sm">{entry.simple}</p>
              {entry.example && (
                <p className="text-foreground/40 text-xs mt-2 pl-3 border-l-2 border-accent/30 italic">
                  {entry.example}
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
