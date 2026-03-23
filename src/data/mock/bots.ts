export type BotStatus = 'running' | 'stopped' | 'error';

export interface Bot {
  id: string;
  name: string;
  nameEn: string;
  strategy: string;
  strategyEn: string;
  symbol: string;
  status: BotStatus;
  todayTrades: number;
  todayPnl: number;
  totalPnl: number;
  investAmount: number;
}

export const bots: Bot[] = [
  {
    id: 'bot-1',
    name: '그리드 트레이딩',
    nameEn: 'Grid Trading',
    strategy: '그리드',
    strategyEn: 'Grid',
    symbol: 'BTC',
    status: 'running',
    todayTrades: 12,
    todayPnl: 89_200,
    totalPnl: 1_847_300,
    investAmount: 5_000_000
  },
  {
    id: 'bot-2',
    name: 'RSI 역추세',
    nameEn: 'RSI Reversal',
    strategy: 'RSI',
    strategyEn: 'RSI',
    symbol: 'ETH',
    status: 'running',
    todayTrades: 5,
    todayPnl: 42_100,
    totalPnl: 923_400,
    investAmount: 3_000_000
  },
  {
    id: 'bot-3',
    name: '이동평균 크로스',
    nameEn: 'MA Cross',
    strategy: '이평선',
    strategyEn: 'MA Cross',
    symbol: 'SOL',
    status: 'stopped',
    todayTrades: 0,
    todayPnl: 0,
    totalPnl: -124_500,
    investAmount: 2_000_000
  }
];
