import Link from "next/link";
import { cookies } from "next/headers";

interface Coin {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  image: string;
}

interface Holding {
  coinId: string;
  symbol: string;
  name: string;
  amount: number;
  avgPrice: number;
}

interface SimData {
  balance: number;
  holdings: Holding[];
  totalTrades: number;
  profitTrades?: number;
  diamondHands?: boolean;
}

const STARTING_BALANCE = 10000;

interface TradeQuiz {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const BUY_QUIZZES: TradeQuiz[] = [
  {
    question: "You just bought crypto. If the price drops 30% tomorrow, what should you do?",
    options: ["Panic sell immediately", "Wait — dips are normal in crypto", "Buy more to average down", "Close the app forever"],
    correctIndex: 1,
    explanation: "Crypto drops 30%+ regularly. Panic selling locks in losses. Most successful investors hold through dips or dollar-cost average. Only sell if your reason for buying has fundamentally changed.",
  },
  {
    question: "You invested $100. The coin goes up 10%. How much is it worth now?",
    options: ["$10", "$110", "$1000", "$90"],
    correctIndex: 1,
    explanation: "If you invest $100 and it goes up 10%, you gain $10 — making it $110. Simple math, but it works both ways: a 10% drop means you'd have $90.",
  },
  {
    question: "What's the safest approach for a beginner?",
    options: ["Put everything in one coin", "Invest small amounts regularly (DCA)", "Wait for the 'perfect' moment", "Follow crypto influencers blindly"],
    correctIndex: 1,
    explanation: "Dollar-Cost Averaging (DCA) means investing a fixed amount regularly regardless of price. It removes emotion and timing anxiety. Studies show it beats trying to time the market 92% of the time.",
  },
  {
    question: "Why shouldn't you invest money you need for rent?",
    options: ["Crypto is illegal", "Crypto can drop 50%+ in days and you might not recover in time", "Banks don't allow it", "It's not profitable"],
    correctIndex: 1,
    explanation: "Crypto is extremely volatile. Bitcoin dropped 65% in 2022 and took over a year to recover. If you need that money for bills, you'd be forced to sell at a loss.",
  },
  {
    question: "What does it mean to 'diversify' in crypto?",
    options: ["Buy one coin many times", "Spread money across multiple coins", "Only invest on Mondays", "Convert all your savings to crypto"],
    correctIndex: 1,
    explanation: "Diversification means not putting all eggs in one basket. If one coin crashes, others might hold or go up. Most advisors suggest: majority in BTC/ETH, small amounts in riskier coins.",
  },
];

const SELL_QUIZZES: TradeQuiz[] = [
  {
    question: "You sold for a profit. What's a common mistake beginners make after?",
    options: ["Taking a break", "Immediately reinvesting all profits into a riskier coin", "Learning from the trade", "Checking prices less often"],
    correctIndex: 1,
    explanation: "After a win, many beginners feel overconfident and put profits into riskier bets. This 'house money effect' leads to bigger losses. Successful traders stick to their strategy regardless of recent wins.",
  },
  {
    question: "You sold at a loss. What's the healthy response?",
    options: ["Revenge trade — buy something risky to win it back fast", "Accept it as a learning experience", "Quit crypto forever", "Blame the market"],
    correctIndex: 1,
    explanation: "Losses are part of trading — even pros lose on 40-60% of trades. 'Revenge trading' (trying to quickly recover) almost always makes things worse. Accept, learn, and stick to your strategy.",
  },
  {
    question: "When is a good time to sell?",
    options: ["When everyone on Twitter says to sell", "When YOU have reached your personal target", "Only when the price is at its all-time high", "Never — always hold forever"],
    correctIndex: 1,
    explanation: "Set your own targets before buying (e.g., 'I'll sell 50% if it doubles'). Following the crowd means buying at peaks and selling at bottoms. Your strategy beats the herd every time.",
  },
];

const COIN_TIPS: Record<string, string> = {
  bitcoin: "The original crypto. Most stable of the bunch — often called 'digital gold'. Lowest risk in crypto (still risky vs stocks).",
  ethereum: "Powers most crypto apps (DeFi, NFTs). Like investing in the internet itself, not just one website.",
  tether: "A stablecoin — always worth ~$1. People use it to park money between trades, not to grow wealth.",
  binancecoin: "Tied to Binance exchange. Goes up when Binance does well. Extra risk: depends on one company.",
  solana: "Super fast blockchain. Popular with developers. High potential, but has had outage issues.",
  ripple: "Focused on bank transfers. Has been in a legal battle with the SEC. High risk, high drama.",
  cardano: "Slow and steady approach. Academic research-backed. Less flashy but methodical.",
  dogecoin: "Started as a literal joke. Moves mostly on Elon Musk tweets. Pure gambling, not investing.",
  "usd-coin": "Another stablecoin like Tether — pegged to $1. Not for growth, just for storing value.",
  "staked-ether": "Staked ETH — Ethereum that's locked up earning interest. Moves with ETH price.",
};

const FALLBACK_PRICES: Coin[] = [
  { id: "bitcoin", symbol: "btc", name: "Bitcoin", current_price: 104250, price_change_percentage_24h: 1.2, image: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png" },
  { id: "ethereum", symbol: "eth", name: "Ethereum", current_price: 3420, price_change_percentage_24h: -0.5, image: "https://assets.coingecko.com/coins/images/279/small/ethereum.png" },
  { id: "tether", symbol: "usdt", name: "Tether", current_price: 1.0, price_change_percentage_24h: 0.01, image: "https://assets.coingecko.com/coins/images/325/small/Tether.png" },
  { id: "binancecoin", symbol: "bnb", name: "BNB", current_price: 680, price_change_percentage_24h: 0.8, image: "https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png" },
  { id: "solana", symbol: "sol", name: "Solana", current_price: 172, price_change_percentage_24h: 2.3, image: "https://assets.coingecko.com/coins/images/4128/small/solana.png" },
  { id: "ripple", symbol: "xrp", name: "XRP", current_price: 0.62, price_change_percentage_24h: -1.1, image: "https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png" },
  { id: "cardano", symbol: "ada", name: "Cardano", current_price: 0.45, price_change_percentage_24h: 0.3, image: "https://assets.coingecko.com/coins/images/975/small/cardano.png" },
  { id: "dogecoin", symbol: "doge", name: "Dogecoin", current_price: 0.15, price_change_percentage_24h: -0.7, image: "https://assets.coingecko.com/coins/images/5/small/dogecoin.png" },
];

interface CoinWithSparkline extends Coin {
  sparkline_in_7d?: { price: number[] };
}

async function fetchCoins(): Promise<CoinWithSparkline[]> {
  try {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=8&page=1&sparkline=true",
      { headers: { accept: "application/json" }, next: { revalidate: 60 } }
    );
    if (!res.ok) return FALLBACK_PRICES;
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) return data;
    return FALLBACK_PRICES;
  } catch {
    return FALLBACK_PRICES;
  }
}

function Sparkline({ prices, color, width = 80, height = 30 }: { prices: number[]; color: string; width?: number; height?: number }) {
  if (!prices || prices.length < 2) return null;
  // Sample down to ~24 points for a clean line
  const step = Math.max(1, Math.floor(prices.length / 24));
  const sampled = prices.filter((_, i) => i % step === 0);
  const min = Math.min(...sampled);
  const max = Math.max(...sampled);
  const range = max - min || 1;

  const points = sampled.map((p, i) => {
    const x = (i / (sampled.length - 1)) * width;
    const y = height - ((p - min) / range) * (height - 4) - 2;
    return `${x},${y}`;
  });

  const pathD = `M${points.join(" L")}`;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="shrink-0">
      <path d={pathD} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function getSimData(cookieStore: Awaited<ReturnType<typeof cookies>>): SimData {
  const saved = cookieStore.get("cryptopath-sim");
  if (saved) {
    try {
      const data = JSON.parse(decodeURIComponent(saved.value));
      return { totalTrades: 0, ...data };
    } catch {}
  }
  return { balance: STARTING_BALANCE, holdings: [], totalTrades: 0 };
}

export default async function SimulatorPage({
  searchParams,
}: {
  searchParams: Promise<{
    buy?: string;
    sell?: string;
    amount?: string;
    confirm?: string;
    reset?: string;
    guide?: string;
    quiz?: string;
    qanswer?: string;
    qid?: string;
  }>;
}) {
  const params = await searchParams;
  const cookieStore = await cookies();
  let simData = getSimData(cookieStore);
  const coins = await fetchCoins();

  // Handle reset
  if (params.reset === "1") {
    simData = { balance: STARTING_BALANCE, holdings: [], totalTrades: 0 };
    return (
      <div>
        <SaveSim data={simData} />
        <meta httpEquiv="refresh" content="0;url=/simulator" />
        <p className="text-center pt-20 text-foreground/50">Resetting...</p>
      </div>
    );
  }

  // Show post-trade quiz
  if (params.quiz) {
    const isBuyQuiz = params.quiz === "buy";
    const quizPool = isBuyQuiz ? BUY_QUIZZES : SELL_QUIZZES;
    const qIndex = Math.abs(simData.totalTrades) % quizPool.length;
    const quiz = quizPool[qIndex];
    const answered = params.qanswer !== undefined ? Number(params.qanswer) : null;
    const isCorrect = answered === quiz.correctIndex;

    return (
      <div className="px-5 py-8 max-w-lg mx-auto">
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center text-3xl mx-auto mb-3">
            🧠
          </div>
          <h1 className="text-xl font-extrabold text-foreground mb-1">Quick Question!</h1>
          <p className="text-foreground/50 text-xs">Test what you just learned</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-card-border shadow-md mb-5">
          <p className="font-bold text-foreground text-sm leading-relaxed mb-4">
            {quiz.question}
          </p>

          <div className="space-y-2.5">
            {quiz.options.map((option, i) => {
              let style = "bg-surface border border-card-border";
              let indicator = "";

              if (answered !== null) {
                if (i === quiz.correctIndex) {
                  style = "bg-emerald-50 border-2 border-emerald-400";
                  indicator = "✓ ";
                } else if (i === answered) {
                  style = "bg-red-50 border-2 border-red-300";
                  indicator = "✗ ";
                } else {
                  style = "bg-surface border border-card-border opacity-40";
                }
              }

              if (answered !== null) {
                return (
                  <div key={i} className={`p-3 rounded-xl text-sm ${style}`}>
                    <span className="font-medium">{indicator}{option}</span>
                  </div>
                );
              }

              return (
                <Link
                  key={i}
                  href={`/simulator?quiz=${params.quiz}&qanswer=${i}`}
                  className={`block p-3 rounded-xl text-sm font-medium ${style} active:opacity-70`}
                >
                  {option}
                </Link>
              );
            })}
          </div>
        </div>

        {answered !== null && (
          <>
            <div className={`rounded-2xl p-4 border mb-5 ${isCorrect ? "bg-emerald-50 border-emerald-200" : "bg-amber-50 border-amber-200"}`}>
              <p className={`text-sm font-bold mb-1 ${isCorrect ? "text-emerald-700" : "text-amber-700"}`}>
                {isCorrect ? "🎉 Correct!" : "Not quite — here's why:"}
              </p>
              <p className="text-sm text-foreground/70 leading-relaxed">
                {quiz.explanation}
              </p>
            </div>

            <Link
              href="/simulator"
              className="block w-full gradient-btn py-4 rounded-xl font-bold text-sm text-center shadow-lg shadow-accent/25"
            >
              Continue Trading →
            </Link>
          </>
        )}
      </div>
    );
  }

  // Handle buy confirmation — then show "what happened" screen
  if (params.confirm === "buy" && params.buy && params.amount) {
    const coin = coins.find((c) => c.id === params.buy);
    const usdAmount = parseFloat(params.amount!);
    if (coin && !isNaN(usdAmount) && usdAmount > 0 && usdAmount <= simData.balance) {
      const coinAmount = usdAmount / coin.current_price;
      simData.balance -= usdAmount;
      simData.totalTrades = (simData.totalTrades || 0) + 1;
      const existing = simData.holdings.find((h) => h.coinId === coin.id);
      if (existing) {
        const totalAmount = existing.amount + coinAmount;
        const totalCost = existing.amount * existing.avgPrice + usdAmount;
        existing.amount = totalAmount;
        existing.avgPrice = totalCost / totalAmount;
      } else {
        simData.holdings.push({
          coinId: coin.id,
          symbol: coin.symbol,
          name: coin.name,
          amount: coinAmount,
          avgPrice: coin.current_price,
        });
      }
      // Show success/explainer page
      const upValue = (usdAmount * 1.1).toFixed(2);
      const downValue = (usdAmount * 0.9).toFixed(2);
      return (
        <div className="px-5 py-8 max-w-lg mx-auto">
          <SaveSim data={simData} />
          <div className="text-center mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-4xl mx-auto mb-4 shadow-lg shadow-emerald-200/50">
              ✓
            </div>
            <h1 className="text-2xl font-extrabold text-foreground mb-1">Trade Complete!</h1>
            <p className="text-foreground/50 text-sm">Nice move. Here&apos;s what just happened:</p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-card-border shadow-md mb-5">
            <h2 className="font-bold text-foreground mb-3">📊 Your trade breakdown:</h2>
            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between">
                <span className="text-foreground/60">You spent</span>
                <span className="font-bold text-foreground">${usdAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground/60">You got</span>
                <span className="font-bold text-foreground">{coinAmount.toFixed(6)} {coin.symbol.toUpperCase()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground/60">At price</span>
                <span className="font-bold text-foreground">${coin.current_price.toLocaleString()} per coin</span>
              </div>
            </div>
          </div>

          <div className="bg-surface rounded-2xl p-5 border border-card-border mb-5">
            <h2 className="font-bold text-foreground mb-3">🔮 What could happen next:</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <span className="text-success text-lg">📈</span>
                <div>
                  <p className="font-semibold text-foreground">If price goes up 10%</p>
                  <p className="text-foreground/50">Your ${usdAmount} becomes <span className="text-success font-bold">${upValue}</span></p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-danger text-lg">📉</span>
                <div>
                  <p className="font-semibold text-foreground">If price drops 10%</p>
                  <p className="text-foreground/50">Your ${usdAmount} becomes <span className="text-danger font-bold">${downValue}</span></p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 rounded-xl p-4 border border-amber-200 mb-6">
            <p className="text-sm text-amber-800">
              <span className="font-bold">💡 Pro tip:</span> In real trading, never invest money you can&apos;t afford to lose. Crypto can drop 50%+ in a single week.
            </p>
          </div>

          <Link
            href="/simulator?quiz=buy"
            className="block w-full gradient-btn py-4 rounded-xl font-bold text-sm text-center shadow-lg shadow-accent/25 mb-3"
          >
            Test Your Knowledge 🧠
          </Link>
          <Link
            href="/simulator"
            className="block w-full text-center py-3 rounded-xl font-medium text-sm text-foreground/40"
          >
            Skip → Back to Trading
          </Link>
        </div>
      );
    }
  }

  // Handle sell
  if (params.confirm === "sell" && params.sell) {
    const holding = simData.holdings.find((h) => h.coinId === params.sell);
    const coin = coins.find((c) => c.id === params.sell);
    if (holding && coin) {
      const value = holding.amount * coin.current_price;
      const costBasis = holding.amount * holding.avgPrice;
      const profit = value - costBasis;
      simData.balance += value;
      simData.holdings = simData.holdings.filter((h) => h.coinId !== params.sell);
      simData.totalTrades = (simData.totalTrades || 0) + 1;
      if (profit > 0) {
        simData.profitTrades = (simData.profitTrades || 0) + 1;
      }

      return (
        <div className="px-5 py-8 max-w-lg mx-auto">
          <SaveSim data={simData} />
          <div className="text-center mb-6">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center text-4xl mx-auto mb-4 shadow-lg ${profit >= 0 ? "bg-gradient-to-br from-emerald-400 to-teal-500 shadow-emerald-200/50" : "bg-gradient-to-br from-red-400 to-orange-500 shadow-red-200/50"}`}>
              {profit >= 0 ? "🎉" : "📚"}
            </div>
            <h1 className="text-2xl font-extrabold text-foreground mb-1">
              {profit >= 0 ? "Sold for Profit!" : "Sold at a Loss"}
            </h1>
            <p className="text-foreground/50 text-sm">
              {profit >= 0 ? "Nice timing!" : "That's okay — every trader has losses. That's why we practice!"}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-card-border shadow-md mb-5">
            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between">
                <span className="text-foreground/60">You sold</span>
                <span className="font-bold">{holding.amount.toFixed(6)} {holding.symbol.toUpperCase()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground/60">You paid (average)</span>
                <span className="font-bold">${costBasis.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground/60">You received</span>
                <span className="font-bold">${value.toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-card-border">
                <span className="text-foreground/60 font-semibold">Profit/Loss</span>
                <span className={`font-bold ${profit >= 0 ? "text-success" : "text-danger"}`}>
                  {profit >= 0 ? "+" : ""}${profit.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 rounded-xl p-4 border border-amber-200 mb-6">
            <p className="text-sm text-amber-800">
              <span className="font-bold">💡 Lesson:</span>{" "}
              {profit >= 0
                ? "Selling at a profit feels great, but many beginners sell too early. In real life, consider if the coin still has room to grow."
                : "Losses are part of trading. The key lesson: never invest more than you can afford to lose, and don't panic-sell during dips."}
            </p>
          </div>

          <Link
            href="/simulator?quiz=sell"
            className="block w-full gradient-btn py-4 rounded-xl font-bold text-sm text-center shadow-lg shadow-accent/25 mb-3"
          >
            Test Your Knowledge 🧠
          </Link>
          <Link
            href="/simulator"
            className="block w-full text-center py-3 rounded-xl font-medium text-sm text-foreground/40"
          >
            Skip → Back to Trading
          </Link>
        </div>
      );
    }
  }

  // Show buy page with coin tip
  if (params.buy) {
    const coin = coins.find((c) => c.id === params.buy);
    if (coin) {
      const tip = COIN_TIPS[coin.id] || `${coin.name} is ranked in the top 10 by market cap.`;
      return (
        <div className="px-5 py-8 max-w-lg mx-auto">
          <Link href="/simulator" className="text-sm text-accent font-bold mb-6 inline-block">
            ← Back
          </Link>

          <div className="bg-white rounded-2xl p-6 border border-card-border shadow-lg mt-2">
            <div className="text-center mb-4">
              <img src={coin.image} alt={coin.name} className="w-14 h-14 rounded-full mx-auto mb-3" />
              <h2 className="text-xl font-extrabold text-foreground">
                Buy {coin.name}
              </h2>
              <p className="text-foreground/50 text-sm mt-1">
                ${coin.current_price.toLocaleString()} per coin
              </p>
            </div>

            {/* Coin tip */}
            <div className="bg-accent/5 rounded-xl p-3.5 border border-accent/10 mb-5">
              <p className="text-xs text-accent font-bold mb-1">💡 What is {coin.symbol.toUpperCase()}?</p>
              <p className="text-xs text-foreground/60 leading-relaxed">{tip}</p>
            </div>

            <p className="text-sm font-bold text-foreground mb-2">
              Invest how much? <span className="text-foreground/40 font-normal">(cash: ${simData.balance.toFixed(0)})</span>
            </p>
            <div className="grid grid-cols-2 gap-2.5">
              {[25, 50, 100, 250, 500, 1000].map((amt) => (
                <Link
                  key={amt}
                  href={amt <= simData.balance ? `/simulator?confirm=buy&buy=${coin.id}&amount=${amt}` : "#"}
                  className={`block text-center py-3 rounded-xl font-bold text-sm ${
                    amt <= simData.balance
                      ? "gradient-btn shadow-sm shadow-accent/20"
                      : "bg-gray-100 text-foreground/20 border border-gray-200"
                  }`}
                >
                  ${amt}
                </Link>
              ))}
            </div>

            <Link
              href="/simulator"
              className="block w-full text-center py-3 rounded-xl font-medium text-sm border border-card-border text-foreground/50 mt-3"
            >
              Cancel
            </Link>
          </div>
        </div>
      );
    }
  }

  // Show sell confirmation
  if (params.sell) {
    const holding = simData.holdings.find((h) => h.coinId === params.sell);
    const coin = coins.find((c) => c.id === params.sell);
    if (holding && coin) {
      const value = holding.amount * coin.current_price;
      const costBasis = holding.amount * holding.avgPrice;
      const profit = value - costBasis;
      const pnlPercent = ((profit / costBasis) * 100).toFixed(1);

      let sellAdvice = "";
      let adviceEmoji = "";
      if (profit > 0 && parseFloat(pnlPercent) > 20) {
        sellAdvice = "You're up significantly. Many pros take partial profits here — sell half to lock in gains, keep half for more growth. This is called 'taking profits' and it's a smart move.";
        adviceEmoji = "🟢";
      } else if (profit > 0 && parseFloat(pnlPercent) <= 20) {
        sellAdvice = "You're in profit but not by much. Ask yourself: do you need this money now? If not, small gains often grow bigger with patience. But there's nothing wrong with taking guaranteed profit.";
        adviceEmoji = "🟡";
      } else if (profit < 0 && parseFloat(pnlPercent) > -10) {
        sellAdvice = "You're slightly down. This is normal crypto volatility — most coins recover small dips. Selling now locks in a loss. Unless you need the money or lost faith in the coin, holding is usually better.";
        adviceEmoji = "🟡";
      } else if (profit < 0) {
        sellAdvice = "You're down significantly. Tough spot. Ask: has anything fundamentally changed about this coin? If no — it might recover. If yes (scam, dead project) — cut your losses. Never 'hope' a bad investment recovers.";
        adviceEmoji = "🔴";
      } else {
        sellAdvice = "You're at breakeven. No pressure either way. If you'd still buy this coin today at this price, keep holding. If not, selling at breakeven is a clean exit.";
        adviceEmoji = "⚪";
      }

      return (
        <div className="px-5 py-8 max-w-lg mx-auto">
          <Link href="/simulator" className="text-sm text-accent font-bold mb-6 inline-block">
            ← Back
          </Link>

          <div className="bg-white rounded-2xl p-6 border border-card-border shadow-lg mt-2">
            <div className="text-center mb-4">
              <img src={coin.image} alt={coin.name} className="w-14 h-14 rounded-full mx-auto mb-3" />
              <h2 className="text-xl font-extrabold text-foreground">
                Sell {holding.symbol.toUpperCase()}?
              </h2>
              <p className="text-foreground/50 text-sm mt-1">
                {holding.amount.toFixed(6)} coins
              </p>
            </div>

            <div className="bg-surface rounded-xl p-4 border border-card-border mb-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-foreground/60">You paid</span>
                <span className="font-bold">${costBasis.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground/60">Current value</span>
                <span className="font-bold">${value.toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-card-border">
                <span className="text-foreground/60">Profit/Loss</span>
                <span className={`font-bold ${profit >= 0 ? "text-success" : "text-danger"}`}>
                  {profit >= 0 ? "+" : ""}${profit.toFixed(2)} ({profit >= 0 ? "+" : ""}{pnlPercent}%)
                </span>
              </div>
            </div>

            {/* Contextual selling advice */}
            <div className="bg-accent/5 rounded-xl p-4 border border-accent/10 mb-5">
              <p className="text-xs text-accent font-bold mb-1.5">{adviceEmoji} Should you sell right now?</p>
              <p className="text-xs text-foreground/60 leading-relaxed">{sellAdvice}</p>
            </div>

            {/* When to sell - general guide */}
            <details className="bg-surface rounded-xl border border-card-border overflow-hidden mb-5 group">
              <summary className="p-3.5 cursor-pointer flex items-center justify-between text-xs font-bold text-foreground/70 list-none">
                <span>📚 General guide: When to sell crypto</span>
                <span className="text-accent text-base transition-transform group-open:rotate-45">+</span>
              </summary>
              <div className="px-3.5 pb-3.5 border-t border-card-border/50">
                <div className="space-y-3 pt-3 text-xs text-foreground/60 leading-relaxed">
                  <div>
                    <p className="font-bold text-foreground/80 mb-0.5">✅ Good reasons to sell:</p>
                    <ul className="list-disc list-inside space-y-0.5">
                      <li>You hit your pre-set profit target (e.g., &ldquo;I&apos;ll sell at 2x&rdquo;)</li>
                      <li>You need the money for something important</li>
                      <li>The project has fundamental problems (team quit, hack, scam)</li>
                      <li>You want to rebalance into a better opportunity</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-bold text-foreground/80 mb-0.5">❌ Bad reasons to sell:</p>
                    <ul className="list-disc list-inside space-y-0.5">
                      <li>Panic — the price dropped today (normal volatility)</li>
                      <li>Everyone on social media is scared</li>
                      <li>You want to &ldquo;buy back lower&rdquo; (timing rarely works)</li>
                      <li>FOMO into a different coin that&apos;s pumping</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-bold text-foreground/80 mb-0.5">💡 Pro strategy:</p>
                    <p>Set your targets BEFORE buying. Example: &ldquo;I&apos;ll sell 25% at 2x, another 25% at 5x, and hold the rest.&rdquo; This removes emotion from the decision.</p>
                  </div>
                </div>
              </div>
            </details>

            <Link
              href={`/simulator?confirm=sell&sell=${holding.coinId}`}
              className="block w-full text-center py-3.5 rounded-xl font-bold text-sm bg-danger text-white shadow-md shadow-red-200/50 mb-3"
            >
              Sell All for ${value.toFixed(2)}
            </Link>
            <Link
              href="/simulator"
              className="block w-full text-center py-3 rounded-xl font-medium text-sm border border-card-border text-foreground/50"
            >
              Keep Holding
            </Link>
          </div>
        </div>
      );
    }
  }

  // GUIDED FIRST TRADE — show if user has never traded
  if (simData.totalTrades === 0 && simData.holdings.length === 0 && !params.guide) {
    const btc = coins.find((c) => c.id === "bitcoin") || coins[0];
    return (
      <div className="px-5 py-8 max-w-lg mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-extrabold gradient-text mb-2">Paper Trading</h1>
          <p className="text-foreground/50 text-sm">Practice with fake money. Learn without risk.</p>
        </div>

        {/* Intro card */}
        <div className="bg-white rounded-2xl p-6 border border-card-border shadow-md mb-5">
          <div className="text-center">
            <span className="text-5xl">🎮</span>
            <h2 className="text-lg font-extrabold text-foreground mt-3 mb-2">Your First Trade</h2>
            <p className="text-sm text-foreground/60 leading-relaxed">
              You have <span className="font-bold text-accent">$10,000 in fake money</span>.
              Let&apos;s learn how trading works by buying some Bitcoin together.
            </p>
          </div>
        </div>

        {/* Step-by-step explanation */}
        <div className="bg-surface rounded-2xl p-5 border border-card-border mb-5">
          <h3 className="font-bold text-foreground text-sm mb-3">How trading works:</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full gradient-btn flex items-center justify-center text-xs font-bold text-white shrink-0">1</div>
              <p className="text-sm text-foreground/70 pt-0.5">You pick a coin and decide how much $ to spend</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full gradient-btn flex items-center justify-center text-xs font-bold text-white shrink-0">2</div>
              <p className="text-sm text-foreground/70 pt-0.5">You get a fraction of that coin at today&apos;s price</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full gradient-btn flex items-center justify-center text-xs font-bold text-white shrink-0">3</div>
              <p className="text-sm text-foreground/70 pt-0.5">If the price goes up, your fraction is worth more. If it drops, worth less.</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full gradient-btn flex items-center justify-center text-xs font-bold text-white shrink-0">4</div>
              <p className="text-sm text-foreground/70 pt-0.5">You &ldquo;sell&rdquo; whenever you want — locking in profit or loss</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <Link
          href={`/simulator?buy=${btc.id}`}
          className="block w-full gradient-btn py-4 rounded-xl font-bold text-base text-center shadow-xl shadow-accent/25 mb-3"
        >
          Let&apos;s Buy Some Bitcoin! 🚀
        </Link>
        <Link
          href="/simulator?guide=skip"
          className="block w-full text-center py-3 rounded-xl font-medium text-sm text-foreground/40"
        >
          Skip — I know how trading works
        </Link>
      </div>
    );
  }

  // MAIN SIMULATOR VIEW
  const portfolioValue = simData.holdings.reduce((sum, h) => {
    const coin = coins.find((c) => c.id === h.coinId);
    return sum + (coin ? h.amount * coin.current_price : h.amount * h.avgPrice);
  }, 0);
  const totalValue = simData.balance + portfolioValue;
  const pnl = totalValue - STARTING_BALANCE;

  return (
    <div className="px-5 py-8 max-w-lg mx-auto">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-2xl font-extrabold">
            <span className="gradient-text">Paper Trading</span>
          </h1>
          <p className="text-foreground/50 text-xs">
            Fake money. Real prices. Zero risk.
          </p>
        </div>
        <Link
          href="/simulator?reset=1"
          className="text-xs text-danger border border-danger/30 rounded-lg px-3 py-1.5 font-medium"
        >
          Reset
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white border border-card-border rounded-xl p-3 text-center shadow-sm">
          <p className="text-[10px] text-foreground/40 uppercase font-medium">Cash</p>
          <p className="text-sm font-bold text-foreground">${simData.balance.toFixed(0)}</p>
        </div>
        <div className="bg-white border border-card-border rounded-xl p-3 text-center shadow-sm">
          <p className="text-[10px] text-foreground/40 uppercase font-medium">Invested</p>
          <p className="text-sm font-bold text-foreground">${portfolioValue.toFixed(0)}</p>
        </div>
        <div className="bg-white border border-card-border rounded-xl p-3 text-center shadow-sm">
          <p className="text-[10px] text-foreground/40 uppercase font-medium">P&L</p>
          <p className={`text-sm font-bold ${pnl >= 0 ? "text-success" : "text-danger"}`}>
            {pnl >= 0 ? "+" : ""}${pnl.toFixed(0)}
          </p>
        </div>
      </div>

      {/* Holdings */}
      {simData.holdings.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-bold text-foreground mb-3">📂 Your Holdings</h2>
          <div className="space-y-2">
            {simData.holdings.map((h) => {
              const coin = coins.find((c) => c.id === h.coinId);
              const currentValue = coin ? h.amount * coin.current_price : h.amount * h.avgPrice;
              const costBasis = h.amount * h.avgPrice;
              const holdingPnl = currentValue - costBasis;
              const pnlPercent = costBasis > 0 ? (holdingPnl / costBasis) * 100 : 0;
              return (
                <div
                  key={h.coinId}
                  className="bg-white border border-card-border rounded-xl p-3 flex items-center justify-between shadow-sm"
                >
                  <div>
                    <p className="text-sm font-bold text-foreground">
                      {h.symbol.toUpperCase()}
                    </p>
                    <p className="text-[10px] text-foreground/40">
                      {h.amount.toFixed(4)} coins
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <p className="text-sm font-medium">${currentValue.toFixed(2)}</p>
                      <p className={`text-[10px] font-medium ${holdingPnl >= 0 ? "text-success" : "text-danger"}`}>
                        {holdingPnl >= 0 ? "+" : ""}{pnlPercent.toFixed(1)}%
                      </p>
                    </div>
                    <Link
                      href={`/simulator?sell=${h.coinId}`}
                      className="text-xs bg-danger/10 text-danger rounded-lg px-2.5 py-1.5 font-bold"
                    >
                      Sell
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Market */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-bold text-foreground">📊 Market <span className="text-foreground/30 font-normal text-xs">· 7d charts</span></h2>
        <p className="text-[10px] text-foreground/30">Updated just now · <Link href="/simulator?guide=skip" className="text-accent font-medium">Refresh</Link></p>
      </div>
      <div className="space-y-2">
        {coins.map((coin) => {
          const isUp = coin.price_change_percentage_24h >= 0;
          const sparkColor = isUp ? "#059669" : "#dc2626";
          return (
            <Link
              key={coin.id}
              href={`/simulator?buy=${coin.id}`}
              className="bg-white border border-card-border rounded-xl p-3 flex items-center gap-2.5 shadow-sm block"
            >
              <img
                src={coin.image}
                alt={coin.name}
                className="w-8 h-8 rounded-full shrink-0"
              />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-foreground">
                  {coin.symbol.toUpperCase()}
                </p>
                <p className="text-[10px] text-foreground/40 truncate">{coin.name}</p>
              </div>
              {(coin as CoinWithSparkline).sparkline_in_7d?.price && (
                <Sparkline prices={(coin as CoinWithSparkline).sparkline_in_7d!.price} color={sparkColor} />
              )}
              <div className="text-right shrink-0">
                <p className="text-sm font-bold">
                  ${coin.current_price.toLocaleString()}
                </p>
                <p className={`text-[10px] font-medium ${isUp ? "text-success" : "text-danger"}`}>
                  {isUp ? "+" : ""}
                  {coin.price_change_percentage_24h?.toFixed(1)}%
                </p>
              </div>
              <span className="text-xs gradient-btn rounded-lg px-3 py-1.5 font-bold shadow-sm shadow-accent/20 shrink-0">
                Buy
              </span>
            </Link>
          );
        })}
      </div>

      {/* FAQ Section */}
      <div className="mt-8 pt-6 border-t border-card-border">
        <h2 className="text-sm font-bold text-foreground mb-4">❓ Common Questions</h2>
        <div className="space-y-2">
          <details className="bg-white rounded-xl border border-card-border overflow-hidden group">
            <summary className="p-4 cursor-pointer flex items-center justify-between text-sm font-semibold text-foreground list-none">
              <span>What happens if I lose all my fake money?</span>
              <span className="text-accent text-lg transition-transform group-open:rotate-45">+</span>
            </summary>
            <div className="px-4 pb-4 border-t border-card-border/50">
              <p className="text-sm text-foreground/60 leading-relaxed pt-3">
                Nothing bad! Just hit &ldquo;Reset&rdquo; and you get $10,000 again. That&apos;s the whole point of paper trading — learn from mistakes with zero real consequences. In real trading, losing everything is permanent. That&apos;s why we practice here first.
              </p>
            </div>
          </details>

          <details className="bg-white rounded-xl border border-card-border overflow-hidden group">
            <summary className="p-4 cursor-pointer flex items-center justify-between text-sm font-semibold text-foreground list-none">
              <span>Should I buy when the price is red (down)?</span>
              <span className="text-accent text-lg transition-transform group-open:rotate-45">+</span>
            </summary>
            <div className="px-4 pb-4 border-t border-card-border/50">
              <p className="text-sm text-foreground/60 leading-relaxed pt-3">
                &ldquo;Buy the dip&rdquo; is popular advice, but it&apos;s not always right. A coin dropping 5% today might drop 50% this month. Instead of timing the market, most experts recommend DCA — invest a fixed amount regularly regardless of price. It&apos;s boring but it works.
              </p>
            </div>
          </details>

          <details className="bg-white rounded-xl border border-card-border overflow-hidden group">
            <summary className="p-4 cursor-pointer flex items-center justify-between text-sm font-semibold text-foreground list-none">
              <span>What&apos;s the difference between all these coins?</span>
              <span className="text-accent text-lg transition-transform group-open:rotate-45">+</span>
            </summary>
            <div className="px-4 pb-4 border-t border-card-border/50">
              <p className="text-sm text-foreground/60 leading-relaxed pt-3">
                <span className="font-semibold">BTC</span> = digital gold (store of value). <span className="font-semibold">ETH</span> = programmable money (apps run on it). <span className="font-semibold">USDT/USDC</span> = stable, always $1. <span className="font-semibold">SOL, ADA</span> = faster/cheaper alternatives to ETH. <span className="font-semibold">DOGE</span> = meme coin, mostly speculation. Each has different risk levels — tap &ldquo;Buy&rdquo; on any coin to see our explanation.
              </p>
            </div>
          </details>

          <details className="bg-white rounded-xl border border-card-border overflow-hidden group">
            <summary className="p-4 cursor-pointer flex items-center justify-between text-sm font-semibold text-foreground list-none">
              <span>How is this different from real trading?</span>
              <span className="text-accent text-lg transition-transform group-open:rotate-45">+</span>
            </summary>
            <div className="px-4 pb-4 border-t border-card-border/50">
              <p className="text-sm text-foreground/60 leading-relaxed pt-3">
                Prices here are real (from CoinGecko), but the money is fake. In real trading you&apos;d also deal with: transaction fees (0.1-2%), withdrawal limits, KYC verification, tax implications, and the emotional pressure of real money. This simulator removes all that so you can focus on learning the basics.
              </p>
            </div>
          </details>

          <details className="bg-white rounded-xl border border-card-border overflow-hidden group">
            <summary className="p-4 cursor-pointer flex items-center justify-between text-sm font-semibold text-foreground list-none">
              <span>When should I start using real money?</span>
              <span className="text-accent text-lg transition-transform group-open:rotate-45">+</span>
            </summary>
            <div className="px-4 pb-4 border-t border-card-border/50">
              <p className="text-sm text-foreground/60 leading-relaxed pt-3">
                Only when: 1) You&apos;ve completed all learning levels, 2) You can explain what you&apos;re buying and why, 3) You have an amount you&apos;re truly OK losing entirely, and 4) You&apos;re not investing out of FOMO. Start with $10-50 on a regulated exchange. The goal is learning, not getting rich quick.
              </p>
            </div>
          </details>
        </div>
      </div>
    </div>
  );
}

function SaveSim({ data }: { data: SimData }) {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `document.cookie="cryptopath-sim=${encodeURIComponent(JSON.stringify(data))};path=/;max-age=31536000"`,
      }}
    />
  );
}
