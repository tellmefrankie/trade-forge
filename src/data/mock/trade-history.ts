export type TradeType = 'buy' | 'sell';
export type TradeResult = 'profit' | 'loss' | 'pending';

export interface TradeRecord {
  id: string;
  time: string;
  symbol: string;
  type: TradeType;
  price: number;
  amount: number;
  total: number;
  fee: number;
  pnl: number | null;
  pnlPercent: number | null;
  result: TradeResult;
  botName: string;
  botNameEn: string;
}

export interface DailyPnl {
  date: string;
  pnl: number;
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
const baseAmounts: Record<string, number> = {
  BTC: 0.005,
  ETH: 0.15,
  SOL: 3,
  XRP: 500,
  DOGE: 5000
};
const botList = [
  { ko: '그리드 트레이딩', en: 'Grid Trading' },
  { ko: 'RSI 역추세', en: 'RSI Reversal' },
  { ko: '이동평균 크로스', en: 'MA Cross' }
];

function generateTrades(count: number): TradeRecord[] {
  const rand = seededRandom(2026);
  const trades: TradeRecord[] = [];

  for (let i = 0; i < count; i++) {
    const symbolIdx = Math.floor(rand() * symbols.length);
    const symbol = symbols[symbolIdx];
    const type: TradeType = rand() > 0.5 ? 'buy' : 'sell';
    const bot = botList[Math.floor(rand() * botList.length)];

    const priceVariation = (rand() - 0.5) * 0.04;
    const price = Math.round(basePrices[symbol] * (1 + priceVariation));
    const amountMultiplier = 0.3 + rand() * 1.5;
    const amount = Number(
      (baseAmounts[symbol] * amountMultiplier).toFixed(
        symbol === 'BTC' ? 5 : symbol === 'ETH' ? 4 : 2
      )
    );
    const total = Math.round(price * amount);
    const fee = Math.round(total * 0.001);

    // ~60% win rate for sells
    const isSell = type === 'sell';
    const hasResult = isSell && rand() > 0.15;
    let pnl: number | null = null;
    let pnlPercent: number | null = null;
    let result: TradeResult = 'pending';

    if (hasResult) {
      const isWin = rand() < 0.6;
      if (isWin) {
        pnlPercent = Number((rand() * 2.4 + 0.1).toFixed(2));
        pnl = Math.round(total * (pnlPercent / 100));
        result = 'profit';
      } else {
        pnlPercent = Number((-(rand() * 1.6 + 0.1)).toFixed(2));
        pnl = Math.round(total * (pnlPercent / 100));
        result = 'loss';
      }
    }

    // Distribute over 3 months (Jan-Mar 2026)
    const dayOffset = Math.floor(rand() * 82); // 82 days
    const baseDate = new Date(2026, 0, 1);
    baseDate.setDate(baseDate.getDate() + dayOffset);
    const hour = Math.floor(rand() * 24);
    const minute = Math.floor(rand() * 60);

    const y = baseDate.getFullYear();
    const m = String(baseDate.getMonth() + 1).padStart(2, '0');
    const d = String(baseDate.getDate()).padStart(2, '0');
    const hh = String(hour).padStart(2, '0');
    const mm = String(minute).padStart(2, '0');

    trades.push({
      id: `th-${String(i + 1).padStart(3, '0')}`,
      time: `${y}.${m}.${d} ${hh}:${mm}`,
      symbol,
      type,
      price,
      amount,
      total,
      fee,
      pnl,
      pnlPercent,
      result,
      botName: bot.ko,
      botNameEn: bot.en
    });
  }

  // Sort by time descending
  trades.sort((a, b) => (b.time > a.time ? 1 : -1));
  return trades;
}

function generateDailyPnl(): DailyPnl[] {
  const rand = seededRandom(777);
  const data: DailyPnl[] = [];

  for (let i = 29; i >= 0; i--) {
    const date = new Date(2026, 2, 23);
    date.setDate(date.getDate() - i);
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');

    // More wins than losses on average
    const pnl = Math.round((rand() - 0.38) * 300_000);
    data.push({
      date: `${m}.${d}`,
      pnl
    });
  }
  return data;
}

export const tradeHistory = generateTrades(200);
export const dailyPnlData = generateDailyPnl();
