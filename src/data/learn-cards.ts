export interface LearnCard {
  id: number;
  title: string;
  analogy: string;
  explanation: string;
  category: "basics" | "investing" | "safety";
}

export const learnCards: LearnCard[] = [
  {
    id: 1,
    title: "What is Blockchain?",
    analogy: "A shared Google Doc that nobody can secretly edit or delete.",
    explanation:
      "Blockchain is a digital record book shared across thousands of computers. Once something is written, it stays there forever — no single person controls it, and everyone can verify it.",
    category: "basics",
  },
  {
    id: 2,
    title: "What is Bitcoin?",
    analogy: "Digital gold — scarce, valuable, and nobody prints more of it.",
    explanation:
      "Bitcoin is the first cryptocurrency. Only 21 million will ever exist. People buy it as a store of value, like gold, but it lives entirely on the internet.",
    category: "basics",
  },
  {
    id: 3,
    title: "What is a Wallet?",
    analogy: "Your email address (public) + your password (private key). Share the address, NEVER the password.",
    explanation:
      "A crypto wallet has two parts: a public address (where people send you crypto) and a private key (proves you own it). If someone gets your private key, they can take everything.",
    category: "basics",
  },
  {
    id: 4,
    title: "What are Gas Fees?",
    analogy: "A delivery charge. You pay a small fee for the network to process your transaction.",
    explanation:
      "Every time you send crypto or interact with a blockchain, miners/validators do work to confirm it. Gas fees are their payment. Fees go up when the network is busy — like surge pricing on Uber.",
    category: "basics",
  },
  {
    id: 5,
    title: "What is an Exchange?",
    analogy: "A currency exchange counter at the airport — but for crypto.",
    explanation:
      "An exchange is where you buy and sell crypto using regular money (INR, USD). Popular ones: Coinbase, WazirX, Binance. They verify your identity, hold your crypto, and let you trade.",
    category: "investing",
  },
  {
    id: 6,
    title: "What is Ethereum?",
    analogy: "If Bitcoin is digital gold, Ethereum is a digital computer that anyone can program.",
    explanation:
      "Ethereum is a blockchain that runs code (smart contracts). It powers most of DeFi, NFTs, and Web3 apps. Its currency is called ETH, used to pay gas fees on the network.",
    category: "basics",
  },
  {
    id: 7,
    title: "What is a Seed Phrase?",
    analogy: "The master password to your entire bank account — written as 12 random words.",
    explanation:
      "When you create a wallet, you get 12-24 random words. These words can recover your wallet from any device. Lose them = lose access forever. Write them on paper, never store digitally.",
    category: "safety",
  },
  {
    id: 8,
    title: "What is DeFi?",
    analogy: "A bank with no bankers. Code runs everything — lending, borrowing, earning interest.",
    explanation:
      "DeFi (Decentralized Finance) replaces banks with code. You can lend your crypto and earn interest, borrow against it, or trade — all without a human middleman. Higher reward, higher risk.",
    category: "basics",
  },
  {
    id: 9,
    title: "How much should I start with?",
    analogy: "Think of it as paying for a course. Start with what you'd spend on a textbook — ₹500 to ₹2000.",
    explanation:
      "Start small — money you're okay losing entirely. This isn't about getting rich quick. Your first buy is about learning how the process feels. You can always add more once you're confident.",
    category: "investing",
  },
  {
    id: 10,
    title: "How to spot a scam?",
    analogy: "If someone on the street promised to double your money in a week, you'd walk away. Same rules apply online.",
    explanation:
      "Red flags: guaranteed returns, pressure to act fast, strangers asking you to send crypto, unknown tokens airdropped to your wallet. Legit projects never DM you first or promise fixed profits.",
    category: "safety",
  },
  {
    id: 11,
    title: "What is Volatility?",
    analogy: "A rollercoaster. Crypto prices can swing 10-20% in a day — up OR down.",
    explanation:
      "Crypto is much more volatile than stocks. A coin can gain 50% in a week, then lose 30% the next. This is normal. Never invest money you'll need soon, and don't panic-sell on dips.",
    category: "investing",
  },
  {
    id: 12,
    title: "What is HODL?",
    analogy: "Buy it, forget it exists, check back in a year. Don't let daily prices stress you.",
    explanation:
      "HODL (originally a typo for 'hold') means holding your crypto long-term regardless of short-term price drops. The opposite of day trading. Most beginners do best with this strategy.",
    category: "investing",
  },
];
