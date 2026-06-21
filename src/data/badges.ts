export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  condition: string;
}

export const badges: Badge[] = [
  {
    id: "first-steps",
    name: "First Steps",
    description: "Complete Level 1",
    icon: "🌱",
    condition: "Complete the 'What is Crypto?' level",
  },
  {
    id: "safety-first",
    name: "Safety First",
    description: "Complete Level 2",
    icon: "🔐",
    condition: "Complete the 'Staying Safe' level",
  },
  {
    id: "smart-shopper",
    name: "Smart Shopper",
    description: "Complete Level 3",
    icon: "💰",
    condition: "Complete the 'Buying Your First Crypto' level",
  },
  {
    id: "beyond-basic",
    name: "Beyond Basic",
    description: "Complete Level 4",
    icon: "🚀",
    condition: "Complete the 'Beyond the Basics' level",
  },
  {
    id: "paper-trader",
    name: "Paper Trader",
    description: "Make your first trade",
    icon: "📈",
    condition: "Execute at least one buy or sell in the simulator",
  },
  {
    id: "diversified",
    name: "Diversified",
    description: "Hold 3+ different coins",
    icon: "🎯",
    condition: "Have 3 or more different coins in your portfolio",
  },
  {
    id: "diamond-hands",
    name: "Diamond Hands",
    description: "Hold through a loss without selling",
    icon: "💎",
    condition: "Hold a coin that dropped in value without panic selling",
  },
  {
    id: "profit-taker",
    name: "Profit Taker",
    description: "Sell a coin for profit",
    icon: "🏆",
    condition: "Successfully sell a coin at a higher price than you bought it",
  },
  {
    id: "scholar",
    name: "Scholar",
    description: "Complete all 4 levels",
    icon: "🎓",
    condition: "Finish every learning level in CryptoPath",
  },
  {
    id: "whale",
    name: "Whale",
    description: "Have portfolio value over $5000",
    icon: "🐋",
    condition: "Grow your paper trading portfolio to over $5,000",
  },
];
