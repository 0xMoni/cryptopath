"use client";

import { useState, useEffect } from "react";

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

const STARTING_BALANCE = 10000;

export default function SimulatorPage() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [balance, setBalance] = useState(STARTING_BALANCE);
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [loading, setLoading] = useState(true);
  const [buyModal, setBuyModal] = useState<Coin | null>(null);
  const [buyAmount, setBuyAmount] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("cryptopath-sim");
    if (saved) {
      const data = JSON.parse(saved);
      setBalance(data.balance);
      setHoldings(data.holdings);
    }
    fetchPrices();
  }, []);

  useEffect(() => {
    if (balance !== STARTING_BALANCE || holdings.length > 0) {
      localStorage.setItem(
        "cryptopath-sim",
        JSON.stringify({ balance, holdings })
      );
    }
  }, [balance, holdings]);

  async function fetchPrices() {
    try {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
      );
      const data = await res.json();
      setCoins(data);
    } catch {
      setCoins([]);
    } finally {
      setLoading(false);
    }
  }

  function handleBuy() {
    if (!buyModal || !buyAmount) return;
    const usdAmount = parseFloat(buyAmount);
    if (isNaN(usdAmount) || usdAmount <= 0 || usdAmount > balance) return;

    const coinAmount = usdAmount / buyModal.current_price;
    setBalance((b) => b - usdAmount);

    setHoldings((prev) => {
      const existing = prev.find((h) => h.coinId === buyModal.id);
      if (existing) {
        const totalAmount = existing.amount + coinAmount;
        const totalCost = existing.amount * existing.avgPrice + usdAmount;
        return prev.map((h) =>
          h.coinId === buyModal.id
            ? { ...h, amount: totalAmount, avgPrice: totalCost / totalAmount }
            : h
        );
      }
      return [
        ...prev,
        {
          coinId: buyModal.id,
          symbol: buyModal.symbol,
          name: buyModal.name,
          amount: coinAmount,
          avgPrice: buyModal.current_price,
        },
      ];
    });

    setBuyModal(null);
    setBuyAmount("");
  }

  function handleSell(holding: Holding) {
    const coin = coins.find((c) => c.id === holding.coinId);
    if (!coin) return;
    const value = holding.amount * coin.current_price;
    setBalance((b) => b + value);
    setHoldings((prev) => prev.filter((h) => h.coinId !== holding.coinId));
  }

  function resetSimulator() {
    setBalance(STARTING_BALANCE);
    setHoldings([]);
    localStorage.removeItem("cryptopath-sim");
  }

  const portfolioValue = holdings.reduce((sum, h) => {
    const coin = coins.find((c) => c.id === h.coinId);
    return sum + (coin ? h.amount * coin.current_price : h.amount * h.avgPrice);
  }, 0);

  const totalValue = balance + portfolioValue;
  const pnl = totalValue - STARTING_BALANCE;

  return (
    <div className="px-5 py-8 max-w-lg mx-auto">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-2xl font-bold">
            <span className="gradient-text">Paper Trading</span>
          </h1>
          <p className="text-foreground/50 text-xs">
            Fake money. Real prices. Zero risk.
          </p>
        </div>
        <button
          onClick={resetSimulator}
          className="text-xs text-danger border border-danger/30 rounded-lg px-3 py-1.5 font-medium hover:bg-danger/5"
        >
          Reset
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-card border border-card-border glow-card rounded-xl p-3 text-center">
          <p className="text-[10px] text-foreground/40 uppercase font-medium">Cash</p>
          <p className="text-sm font-bold text-foreground">${balance.toFixed(2)}</p>
        </div>
        <div className="bg-card border border-card-border glow-card rounded-xl p-3 text-center">
          <p className="text-[10px] text-foreground/40 uppercase font-medium">Portfolio</p>
          <p className="text-sm font-bold text-foreground">${portfolioValue.toFixed(2)}</p>
        </div>
        <div className="bg-card border border-card-border glow-card rounded-xl p-3 text-center">
          <p className="text-[10px] text-foreground/40 uppercase font-medium">P&L</p>
          <p
            className={`text-sm font-bold ${
              pnl >= 0 ? "text-success" : "text-danger"
            }`}
          >
            {pnl >= 0 ? "+" : ""}${pnl.toFixed(2)}
          </p>
        </div>
      </div>

      {holdings.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-semibold mb-2 text-foreground/60">
            Your Holdings
          </h2>
          <div className="space-y-2">
            {holdings.map((h) => {
              const coin = coins.find((c) => c.id === h.coinId);
              const currentValue = coin
                ? h.amount * coin.current_price
                : h.amount * h.avgPrice;
              const costBasis = h.amount * h.avgPrice;
              const holdingPnl = currentValue - costBasis;
              return (
                <div
                  key={h.coinId}
                  className="bg-card border border-card-border glow-card rounded-xl p-3 flex items-center justify-between"
                >
                  <div>
                    <p className="text-sm font-bold text-foreground">
                      {h.symbol.toUpperCase()}
                    </p>
                    <p className="text-[10px] text-foreground/40">
                      {h.amount.toFixed(6)} @ ${h.avgPrice.toFixed(2)}
                    </p>
                  </div>
                  <div className="text-right flex items-center gap-2">
                    <div>
                      <p className="text-sm font-medium">${currentValue.toFixed(2)}</p>
                      <p
                        className={`text-[10px] font-medium ${
                          holdingPnl >= 0 ? "text-success" : "text-danger"
                        }`}
                      >
                        {holdingPnl >= 0 ? "+" : ""}
                        {((holdingPnl / costBasis) * 100).toFixed(1)}%
                      </p>
                    </div>
                    <button
                      onClick={() => handleSell(h)}
                      className="text-[10px] bg-danger/10 text-danger rounded-lg px-2 py-1 font-medium"
                    >
                      Sell
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <h2 className="text-sm font-semibold mb-2 text-foreground/60">
        Market (Top 10)
      </h2>

      {loading ? (
        <div className="text-center text-foreground/40 py-10 text-sm">
          Loading prices...
        </div>
      ) : coins.length === 0 ? (
        <div className="text-center text-foreground/40 py-10 text-sm">
          Could not fetch prices. Check your connection.
        </div>
      ) : (
        <div className="space-y-2">
          {coins.map((coin) => (
            <div
              key={coin.id}
              className="bg-card border border-card-border glow-card rounded-xl p-3 flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <img
                  src={coin.image}
                  alt={coin.name}
                  className="w-7 h-7 rounded-full"
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
                  <p className="text-sm font-medium">
                    ${coin.current_price.toLocaleString()}
                  </p>
                  <p
                    className={`text-[10px] font-medium ${
                      coin.price_change_percentage_24h >= 0
                        ? "text-success"
                        : "text-danger"
                    }`}
                  >
                    {coin.price_change_percentage_24h >= 0 ? "+" : ""}
                    {coin.price_change_percentage_24h?.toFixed(1)}%
                  </p>
                </div>
                <button
                  onClick={() => setBuyModal(coin)}
                  className="text-[10px] gradient-btn rounded-lg px-3 py-1.5 font-medium"
                >
                  Buy
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {buyModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 px-5">
          <div className="bg-card border border-card-border glow-card rounded-2xl p-6 w-full max-w-sm">
            <h3 className="font-bold text-lg mb-1 text-foreground">
              Buy {buyModal.symbol.toUpperCase()}
            </h3>
            <p className="text-xs text-foreground/50 mb-4">
              Price: ${buyModal.current_price.toLocaleString()} | Balance: $
              {balance.toFixed(2)}
            </p>
            <input
              type="number"
              placeholder="Amount in USD"
              value={buyAmount}
              onChange={(e) => setBuyAmount(e.target.value)}
              className="w-full bg-surface border border-card-border rounded-xl px-4 py-3 text-sm mb-4 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
            />
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setBuyModal(null);
                  setBuyAmount("");
                }}
                className="flex-1 text-sm border border-card-border rounded-xl py-2.5 font-medium text-foreground/60 hover:bg-surface"
              >
                Cancel
              </button>
              <button
                onClick={handleBuy}
                className="flex-1 text-sm gradient-btn rounded-xl py-2.5 font-medium"
              >
                Buy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
