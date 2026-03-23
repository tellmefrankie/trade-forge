import { type CandlestickData, type Time } from 'lightweight-charts';

export interface CoinInfo {
  symbol: string;
  name: string;
  nameEn: string;
  basePrice: number;
  volatility: number;
  pair: string;
  pairEn: string;
}

export const coins: CoinInfo[] = [
  {
    symbol: 'BTC',
    name: '비트코인',
    nameEn: 'Bitcoin',
    basePrice: 138_000_000,
    volatility: 0.035,
    pair: 'BTC/KRW',
    pairEn: 'BTC/USDT'
  },
  {
    symbol: 'ETH',
    name: '이더리움',
    nameEn: 'Ethereum',
    basePrice: 5_200_000,
    volatility: 0.045,
    pair: 'ETH/KRW',
    pairEn: 'ETH/USDT'
  },
  {
    symbol: 'SOL',
    name: '솔라나',
    nameEn: 'Solana',
    basePrice: 245_000,
    volatility: 0.06,
    pair: 'SOL/KRW',
    pairEn: 'SOL/USDT'
  },
  {
    symbol: 'XRP',
    name: '리플',
    nameEn: 'Ripple',
    basePrice: 3_450,
    volatility: 0.05,
    pair: 'XRP/KRW',
    pairEn: 'XRP/USDT'
  },
  {
    symbol: 'DOGE',
    name: '도지코인',
    nameEn: 'Dogecoin',
    basePrice: 280,
    volatility: 0.07,
    pair: 'DOGE/KRW',
    pairEn: 'DOGE/USDT'
  }
];

// Seeded random for deterministic data
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export function generateCandleData(
  coin: CoinInfo,
  days: number = 90
): CandlestickData<Time>[] {
  const rand = seededRandom(
    coin.symbol.charCodeAt(0) * 1000 + coin.symbol.charCodeAt(1)
  );
  const data: CandlestickData<Time>[] = [];
  let price = coin.basePrice;

  const startDate = new Date(2026, 0, 1); // Jan 1, 2026

  for (let i = 0; i < days; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);

    const change = (rand() - 0.48) * coin.volatility;
    const open = price;
    const close = price * (1 + change);
    const highExtra = Math.abs(price * coin.volatility * rand() * 0.5);
    const lowExtra = Math.abs(price * coin.volatility * rand() * 0.5);
    const high = Math.max(open, close) + highExtra;
    const low = Math.min(open, close) - lowExtra;

    data.push({
      time: (date.getTime() / 1000) as Time,
      open: Math.round(open),
      high: Math.round(high),
      low: Math.round(low),
      close: Math.round(close)
    });

    price = close;
  }

  return data;
}

// Pre-generated data for each coin
export const candleDataMap: Record<string, CandlestickData<Time>[]> = {};
for (const coin of coins) {
  candleDataMap[coin.symbol] = generateCandleData(coin);
}

// Current prices (last candle close)
export function getCurrentPrice(symbol: string): number {
  const data = candleDataMap[symbol];
  if (!data || data.length === 0) return 0;
  return data[data.length - 1].close as number;
}

// 24h change
export function get24hChange(symbol: string): number {
  const data = candleDataMap[symbol];
  if (!data || data.length < 2) return 0;
  const prev = data[data.length - 2].close as number;
  const curr = data[data.length - 1].close as number;
  return ((curr - prev) / prev) * 100;
}
