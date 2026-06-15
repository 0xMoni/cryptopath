import { SimulatorClient } from "./simulator-client";

interface Coin {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  image: string;
}

const FALLBACK_PRICES: Coin[] = [
  { id: "bitcoin", symbol: "btc", name: "Bitcoin", current_price: 104250, price_change_percentage_24h: 1.2, image: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png" },
  { id: "ethereum", symbol: "eth", name: "Ethereum", current_price: 3420, price_change_percentage_24h: -0.5, image: "https://assets.coingecko.com/coins/images/279/small/ethereum.png" },
  { id: "tether", symbol: "usdt", name: "Tether", current_price: 1.0, price_change_percentage_24h: 0.01, image: "https://assets.coingecko.com/coins/images/325/small/Tether.png" },
  { id: "binancecoin", symbol: "bnb", name: "BNB", current_price: 680, price_change_percentage_24h: 0.8, image: "https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png" },
  { id: "solana", symbol: "sol", name: "Solana", current_price: 172, price_change_percentage_24h: 2.3, image: "https://assets.coingecko.com/coins/images/4128/small/solana.png" },
  { id: "ripple", symbol: "xrp", name: "XRP", current_price: 0.62, price_change_percentage_24h: -1.1, image: "https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png" },
  { id: "cardano", symbol: "ada", name: "Cardano", current_price: 0.45, price_change_percentage_24h: 0.3, image: "https://assets.coingecko.com/coins/images/975/small/cardano.png" },
  { id: "dogecoin", symbol: "doge", name: "Dogecoin", current_price: 0.15, price_change_percentage_24h: -0.7, image: "https://assets.coingecko.com/coins/images/5/small/dogecoin.png" },
  { id: "polkadot", symbol: "dot", name: "Polkadot", current_price: 7.2, price_change_percentage_24h: 1.5, image: "https://assets.coingecko.com/coins/images/12171/small/polkadot.png" },
  { id: "avalanche-2", symbol: "avax", name: "Avalanche", current_price: 35.8, price_change_percentage_24h: -0.9, image: "https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png" },
];

async function fetchCoins(): Promise<Coin[]> {
  try {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false",
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

export default async function SimulatorPage() {
  const coins = await fetchCoins();
  return <SimulatorClient initialCoins={coins} />;
}
