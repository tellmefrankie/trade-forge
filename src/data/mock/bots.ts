export type BotStatus = 'running' | 'stopped' | 'error';
export type StrategyType = 'grid' | 'rsi' | 'ma_cross' | 'bollinger';

export interface BotParams {
  // Grid
  upperPrice?: number;
  lowerPrice?: number;
  gridCount?: number;
  // RSI
  rsiPeriod?: number;
  overbought?: number;
  oversold?: number;
  // MA Cross
  shortPeriod?: number;
  longPeriod?: number;
  // Bollinger
  bbPeriod?: number;
  bbMultiplier?: number;
}

export interface Bot {
  id: string;
  name: string;
  nameEn: string;
  strategy: StrategyType;
  strategyLabel: string;
  strategyLabelEn: string;
  symbol: string;
  status: BotStatus;
  todayTrades: number;
  todayPnl: number;
  totalPnl: number;
  totalTrades: number;
  winRate: number;
  investAmount: number;
  stopLoss: number;
  takeProfit: number;
  params: BotParams;
  createdAt: string;
  runningDays: number;
}

export const strategyOptions = [
  {
    value: 'grid' as StrategyType,
    label: '그리드 트레이딩',
    labelEn: 'Grid Trading'
  },
  {
    value: 'rsi' as StrategyType,
    label: 'RSI 역추세',
    labelEn: 'RSI Reversal'
  },
  {
    value: 'ma_cross' as StrategyType,
    label: '이동평균 크로스',
    labelEn: 'MA Cross'
  },
  {
    value: 'bollinger' as StrategyType,
    label: '볼린저밴드 브레이크아웃',
    labelEn: 'Bollinger Breakout'
  }
];

export const bots: Bot[] = [
  {
    id: 'bot-1',
    name: '그리드 트레이딩',
    nameEn: 'Grid Trading',
    strategy: 'grid',
    strategyLabel: '그리드',
    strategyLabelEn: 'Grid',
    symbol: 'BTC',
    status: 'running',
    todayTrades: 12,
    todayPnl: 89_200,
    totalPnl: 1_847_300,
    totalTrades: 342,
    winRate: 67.2,
    investAmount: 5_000_000,
    stopLoss: 5,
    takeProfit: 10,
    params: {
      upperPrice: 145_000_000,
      lowerPrice: 130_000_000,
      gridCount: 15
    },
    createdAt: '2026.01.15',
    runningDays: 67
  },
  {
    id: 'bot-2',
    name: 'RSI 역추세',
    nameEn: 'RSI Reversal',
    strategy: 'rsi',
    strategyLabel: 'RSI',
    strategyLabelEn: 'RSI',
    symbol: 'ETH',
    status: 'running',
    todayTrades: 5,
    todayPnl: 42_100,
    totalPnl: 923_400,
    totalTrades: 156,
    winRate: 61.5,
    investAmount: 3_000_000,
    stopLoss: 3,
    takeProfit: 8,
    params: {
      rsiPeriod: 14,
      overbought: 70,
      oversold: 30
    },
    createdAt: '2026.02.01',
    runningDays: 50
  },
  {
    id: 'bot-3',
    name: '이동평균 크로스',
    nameEn: 'MA Cross',
    strategy: 'ma_cross',
    strategyLabel: '이평선',
    strategyLabelEn: 'MA Cross',
    symbol: 'SOL',
    status: 'stopped',
    todayTrades: 0,
    todayPnl: 0,
    totalPnl: -124_500,
    totalTrades: 48,
    winRate: 52.1,
    investAmount: 2_000_000,
    stopLoss: 4,
    takeProfit: 6,
    params: {
      shortPeriod: 7,
      longPeriod: 25
    },
    createdAt: '2026.03.01',
    runningDays: 22
  }
];
