import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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
}

const STARTING_BALANCE = 10000;

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

async function fetchCoins(): Promise<Coin[]> {
  try {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=8&page=1&sparkline=false",
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

function getSimData(cookieStore: Awaited<ReturnType<typeof cookies>>): SimData {
  const saved = cookieStore.get("cryptopath-sim");
  if (saved) {
    try {
      return JSON.parse(saved.value);
    } catch {}
  }
  return { balance: STARTING_BALANCE, holdings: [] };
}

export default async function SimulatorPage({
  searchParams,
}: {
  searchParams: Promise<{ buy?: string; sell?: string; amount?: string; confirm?: string; reset?: string }>;
}) {
  const params = await searchParams;
  const cookieStore = await cookies();
  let simData = getSimData(cookieStore);
  const coins = await fetchCoins();

  // Handle reset
  if (params.reset === "1") {
    simData = { balance: STARTING_BALANCE, holdings: [] };
    // Save via inline script and redirect
    return (
      <div>
        <SaveSim data={simData} />
        <meta httpEquiv="refresh" content="0;url=/simulator" />
        <p className="text-center pt-20 text-foreground/50">Resetting...</p>
      </div>
    );
  }

  // Handle buy confirmation
  if (params.confirm === "buy" && params.buy && params.amount) {
    const coin = coins.find((c) => c.id === params.buy);
    const usdAmount = parseFloat(params.amount!);
    if (coin && !isNaN(usdAmount) && usdAmount > 0 && usdAmount <= simData.balance) {
      const coinAmount = usdAmount / coin.current_price;
      simData.balance -= usdAmount;
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
      return (
        <div>
          <SaveSim data={simData} />
          <meta httpEquiv="refresh" content="0;url=/simulator" />
          <p className="text-center pt-20 text-foreground/50">Buying...</p>
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
      simData.balance += value;
      simData.holdings = simData.holdings.filter((h) => h.coinId !== params.sell);
      return (
        <div>
          <SaveSim data={simData} />
          <meta httpEquiv="refresh" content="0;url=/simulator" />
          <p className="text-center pt-20 text-foreground/50">Selling...</p>
        </div>
      );
    }
  }

  // Show buy modal
  if (params.buy) {
    const coin = coins.find((c) => c.id === params.buy);
    if (coin) {
      return (
        <div className="px-5 py-8 max-w-lg mx-auto">
          <Link href="/simulator" className="text-sm text-accent font-bold mb-6 inline-block">
            ← Back
          </Link>

          <div className="bg-white rounded-2xl p-6 border border-card-border shadow-lg mt-4">
            <div className="text-center mb-5">
              <div className="w-16 h-16 rounded-full gradient-btn flex items-center justify-center text-2xl mx-auto mb-3 shadow-lg shadow-accent/20">
                {coin.symbol.toUpperCase().slice(0, 2)}
              </div>
              <h2 className="text-xl font-extrabold text-foreground">
                Buy {coin.name}
              </h2>
              <p className="text-foreground/50 text-sm mt-1">
                Price: ${coin.current_price.toLocaleString()}
              </p>
              <p className="text-accent text-xs font-semibold mt-1">
                Your cash: ${simData.balance.toFixed(2)}
              </p>
            </div>

            <p className="text-sm font-semibold text-foreground mb-3">Choose amount:</p>
            <div className="grid grid-cols-2 gap-3">
              {[25, 50, 100, 500].map((amt) => (
                <Link
                  key={amt}
                  href={amt <= simData.balance ? `/simulator?confirm=buy&buy=${coin.id}&amount=${amt}` : "#"}
                  className={`block text-center py-3 rounded-xl font-bold text-sm border ${
                    amt <= simData.balance
                      ? "gradient-btn shadow-md shadow-accent/20"
                      : "bg-surface text-foreground/30 border-card-border cursor-not-allowed"
                  }`}
                >
                  ${amt}
                </Link>
              ))}
            </div>

            {simData.balance >= 1000 && (
              <Link
                href={`/simulator?confirm=buy&buy=${coin.id}&amount=1000`}
                className="block w-full text-center py-3 rounded-xl font-bold text-sm gradient-btn shadow-md shadow-accent/20 mt-3"
              >
                $1,000
              </Link>
            )}

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
      return (
        <div className="px-5 py-8 max-w-lg mx-auto">
          <Link href="/simulator" className="text-sm text-accent font-bold mb-6 inline-block">
            ← Back
          </Link>

          <div className="bg-white rounded-2xl p-6 border border-card-border shadow-lg mt-4">
            <div className="text-center mb-5">
              <h2 className="text-xl font-extrabold text-foreground">
                Sell {holding.name}?
              </h2>
              <p className="text-foreground/50 text-sm mt-2">
                You have {holding.amount.toFixed(6)} {holding.symbol.toUpperCase()}
              </p>
              <p className="text-lg font-bold text-success mt-2">
                Worth ${value.toFixed(2)}
              </p>
            </div>

            <Link
              href={`/simulator?confirm=sell&sell=${holding.coinId}`}
              className="block w-full text-center py-3.5 rounded-xl font-bold text-sm bg-danger text-white shadow-md mb-3"
            >
              Sell All for ${value.toFixed(2)}
            </Link>
            <Link
              href="/simulator"
              className="block w-full text-center py-3 rounded-xl font-medium text-sm border border-card-border text-foreground/50"
            >
              Cancel
            </Link>
          </div>
        </div>
      );
    }
  }

  // Main simulator view
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
          <p className="text-[10px] text-foreground/40 uppercase font-medium">Portfolio</p>
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
          <h2 className="text-sm font-bold text-foreground mb-3">Your Holdings</h2>
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
      <h2 className="text-sm font-bold text-foreground mb-3">Market</h2>
      <div className="space-y-2">
        {coins.map((coin) => (
          <div
            key={coin.id}
            className="bg-white border border-card-border rounded-xl p-3 flex items-center justify-between shadow-sm"
          >
            <div className="flex items-center gap-2.5">
              <img
                src={coin.image}
                alt={coin.name}
                className="w-8 h-8 rounded-full"
              />
              <div>
                <p className="text-sm font-bold text-foreground">
                  {coin.symbol.toUpperCase()}
                </p>
                <p className="text-[10px] text-foreground/40">{coin.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-bold">
                  ${coin.current_price.toLocaleString()}
                </p>
                <p className={`text-[10px] font-medium ${coin.price_change_percentage_24h >= 0 ? "text-success" : "text-danger"}`}>
                  {coin.price_change_percentage_24h >= 0 ? "+" : ""}
                  {coin.price_change_percentage_24h?.toFixed(1)}%
                </p>
              </div>
              <Link
                href={`/simulator?buy=${coin.id}`}
                className="text-xs gradient-btn rounded-lg px-3 py-1.5 font-bold shadow-sm shadow-accent/20"
              >
                Buy
              </Link>
            </div>
          </div>
        ))}
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
