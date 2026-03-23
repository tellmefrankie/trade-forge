export interface BacktestPoint {
  date: string;
  strategy: number;
  benchmark: number;
}

export interface BacktestResult {
  totalReturn: number;
  mdd: number;
  trades: number;
  winRate: number;
  avgHoldingDays: number;
  data: BacktestPoint[];
}

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export function runBacktest(
  strategyType: string,
  _symbol: string,
  days: number,
  seed: number = 42
): BacktestResult {
  const rand = seededRandom(seed + strategyType.charCodeAt(0));
  const data: BacktestPoint[] = [];
  let strategyCum = 0;
  let benchmarkCum = 0;
  let maxStrategy = 0;
  let mdd = 0;

  const endDate = new Date(2026, 2, 23);

  // Strategy bias varies by type
  const biasMap: Record<string, number> = {
    grid: 0.44,
    rsi: 0.42,
    ma_cross: 0.4,
    bollinger: 0.43
  };
  const bias = biasMap[strategyType] || 0.42;

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(endDate);
    date.setDate(date.getDate() - i);
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');

    strategyCum += (rand() - bias) * 1.5;
    benchmarkCum += (rand() - 0.46) * 1.2;

    if (strategyCum > maxStrategy) maxStrategy = strategyCum;
    const drawdown = strategyCum - maxStrategy;
    if (drawdown < mdd) mdd = drawdown;

    data.push({
      date: `${m}.${d}`,
      strategy: Number(strategyCum.toFixed(2)),
      benchmark: Number(benchmarkCum.toFixed(2))
    });
  }

  const totalReturn = data[data.length - 1]?.strategy ?? 0;
  const trades = Math.floor(days * (0.8 + rand() * 1.5));
  const winRate = 55 + rand() * 15;

  return {
    totalReturn: Number(totalReturn.toFixed(2)),
    mdd: Number(mdd.toFixed(2)),
    trades,
    winRate: Number(winRate.toFixed(1)),
    avgHoldingDays: Number((1 + rand() * 4).toFixed(1)),
    data
  };
}
