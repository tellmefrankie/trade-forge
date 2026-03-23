export interface HoldingAsset {
  symbol: string;
  name: string;
  nameEn: string;
  amount: number;
  avgPrice: number;
  currentPrice: number;
  value: number;
  pnl: number;
  pnlPercent: number;
  allocation: number; // percentage
}

export interface PerformancePoint {
  date: string;
  cumReturn: number; // cumulative return %
}

export interface PerformanceMetrics {
  totalReturn: number;
  mdd: number;
  sharpeRatio: number;
  profitFactor: number;
  winRate: number;
  totalTrades: number;
  avgHoldingDays: number;
}

export const holdings: HoldingAsset[] = [
  {
    symbol: 'BTC',
    name: '비트코인',
    nameEn: 'Bitcoin',
    amount: 0.15,
    avgPrice: 132_500_000,
    currentPrice: 138_420_000,
    value: 20_763_000,
    pnl: 888_000,
    pnlPercent: 4.47,
    allocation: 52.3
  },
  {
    symbol: 'ETH',
    name: '이더리움',
    nameEn: 'Ethereum',
    amount: 2.3,
    avgPrice: 4_980_000,
    currentPrice: 5_215_000,
    value: 11_994_500,
    pnl: 540_500,
    pnlPercent: 4.72,
    allocation: 30.2
  },
  {
    symbol: 'SOL',
    name: '솔라나',
    nameEn: 'Solana',
    amount: 45,
    avgPrice: 238_000,
    currentPrice: 248_500,
    value: 11_182_500,
    pnl: 472_500,
    pnlPercent: 4.41,
    allocation: 11.9
  },
  {
    symbol: 'USDT',
    name: '현금 (원화)',
    nameEn: 'Cash (USD)',
    amount: 500_000,
    avgPrice: 1,
    currentPrice: 1,
    value: 500_000,
    pnl: 0,
    pnlPercent: 0,
    allocation: 5.6
  }
];

export const totalPortfolioValue = holdings.reduce((s, h) => s + h.value, 0);

// Seeded random for deterministic data
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function generateCumReturn(days: number, seed: number): PerformancePoint[] {
  const rand = seededRandom(seed);
  const data: PerformancePoint[] = [];
  let cumReturn = 0;
  const endDate = new Date(2026, 2, 23);

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(endDate);
    date.setDate(date.getDate() - i);
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');

    // Slight upward bias with volatility
    const dailyReturn = (rand() - 0.42) * 1.2;
    cumReturn += dailyReturn;

    data.push({
      date: `${m}.${d}`,
      cumReturn: Number(cumReturn.toFixed(2))
    });
  }
  return data;
}

export const cumReturn30d = generateCumReturn(30, 111);
export const cumReturn60d = generateCumReturn(60, 222);
export const cumReturn90d = generateCumReturn(90, 333);

export const performanceMetrics: PerformanceMetrics = {
  totalReturn: 18.7,
  mdd: -8.3,
  sharpeRatio: 1.42,
  profitFactor: 1.87,
  winRate: 64.2,
  totalTrades: 546,
  avgHoldingDays: 2.4
};
