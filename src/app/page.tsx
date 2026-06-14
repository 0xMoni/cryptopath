import Link from "next/link";

export default function Home() {
  return (
    <div className="px-5 py-8 max-w-lg mx-auto">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold mb-2">
          <span className="gradient-text">CryptoPath</span>
        </h1>
        <p className="text-foreground/60 text-base">
          Zero to first investment. No jargon. No fear.
        </p>
      </div>

      <div className="gradient-surface glow-card rounded-2xl p-5 mb-8 border border-card-border">
        <p className="text-foreground/70 text-sm leading-relaxed italic">
          &ldquo;People don&rsquo;t avoid crypto because they don&rsquo;t want
          to. They avoid it because the more they try to learn, the more
          overwhelmed they get — more fear — trust fewer sources — learn less —
          stay stuck.&rdquo;
        </p>
        <p className="gradient-text text-sm mt-3 font-bold">
          We break that cycle. ⚡
        </p>
      </div>

      <div className="space-y-4">
        <Link
          href="/learn"
          className="block bg-card glow-card rounded-2xl p-5 border border-card-border hover:scale-[1.02] transition-all"
        >
          <div className="flex items-center gap-4">
            <span className="text-3xl">📚</span>
            <div>
              <h2 className="font-bold text-lg text-foreground">Learn the Basics</h2>
              <p className="text-foreground/50 text-sm">
                Bite-sized cards. 30 seconds each. Real analogies.
              </p>
            </div>
          </div>
        </Link>

        <Link
          href="/simulator"
          className="block bg-card glow-card rounded-2xl p-5 border border-card-border hover:scale-[1.02] transition-all"
        >
          <div className="flex items-center gap-4">
            <span className="text-3xl">📈</span>
            <div>
              <h2 className="font-bold text-lg text-foreground">Paper Trading</h2>
              <p className="text-foreground/50 text-sm">
                Practice with fake money. Real prices. Zero risk.
              </p>
            </div>
          </div>
        </Link>

        <Link
          href="/jargon"
          className="block bg-card glow-card rounded-2xl p-5 border border-card-border hover:scale-[1.02] transition-all"
        >
          <div className="flex items-center gap-4">
            <span className="text-3xl">🔍</span>
            <div>
              <h2 className="font-bold text-lg text-foreground">Jargon Translator</h2>
              <p className="text-foreground/50 text-sm">
                Search any crypto term. Get a human explanation.
              </p>
            </div>
          </div>
        </Link>
      </div>

      <div className="mt-10 text-center">
        <div className="inline-flex items-center gap-2 bg-success/10 border border-success/30 rounded-full px-5 py-2.5">
          <span className="text-success text-sm">✓</span>
          <span className="text-sm text-foreground/60 font-medium">
            No selling. No affiliate links. No shilling.
          </span>
        </div>
      </div>
    </div>
  );
}
