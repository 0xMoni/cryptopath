export interface Lesson {
  id: string;
  question: string;
  analogy: string;
  explanation: string;
}

export interface Quiz {
  question: string;
  options: string[];
  correctIndex: number;
}

export interface Level {
  id: number;
  title: string;
  description: string;
  icon: string;
  lessons: Lesson[];
  quiz: Quiz[];
}

export const levels: Level[] = [
  {
    id: 1,
    title: "What is Crypto?",
    description: "The absolute basics — what this whole thing is about",
    icon: "🌱",
    lessons: [
      {
        id: "1-1",
        question: "What is a blockchain?",
        analogy: "A shared Google Doc that nobody can secretly edit or delete.",
        explanation:
          "Blockchain is a digital record book shared across thousands of computers. Once something is written, it stays forever — no single person controls it.",
      },
      {
        id: "1-2",
        question: "What is cryptocurrency?",
        analogy: "Digital money that no bank or government controls.",
        explanation:
          "Cryptocurrency is money that lives on a blockchain. You can send it to anyone in the world without needing a bank's permission. Bitcoin was the first one, created in 2009.",
      },
      {
        id: "1-3",
        question: "What is Bitcoin?",
        analogy: "Digital gold — scarce, valuable, and nobody can print more.",
        explanation:
          "Bitcoin is the first and most famous cryptocurrency. Only 21 million will ever exist. People buy it as a store of value, like gold, but it lives entirely on the internet.",
      },
      {
        id: "1-4",
        question: "Why do people invest in crypto?",
        analogy: "Buying land in a new city before it grows — risky, but potentially rewarding.",
        explanation:
          "Some believe crypto is the future of money and technology. Early adopters can benefit if adoption grows. But it's volatile — prices can swing wildly. High risk, high potential reward.",
      },
    ],
    quiz: [
      {
        question: "What's a blockchain?",
        options: [
          "A type of bank account",
          "A shared digital record that can't be secretly edited",
          "A cryptocurrency exchange",
          "A government database",
        ],
        correctIndex: 1,
      },
      {
        question: "How many Bitcoin will ever exist?",
        options: ["Unlimited", "100 million", "21 million", "1 billion"],
        correctIndex: 2,
      },
      {
        question: "Who controls cryptocurrency?",
        options: [
          "The government",
          "Banks",
          "No single person or entity",
          "The creator",
        ],
        correctIndex: 2,
      },
    ],
  },
  {
    id: 2,
    title: "Wallets & Safety",
    description: "How to store crypto and not lose it",
    icon: "🔐",
    lessons: [
      {
        id: "2-1",
        question: "What is a crypto wallet?",
        analogy: "Your email address (public) + your password (private key). Share the address, NEVER the password.",
        explanation:
          "A wallet has two parts: a public address (where people send you crypto) and a private key (proves you own it). If someone gets your private key, they can take everything.",
      },
      {
        id: "2-2",
        question: "What is a seed phrase?",
        analogy: "The master key to your entire vault — 12 random words on paper.",
        explanation:
          "When you create a wallet, you get 12-24 random words. These can recover your wallet from any device. Lose them = lose access forever. Write them on paper, never store digitally.",
      },
      {
        id: "2-3",
        question: "Hot wallet vs Cold wallet?",
        analogy: "Hot = wallet in your pocket (convenient, less safe). Cold = safe at home (inconvenient, very safe).",
        explanation:
          "Hot wallets are apps connected to the internet — easy to use but hackable. Cold wallets are physical devices (like a USB) that store crypto offline. Use cold for large amounts.",
      },
      {
        id: "2-4",
        question: "How to spot a scam?",
        analogy: "If someone on the street promised to double your money in a week, you'd walk away. Same rules online.",
        explanation:
          "Red flags: guaranteed returns, pressure to act fast, strangers asking you to send crypto, unknown tokens in your wallet. Legit projects never DM you first or promise fixed profits.",
      },
    ],
    quiz: [
      {
        question: "What should you NEVER share?",
        options: [
          "Your wallet address",
          "Your private key / seed phrase",
          "Your transaction history",
          "The coins you own",
        ],
        correctIndex: 1,
      },
      {
        question: "Where is the SAFEST place to store large amounts of crypto?",
        options: [
          "On an exchange",
          "In a hot wallet app",
          "In a cold wallet (hardware device)",
          "In a screenshot on your phone",
        ],
        correctIndex: 2,
      },
      {
        question: "Which is a red flag for a scam?",
        options: [
          "A project with open source code",
          "Someone DMing you guaranteed 10x returns",
          "A coin listed on major exchanges",
          "A project with a public team",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 3,
    title: "How to Buy",
    description: "From zero to your first purchase — step by step",
    icon: "💰",
    lessons: [
      {
        id: "3-1",
        question: "What is an exchange?",
        analogy: "A currency exchange counter at the airport — but for crypto.",
        explanation:
          "An exchange is where you buy/sell crypto using regular money (INR, USD). Popular ones: Coinbase, WazirX, Binance. They verify your identity, hold your crypto, and let you trade.",
      },
      {
        id: "3-2",
        question: "What is KYC and why do they need my ID?",
        analogy: "Same as opening a bank account — they're legally required to verify who you are.",
        explanation:
          "KYC (Know Your Customer) is a legal requirement. Exchanges ask for your ID and sometimes a selfie. This isn't a scam — it's how they comply with anti-money laundering laws.",
      },
      {
        id: "3-3",
        question: "How much should I start with?",
        analogy: "Think of it as paying for a course. Start with what you'd spend on a textbook — $10 to $50.",
        explanation:
          "Start small — money you're okay losing entirely. Your first buy is about learning the process, not getting rich. You can always add more once you're confident.",
      },
      {
        id: "3-4",
        question: "What is DCA (Dollar Cost Averaging)?",
        analogy: "Buying a little every week instead of everything at once — smooths out the ups and downs.",
        explanation:
          "Instead of investing $500 all at once (and worrying about timing), invest $50 every week. Some weeks the price is high, some low — it averages out. Less stressful, proven strategy.",
      },
    ],
    quiz: [
      {
        question: "Why do exchanges ask for your ID (KYC)?",
        options: [
          "To steal your identity",
          "It's a legal requirement for anti-money laundering",
          "To sell your data",
          "It's optional and you can skip it",
        ],
        correctIndex: 1,
      },
      {
        question: "What's the best approach for a beginner's first investment?",
        options: [
          "Put your entire savings in one coin",
          "Start small with money you can afford to lose",
          "Wait for the perfect moment to buy",
          "Borrow money to invest more",
        ],
        correctIndex: 1,
      },
      {
        question: "What is DCA?",
        options: [
          "Buying everything at once when price is low",
          "A type of cryptocurrency",
          "Investing a fixed amount at regular intervals",
          "Selling when the price drops",
        ],
        correctIndex: 2,
      },
    ],
  },
  {
    id: 4,
    title: "Beyond the Basics",
    description: "Ethereum, DeFi, and the bigger picture",
    icon: "🚀",
    lessons: [
      {
        id: "4-1",
        question: "What is Ethereum?",
        analogy: "If Bitcoin is digital gold, Ethereum is a digital computer anyone can program.",
        explanation:
          "Ethereum is a blockchain that runs code (smart contracts). It powers most of DeFi, NFTs, and Web3 apps. Its currency ETH is used to pay gas fees on the network.",
      },
      {
        id: "4-2",
        question: "What are gas fees?",
        analogy: "A delivery charge. You pay a small fee for the network to process your transaction.",
        explanation:
          "Every time you send crypto or use a blockchain app, validators do work to confirm it. Gas fees are their payment. Fees go up when the network is busy — like surge pricing.",
      },
      {
        id: "4-3",
        question: "What is DeFi?",
        analogy: "A bank with no bankers. Code runs everything — lending, borrowing, earning interest.",
        explanation:
          "DeFi (Decentralized Finance) replaces banks with code. You can lend your crypto and earn interest, borrow against it, or trade — all without a middleman. Higher reward, higher risk.",
      },
      {
        id: "4-4",
        question: "What is HODL?",
        analogy: "Buy it, forget it exists, check back in a year. Don't let daily prices stress you.",
        explanation:
          "HODL (originally a typo for 'hold') means holding crypto long-term regardless of price drops. The opposite of day trading. Most beginners do best with this strategy.",
      },
    ],
    quiz: [
      {
        question: "What makes Ethereum different from Bitcoin?",
        options: [
          "It's more expensive",
          "It can run programs and apps (smart contracts)",
          "It's controlled by a company",
          "It has unlimited supply",
        ],
        correctIndex: 1,
      },
      {
        question: "When are gas fees highest?",
        options: [
          "At night",
          "On weekends",
          "When the network is busy",
          "When crypto prices are low",
        ],
        correctIndex: 2,
      },
      {
        question: "What does HODL mean?",
        options: [
          "Sell quickly for profit",
          "Hold long-term regardless of price swings",
          "Buy only during dips",
          "A type of wallet",
        ],
        correctIndex: 1,
      },
    ],
  },
];
