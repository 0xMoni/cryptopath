export interface JargonEntry {
  term: string;
  simple: string;
  example?: string;
}

export const jargonList: JargonEntry[] = [
  { term: "Blockchain", simple: "A shared digital record book that nobody can secretly edit.", example: "Like a Google Doc that thousands of people can see but nobody can delete from." },
  { term: "Bitcoin (BTC)", simple: "The first and most famous cryptocurrency. Digital gold.", example: "Only 21 million will ever exist — that scarcity is what gives it value." },
  { term: "Ethereum (ETH)", simple: "A blockchain that runs programs. Bitcoin stores value, Ethereum runs apps.", example: "Most NFTs, DeFi apps, and Web3 projects are built on Ethereum." },
  { term: "Wallet", simple: "Where you store crypto. Has a public address (like your email) and a private key (like your password)." },
  { term: "Seed Phrase", simple: "12-24 random words that can recover your entire wallet. The ultimate backup.", example: "Lose this = lose everything. Write it on paper, never screenshot it." },
  { term: "Gas Fee", simple: "A small fee you pay for the network to process your transaction.", example: "Like a delivery charge — busier network = higher fee." },
  { term: "Exchange", simple: "A website where you buy/sell crypto with regular money.", example: "Coinbase, WazirX, Binance — they're like stockbrokers but for crypto." },
  { term: "DeFi", simple: "Banks without bankers. Lending, borrowing, and earning interest — all run by code.", example: "You can lend your crypto and earn 3-8% interest without any bank involved." },
  { term: "NFT", simple: "A digital certificate of ownership. Proves you own a specific digital item.", example: "Like a deed for a house, but for digital art, music, or game items." },
  { term: "Smart Contract", simple: "A self-executing agreement written in code. If X happens, do Y — automatically.", example: "Like a vending machine: put in money → get item. No human needed." },
  { term: "Mining", simple: "Using computers to verify transactions and earn crypto as a reward.", example: "Miners are like accountants who check everyone's math and get paid for it." },
  { term: "Staking", simple: "Locking up your crypto to help secure the network, earning rewards in return.", example: "Like a fixed deposit — you commit funds for a period and earn interest." },
  { term: "HODL", simple: "Hold On for Dear Life. Means keeping your crypto long-term, ignoring price swings." },
  { term: "Altcoin", simple: "Any cryptocurrency that's NOT Bitcoin.", example: "Ethereum, Solana, Cardano — all altcoins." },
  { term: "Market Cap", simple: "Total value of all coins in circulation. Price × number of coins.", example: "A $1 coin with 1 billion coins = $1B market cap." },
  { term: "Volatility", simple: "How much the price swings. Crypto is very volatile — 10% swings are normal." },
  { term: "Bull Market", simple: "Prices going up. People are optimistic and buying." },
  { term: "Bear Market", simple: "Prices going down. People are scared and selling." },
  { term: "Rug Pull", simple: "A scam where creators abandon a project and run away with investors' money.", example: "They hype a token, people buy in, then the team vanishes with the cash." },
  { term: "DYOR", simple: "Do Your Own Research. Don't trust anyone blindly — verify before you invest." },
  { term: "FOMO", simple: "Fear Of Missing Out. The panic you feel when prices rise and you haven't bought yet." },
  { term: "FUD", simple: "Fear, Uncertainty, Doubt. Negative news/rumors that scare people into selling." },
  { term: "Whale", simple: "Someone who holds a LOT of crypto. Their trades can move the entire market." },
  { term: "Cold Wallet", simple: "A wallet not connected to the internet. Safest storage for large amounts.", example: "Like keeping cash in a safe at home vs. carrying it in your pocket." },
  { term: "Hot Wallet", simple: "A wallet connected to the internet. Convenient but less secure.", example: "Like the wallet in your pocket — easy to use, but easier to steal from." },
  { term: "KYC", simple: "Know Your Customer. Exchanges verify your identity (ID, selfie) before letting you trade.", example: "It's not a scam — it's legally required, like opening a bank account." },
  { term: "Layer 2", simple: "A faster, cheaper network built on top of a main blockchain.", example: "Like an express lane on a highway. Same destination, less traffic, lower toll." },
  { term: "Airdrop", simple: "Free tokens sent to your wallet, usually as a promotion or reward.", example: "Sometimes legit, often scams. Never connect your wallet to claim random airdrops." },
  { term: "DCA", simple: "Dollar Cost Averaging. Buying a fixed amount regularly regardless of price.", example: "Buy $50 of BTC every week. Some weeks it's high, some low — averages out." },
  { term: "Liquidity", simple: "How easily you can buy/sell without affecting the price much.", example: "Bitcoin has high liquidity (easy to sell). A random small token may not." },
];
