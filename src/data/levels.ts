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
  whyWrong: string;
  funFact: string;
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
        whyWrong: "A blockchain isn't controlled by any bank or government. It's a decentralized ledger — think of it as a public notebook that thousands of computers maintain together.",
        funFact: "The Bitcoin blockchain has never been hacked since 2009. That's 17+ years of unbroken security — more reliable than most banks!",
      },
      {
        question: "How many Bitcoin will ever exist?",
        options: ["Unlimited", "100 million", "21 million", "1 billion"],
        correctIndex: 2,
        whyWrong: "Bitcoin has a hard cap coded into its DNA. Unlike regular money that governments can print endlessly, only 21 million BTC will ever exist. That's what makes it scarce like gold.",
        funFact: "About 4 million Bitcoin are lost forever — people forgot passwords, threw away hard drives, or lost seed phrases. One man in Wales has been trying to dig up a landfill for years to find a hard drive with 7,500 BTC ($750M+)!",
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
        whyWrong: "That's the whole point of crypto — no single entity controls it. It's maintained by thousands of computers worldwide. Even Bitcoin's creator (Satoshi Nakamoto) can't change the rules alone.",
        funFact: "Nobody knows who created Bitcoin. Satoshi Nakamoto is a pseudonym — they disappeared in 2011 and their wallet holds ~1 million BTC (worth $100B+). The greatest mystery in tech!",
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
        whyWrong: "Your wallet address is public — it's safe to share (like an email address). But your private key or seed phrase is the password to everything. Share it = lose everything instantly.",
        funFact: "In 2022, a crypto investor lost $8 million because they stored their seed phrase in a cloud note app that got hacked. Paper and metal backups are the only truly safe storage!",
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
        whyWrong: "Exchanges and hot wallets are connected to the internet — they can be hacked. A cold wallet (like a Ledger or Trezor) stores your keys offline, making it virtually unhackable.",
        funFact: "The Ledger Nano (a cold wallet) looks like a USB stick but protects billions of dollars. Some people even store their seed phrases on titanium plates that survive fire up to 1,665°C!",
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
        whyWrong: "No one can guarantee returns in crypto. Legitimate projects never DM you first, never pressure you, and never promise specific profits. If it sounds too good to be true, it's a scam.",
        funFact: "The biggest crypto scam ever (OneCoin) stole $4 billion. Its founder called herself the 'CryptoQueen' — she disappeared in 2017 and is still on the FBI's most wanted list!",
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
        whyWrong: "KYC (Know Your Customer) is required by law in most countries. It prevents money laundering and terrorism financing. Every legit exchange does it — just like opening a bank account.",
        funFact: "Coinbase has verified over 110 million users' identities. The process that feels annoying actually protects YOU — it means the exchange is regulated and your funds have legal protection!",
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
        whyWrong: "Never invest money you need for rent, food, or emergencies. Crypto is volatile — it can drop 50% in a week. Start with a small amount you'd be OK losing entirely. Your first investment is about learning, not getting rich.",
        funFact: "If you had invested just $10 in Bitcoin in 2010, it would be worth over $10 million today. But here's the catch — 90% of people who bought early sold way too soon because they panicked during dips!",
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
        whyWrong: "DCA (Dollar Cost Averaging) means investing the same amount on a regular schedule — regardless of price. It removes emotion and timing anxiety from the equation.",
        funFact: "Studies show that DCA beats trying to 'time the market' 92% of the time. Even professional traders can't consistently predict the bottom. Boring consistency wins!",
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
        whyWrong: "Bitcoin only stores and transfers value. Ethereum is a programmable blockchain — developers can build apps, games, and financial tools on top of it using smart contracts.",
        funFact: "Over $80 billion is locked in Ethereum DeFi apps right now. People are earning interest, trading, and borrowing — all without a single bank involved. It's like a parallel financial system!",
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
        whyWrong: "Gas fees are based on demand, not time. When many people are trying to use the network at once (like during an NFT drop or market crash), fees spike because everyone is competing for space.",
        funFact: "During the 2021 NFT boom, some people paid $500+ in gas fees for a single transaction! That's why Layer 2 networks (like Arbitrum) were built — same security, 100x cheaper fees.",
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
        whyWrong: "HODL means holding your crypto long-term no matter what the price does. It's the opposite of day trading — you buy, hold for years, and ignore the daily noise.",
        funFact: "The word HODL was born from a typo in a 2013 Bitcoin forum post. A drunk trader wrote 'I AM HODLING' instead of 'holding' during a price crash. The community loved it so much it became the #1 crypto strategy name!",
      },
    ],
  },
];
