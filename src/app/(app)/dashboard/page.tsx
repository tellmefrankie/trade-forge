'use client';

import { useTranslations } from 'next-intl';
import { StatCard } from '@/components/trading/stat-card';
import { ChartPanel } from '@/components/trading/chart-panel';
import { BotStatusCard } from '@/components/trading/bot-status-card';
import { RecentTradesTable } from '@/components/trading/recent-trades-table';
import { dashboardStats } from '@/data/mock/dashboard';
import { bots } from '@/data/mock/bots';
import { recentTrades } from '@/data/mock/trades';
import { formatCurrency } from '@/lib/format';
import {
  IconWallet,
  IconTrendingUp,
  IconRobot,
  IconTargetArrow
} from '@tabler/icons-react';

export default function DashboardPage() {
  const t = useTranslations('dashboard');
  const tNav = useTranslations('nav');
  // Detect locale from translations namespace
  const isKo = tNav('dashboard') === '대시보드';
  const locale = isKo ? 'ko' : 'en';

  return (
    <div className='flex flex-1 flex-col gap-3 p-3'>
      {/* Stat cards */}
      <div className='grid grid-cols-2 gap-3 lg:grid-cols-4'>
        <StatCard
          title={t('totalAssets')}
          value={formatCurrency(dashboardStats.totalAssets, locale)}
          change={`+${dashboardStats.totalAssetsChange}%`}
          changeType='profit'
          subtitle={t('last24h')}
          icon={<IconWallet size={16} />}
        />
        <StatCard
          title={t('todayPnl')}
          value={`+${formatCurrency(dashboardStats.todayPnl, locale)}`}
          changeType='profit'
          icon={<IconTrendingUp size={16} />}
        />
        <StatCard
          title={t('activeBots')}
          value={`${dashboardStats.activeBots}/${dashboardStats.totalBots}`}
          subtitle={t('running')}
          icon={<IconRobot size={16} />}
        />
        <StatCard
          title={t('winRate')}
          value={`${dashboardStats.winRate}%`}
          subtitle={t('last30d')}
          icon={<IconTargetArrow size={16} />}
        />
      </div>

      {/* Main content: chart + side panel */}
      <div className='grid gap-3 lg:grid-cols-[1fr_320px]'>
        {/* Chart */}
        <ChartPanel locale={locale} />

        {/* Side panel: bot status + recent trades */}
        <div className='flex flex-col gap-3'>
          <div>
            <h3 className='mb-2 text-sm font-semibold'>{t('botStatus')}</h3>
            <div className='flex flex-col gap-2'>
              {bots.map((bot) => (
                <BotStatusCard key={bot.id} bot={bot} locale={locale} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent trades table */}
      <RecentTradesTable trades={recentTrades} locale={locale} />
    </div>
  );
}
