import Link from "next/link";

const slides = [
  {
    id: 1,
    icon: "🌍",
    title: "Everyone's talking about crypto",
    subtitle: "But nobody explains it simply",
    color: "from-violet-100 to-purple-50",
  },
  {
    id: 2,
    icon: "🧠",
    title: "Learn at your own pace",
    subtitle: "30-second lessons, real-world analogies, zero jargon",
    color: "from-blue-50 to-indigo-50",
  },
  {
    id: 3,
    icon: "📈",
    title: "Practice without risk",
    subtitle: "Paper trade with real prices, fake money",
    color: "from-emerald-50 to-teal-50",
  },
  {
    id: 4,
    icon: "🚀",
    title: "Ready when you are",
    subtitle: "From zero knowledge to your first confident investment",
    color: "from-pink-50 to-rose-50",
  },
];

export default async function OnboardingPage({
  searchParams,
}: {
  searchParams: Promise<{ slide?: string }>;
}) {
  const params = await searchParams;
  const current = Math.min(Math.max(parseInt(params.slide || "1", 10) || 1, 1), 4);
  const slide = slides[current - 1];
  const isLast = current === 4;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Skip */}
      <div className="px-5 pt-6 flex justify-end">
        <Link href="/" className="text-xs font-semibold text-foreground/30 hover:text-foreground/60">
          Skip
        </Link>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        {/* Icon circle */}
        <div className={`w-32 h-32 rounded-full bg-gradient-to-br ${slide.color} flex items-center justify-center mb-8 shadow-lg`}>
          <span className="text-6xl">{slide.icon}</span>
        </div>

        <h1 className="text-2xl font-black text-foreground mb-3 leading-tight max-w-[280px]">
          {slide.title}
        </h1>
        <p className="text-foreground/50 text-[15px] leading-relaxed max-w-[260px]">
          {slide.subtitle}
        </p>
      </div>

      {/* Bottom navigation */}
      <div className="px-8 pb-12">
        {/* Dots */}
        <div className="flex justify-center gap-2 mb-8">
          {slides.map((s) => (
            <div
              key={s.id}
              className={`rounded-full transition-all ${
                s.id === current ? "w-6 h-2 bg-accent" : "w-2 h-2 bg-foreground/15"
              }`}
            />
          ))}
        </div>

        {/* Button */}
        {isLast ? (
          <Link href="/" className="block">
            <SetOnboardedCookie />
            <div className="w-full gradient-btn py-4 rounded-2xl font-bold text-center text-[15px] shadow-lg shadow-accent/25">
              Get Started
            </div>
          </Link>
        ) : (
          <Link
            href={`/onboarding?slide=${current + 1}`}
            className="block w-full gradient-btn py-4 rounded-2xl font-bold text-center text-[15px] shadow-lg shadow-accent/25"
          >
            Next
          </Link>
        )}
      </div>
    </div>
  );
}

function SetOnboardedCookie() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `document.cookie="cryptopath-onboarded=1;path=/;max-age=31536000"`,
      }}
    />
  );
}
