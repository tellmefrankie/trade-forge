export type TradeType = 'buy' | 'sell';

export interface Trade {
  id: string;
  time: string;
  symbol: string;
  type: TradeType;
  price: number;
  amount: number;
  fee: number;
  pnl: number | null;
  pnlPercent: number | null;
  botName: string;
  botNameEn: string;
}

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const symbols = ['BTC', 'ETH', 'SOL', 'XRP', 'DOGE'];
const basePrices: Record<string, number> = {
  BTC: 138_000_000,
  ETH: 5_200_000,
  SOL: 245_000,
  XRP: 3_450,
  DOGE: 280
};
const amounts: Record<string, number> = {
  BTC: 0.005,
  ETH: 0.15,
  SOL: 3,
  XRP: 500,
  DOGE: 5000
};
const botNames = [
  { ko: '그리드 트레이딩', en: 'Grid Trading' },
  { ko: 'RSI 역추세', en: 'RSI Reversal' },
  { ko: '이동평균 크로스', en: 'MA Cross' }
];

export function generateRecentTrades(count: number = 10): Trade[] {
  const rand = seededRandom(42);
  const trades: Trade[] = [];

  for (let i = 0; i < count; i++) {
    const symbolIdx = Math.floor(rand() * symbols.length);
    const symbol = symbols[symbolIdx];
    const type: TradeType = rand() > 0.5 ? 'buy' : 'sell';
    const bot = botNames[Math.floor(rand() * botNames.length)];

    const priceVariation = (rand() - 0.5) * 0.02;
    const price = Math.round(basePrices[symbol] * (1 + priceVariation));
    const amount = amounts[symbol] * (0.5 + rand());
    const fee = Math.round(price * amount * 0.001);

    const hasPnl = type === 'sell' && rand() > 0.3;
    const pnlPercent = hasPnl ? (rand() - 0.4) * 4 : null;
    const pnl = hasPnl
      ? Math.round(price * amount * (pnlPercent! / 100))
      : null;

    const hour = Math.floor(rand() * 24);
    const minute = Math.floor(rand() * 60);
    const day = 23 - Math.floor(i / 3);

    trades.push({
      id: `trade-${i + 1}`,
      time: `2026.03.${String(day).padStart(2, '0')} ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`,
      symbol,
      type,
      price,
      amount: Number(
        amount.toFixed(symbol === 'BTC' ? 5 : symbol === 'ETH' ? 4 : 2)
      ),
      fee,
      pnl,
      pnlPercent: pnlPercent ? Number(pnlPercent.toFixed(2)) : null,
      botName: bot.ko,
      botNameEn: bot.en
    });
  }

  return trades;
}

export const recentTrades = generateRecentTrades(10);
