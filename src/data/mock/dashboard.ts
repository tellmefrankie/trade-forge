export interface DashboardStats {
  totalAssets: number;
  totalAssetsChange: number;
  todayPnl: number;
  activeBots: number;
  totalBots: number;
  winRate: number;
  winRatePeriod: string;
}

export const dashboardStats: DashboardStats = {
  totalAssets: 12_847_320,
  totalAssetsChange: 2.4,
  todayPnl: 148_200,
  activeBots: 2,
  totalBots: 3,
  winRate: 64.2,
  winRatePeriod: '30d'
};
