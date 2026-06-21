import Link from "next/link";

const steps = [
  {
    id: 1,
    emoji: "👛",
    title: "What's a Wallet?",
    explanation:
      "A crypto wallet is like a bank account that only YOU control. No bank, no middleman. It stores your private keys — the passwords that prove you own your crypto.",
    analogy:
      "Think of it like a mailbox: anyone can send letters (crypto) to your address, but only you have the key to open it and take things out.",
    tip: {
      type: "info" as const,
      text: "A wallet doesn't actually store your coins — they live on the blockchain. Your wallet stores the keys to access them.",
    },
  },
  {
    id: 2,
    emoji: "📥",
    title: "Download MetaMask",
    explanation:
      "MetaMask is the most popular crypto wallet for beginners. It works as a browser extension (Chrome, Firefox, Brave) or as a mobile app (iOS/Android).",
    analogy:
      "It's like downloading your banking app — except this one works with thousands of crypto networks and apps.",
    tip: {
      type: "warning" as const,
      text: "Only download from metamask.io or official app stores. Fake MetaMask apps exist and will steal your funds!",
    },
  },
  {
    id: 3,
    emoji: "🔑",
    title: "Create Your Wallet",
    explanation:
      'Open MetaMask and click "Create a new wallet." You\'ll set a strong password (8+ characters). This password locks the app on your device — it\'s NOT your recovery key.',
    analogy:
      "Your password is like the lock on your front door — it keeps casual intruders out, but the real security is your seed phrase (next step).",
    tip: {
      type: "info" as const,
      text: "Use a unique password you don't use anywhere else. A password manager can help you generate and remember it.",
    },
  },
  {
    id: 4,
    emoji: "📝",
    title: "Save Your Seed Phrase",
    explanation:
      "MetaMask will show you 12 random words. This is your seed phrase (also called recovery phrase). It's the MASTER KEY to your wallet. If you lose your device, these 12 words are the only way to recover your funds.",
    analogy:
      "Your seed phrase is like the deed to your house. Lose it, and you lose everything. Share it, and someone else owns your house.",
    tip: {
      type: "danger" as const,
      text: "Write it on PAPER. Never screenshot it, never save it digitally, never share it with anyone. No legitimate service will ever ask for it.",
    },
  },
  {
    id: 5,
    emoji: "🎉",
    title: "You're Ready!",
    explanation:
      "Your wallet is set up! You now have a public address (like an email — safe to share) that you can use to receive crypto. You can connect to decentralized apps, swap tokens, and explore Web3.",
    analogy:
      "You just got your passport to the crypto world. Your public address is your identity, and your seed phrase is your master backup.",
    tip: {
      type: "info" as const,
      text: "Start small. Don't put in more money than you can afford to lose while you're learning. Practice with small amounts first.",
    },
  },
];

export default async function WalletGuidePage({
  searchParams,
}: {
  searchParams: Promise<{ step?: string }>;
}) {
  const params = await searchParams;
  const currentStep = Math.min(
    Math.max(parseInt(params.step || "1", 10) || 1, 1),
    5
  );
  const step = steps[currentStep - 1];
  const progress = (currentStep / 5) * 100;

  return (
    <div className="px-5 pt-8 pb-10 max-w-lg mx-auto">
      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-foreground/50 font-medium mb-6"
      >
        ← Back to Home
      </Link>

      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-extrabold gradient-text mb-1">
          Wallet Setup Guide
        </h1>
        <p className="text-sm text-foreground/50">
          Set up your first MetaMask wallet in 5 easy steps
        </p>
      </div>

      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-bold text-accent">
            Step {currentStep} of 5
          </span>
          <span className="text-xs text-foreground/40 font-medium">
            {Math.round(progress)}% complete
          </span>
        </div>
        <div className="w-full h-2.5 bg-surface rounded-full overflow-hidden border border-card-border">
          <div
            className="h-full gradient-btn rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        {/* Step dots */}
        <div className="flex justify-between mt-3 px-1">
          {steps.map((s) => (
            <Link
              key={s.id}
              href={`/wallet-guide?step=${s.id}`}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                s.id === currentStep
                  ? "gradient-btn shadow-md shadow-accent/25"
                  : s.id < currentStep
                  ? "bg-success/15 text-success border border-success/30"
                  : "bg-surface text-foreground/40 border border-card-border"
              }`}
            >
              {s.id < currentStep ? "✓" : s.id}
            </Link>
          ))}
        </div>
      </div>

      {/* Step Card */}
      <div className="bg-card rounded-2xl p-6 border border-card-border glow-card mb-5">
        {/* Emoji + Title */}
        <div className="text-center mb-5">
          <span className="text-5xl block mb-3">{step.emoji}</span>
          <h2 className="text-xl font-extrabold text-foreground">
            {step.title}
          </h2>
        </div>

        {/* Explanation */}
        <p className="text-foreground/70 text-[15px] leading-relaxed mb-4">
          {step.explanation}
        </p>

        {/* Analogy */}
        <div className="bg-surface rounded-xl p-4 border border-card-border mb-5">
          <p className="text-xs font-bold text-accent uppercase tracking-wider mb-1">
            💡 Think of it like...
          </p>
          <p className="text-foreground/60 text-sm leading-relaxed">
            {step.analogy}
          </p>
        </div>

        {/* Tip/Warning */}
        {step.tip && (
          <div
            className={`rounded-xl p-4 border ${
              step.tip.type === "danger"
                ? "bg-red-50 border-red-200"
                : step.tip.type === "warning"
                ? "bg-amber-50 border-amber-200"
                : "bg-emerald-50 border-emerald-200"
            }`}
          >
            <p
              className={`text-xs font-bold uppercase tracking-wider mb-1 ${
                step.tip.type === "danger"
                  ? "text-danger"
                  : step.tip.type === "warning"
                  ? "text-warning"
                  : "text-success"
              }`}
            >
              {step.tip.type === "danger"
                ? "🚨 Critical Warning"
                : step.tip.type === "warning"
                ? "⚠️ Watch Out"
                : "💡 Good to Know"}
            </p>
            <p
              className={`text-sm leading-relaxed ${
                step.tip.type === "danger"
                  ? "text-red-700"
                  : step.tip.type === "warning"
                  ? "text-amber-700"
                  : "text-emerald-700"
              }`}
            >
              {step.tip.text}
            </p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex gap-3">
        {currentStep > 1 && (
          <Link
            href={`/wallet-guide?step=${currentStep - 1}`}
            className="flex-1 block text-center py-3.5 rounded-xl font-bold text-sm border border-card-border bg-card text-foreground/70"
          >
            ← Previous
          </Link>
        )}
        {currentStep < 5 ? (
          <Link
            href={`/wallet-guide?step=${currentStep + 1}`}
            className="flex-1 block text-center gradient-btn py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-accent/25"
          >
            Next Step →
          </Link>
        ) : (
          <Link
            href="/"
            className="flex-1 block text-center gradient-btn py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-accent/25"
          >
            🎓 Back to CryptoPath
          </Link>
        )}
      </div>
    </div>
  );
}
