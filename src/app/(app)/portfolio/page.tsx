'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  holdings,
  totalPortfolioValue,
  cumReturn30d,
  cumReturn60d,
  cumReturn90d,
  performanceMetrics
} from '@/data/mock/portfolio';
import { AssetDonutChart } from '@/components/charts/asset-donut-chart';
import { ProfitLineChart } from '@/components/charts/profit-line-chart';
import { formatCurrency } from '@/lib/format';
import { cn } from '@/lib/utils';

const periodData = {
  '30d': cumReturn30d,
  '60d': cumReturn60d,
  '90d': cumReturn90d
};

type Period = '30d' | '60d' | '90d';

export default function PortfolioPage() {
  const t = useTranslations('portfolio');
  const tNav = useTranslations('nav');
  const isKo = tNav('dashboard') === '대시보드';
  const locale = isKo ? 'ko' : 'en';

  const [period, setPeriod] = useState<Period>('30d');

  const COLORS = ['#00d4ff', '#00c087', '#f0b90b', '#8b949e'];

  return (
    <div className='flex flex-1 flex-col gap-3 p-3'>
      {/* Header */}
      <div>
        <h1 className='text-xl font-semibold'>{t('title')}</h1>
        <p className='text-muted-foreground text-xs'>{t('description')}</p>
      </div>

      {/* Top row: Total value + Donut chart + Holdings table */}
      <div className='grid gap-3 lg:grid-cols-[280px_1fr]'>
        {/* Donut chart side */}
        <div className='bg-card border-border rounded-lg border p-3'>
          <h3 className='text-muted-foreground mb-1 text-xs'>
            {t('totalValue')}
          </h3>
          <p className='mb-3 font-mono text-2xl font-bold'>
            {formatCurrency(totalPortfolioValue, locale)}
          </p>

          <h3 className='text-muted-foreground mb-1 text-xs'>
            {t('allocation')}
          </h3>
          <AssetDonutChart data={holdings} locale={locale} />

          {/* Legend */}
          <div className='mt-2 flex flex-col gap-1'>
            {holdings.map((h, i) => (
              <div
                key={h.symbol}
                className='flex items-center justify-between text-xs'
              >
                <div className='flex items-center gap-2'>
                  <div
                    className='h-2.5 w-2.5 rounded-full'
                    style={{ backgroundColor: COLORS[i] }}
                  />
                  <span>{isKo ? h.name : h.nameEn}</span>
                </div>
                <span className='font-mono font-medium'>
                  {h.allocation.toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Holdings table */}
        <div className='bg-card border-border overflow-hidden rounded-lg border'>
          <div className='border-border border-b px-4 py-2.5'>
            <h3 className='text-sm font-semibold'>{t('holdings')}</h3>
          </div>
          <div className='overflow-x-auto'>
            <table className='w-full text-xs'>
              <thead>
                <tr className='border-border bg-muted/30 border-b'>
                  <th className='px-4 py-2 text-left font-medium'>
                    {t('table.symbol')}
                  </th>
                  <th className='px-4 py-2 text-right font-medium'>
                    {t('table.amount')}
                  </th>
                  <th className='px-4 py-2 text-right font-medium'>
                    {t('table.avgPrice')}
                  </th>
                  <th className='px-4 py-2 text-right font-medium'>
                    {t('table.currentPrice')}
                  </th>
                  <th className='px-4 py-2 text-right font-medium'>
                    {t('table.value')}
                  </th>
                  <th className='px-4 py-2 text-right font-medium'>
                    {t('table.pnl')}
                  </th>
                  <th className='px-4 py-2 text-right font-medium'>
                    {t('table.pnlPercent')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {holdings.map((h) => (
                  <tr
                    key={h.symbol}
                    className='border-border hover:bg-muted/20 border-b last:border-b-0'
                  >
                    <td className='px-4 py-2.5'>
                      <div className='flex items-center gap-2'>
                        <span className='font-mono font-semibold'>
                          {h.symbol}
                        </span>
                        <span className='text-muted-foreground'>
                          {isKo ? h.name : h.nameEn}
                        </span>
                      </div>
                    </td>
                    <td className='px-4 py-2.5 text-right font-mono'>
                      {h.symbol === 'USDT'
                        ? formatCurrency(h.amount, locale)
                        : h.amount}
                    </td>
                    <td className='px-4 py-2.5 text-right font-mono'>
                      {h.symbol === 'USDT'
                        ? '—'
                        : formatCurrency(h.avgPrice, locale)}
                    </td>
                    <td className='px-4 py-2.5 text-right font-mono'>
                      {h.symbol === 'USDT'
                        ? '—'
                        : formatCurrency(h.currentPrice, locale)}
                    </td>
                    <td className='px-4 py-2.5 text-right font-mono font-medium'>
                      {formatCurrency(h.value, locale)}
                    </td>
                    <td className='px-4 py-2.5 text-right'>
                      <span
                        className={cn(
                          'font-mono font-medium',
                          h.pnl > 0
                            ? 'text-profit'
                            : h.pnl < 0
                              ? 'text-loss'
                              : 'text-muted-foreground'
                        )}
                      >
                        {h.pnl === 0
                          ? '—'
                          : `${h.pnl > 0 ? '+' : ''}${formatCurrency(h.pnl, locale)}`}
                      </span>
                    </td>
                    <td className='px-4 py-2.5 text-right'>
                      <span
                        className={cn(
                          'font-mono font-medium',
                          h.pnlPercent > 0
                            ? 'text-profit'
                            : h.pnlPercent < 0
                              ? 'text-loss'
                              : 'text-muted-foreground'
                        )}
                      >
                        {h.pnlPercent === 0
                          ? '—'
                          : `${h.pnlPercent > 0 ? '+' : ''}${h.pnlPercent}%`}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Cumulative return chart */}
      <div className='bg-card border-border rounded-lg border p-3'>
        <div className='mb-3 flex items-center justify-between'>
          <h3 className='text-sm font-semibold'>{t('cumReturn')}</h3>
          <div className='flex gap-1'>
            {(['30d', '60d', '90d'] as Period[]).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={cn(
                  'rounded px-2 py-1 font-mono text-xs transition-colors',
                  period === p
                    ? 'bg-accent-cyan/10 text-accent-cyan font-medium'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {t(`period.${p}`)}
              </button>
            ))}
          </div>
        </div>
        <ProfitLineChart data={periodData[period]} />
      </div>

      {/* Performance metrics */}
      <div className='bg-card border-border rounded-lg border p-3'>
        <h3 className='mb-3 text-sm font-semibold'>{t('performance')}</h3>
        <div className='grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7'>
          <MetricCard
            label={t('metrics.totalReturn')}
            value={`+${performanceMetrics.totalReturn}%`}
            color='profit'
          />
          <MetricCard
            label={t('metrics.mdd')}
            value={`${performanceMetrics.mdd}%`}
            color='loss'
          />
          <MetricCard
            label={t('metrics.sharpeRatio')}
            value={performanceMetrics.sharpeRatio.toFixed(2)}
          />
          <MetricCard
            label={t('metrics.profitFactor')}
            value={performanceMetrics.profitFactor.toFixed(2)}
          />
          <MetricCard
            label={t('metrics.winRate')}
            value={`${performanceMetrics.winRate}%`}
          />
          <MetricCard
            label={t('metrics.totalTrades')}
            value={String(performanceMetrics.totalTrades)}
          />
          <MetricCard
            label={t('metrics.avgHoldingDays')}
            value={`${performanceMetrics.avgHoldingDays}`}
          />
        </div>
      </div>
    </div>
  );
}

function MetricCard({
  label,
  value,
  color
}: {
  label: string;
  value: string;
  color?: 'profit' | 'loss';
}) {
  return (
    <div className='text-center'>
      <p className='text-muted-foreground text-xs'>{label}</p>
      <p
        className={cn(
          'mt-0.5 font-mono text-lg font-bold',
          color === 'profit' && 'text-profit',
          color === 'loss' && 'text-loss'
        )}
      >
        {value}
      </p>
    </div>
  );
}
