'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { runBacktest, type BacktestResult } from '@/data/mock/backtest';
import { strategyOptions } from '@/data/mock/bots';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Legend
} from 'recharts';
import { cn } from '@/lib/utils';
import { IconPlayerPlay, IconRobot } from '@tabler/icons-react';

const symbols = ['BTC', 'ETH', 'SOL', 'XRP', 'DOGE'];

export default function BacktestPage() {
  const t = useTranslations('backtest');
  const tNav = useTranslations('nav');
  const isKo = tNav('dashboard') === '대시보드';
  const locale = isKo ? 'ko' : 'en';

  const [strategy, setStrategy] = useState('grid');
  const [symbol, setSymbol] = useState('BTC');
  const [days] = useState(90);
  const [result, setResult] = useState<BacktestResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const handleRun = () => {
    setIsRunning(true);
    // Simulate loading
    setTimeout(() => {
      const r = runBacktest(
        strategy,
        symbol,
        days,
        strategy.charCodeAt(0) + symbol.charCodeAt(0)
      );
      setResult(r);
      setIsRunning(false);
    }, 800);
  };

  return (
    <div className='flex flex-1 flex-col gap-3 p-3'>
      <div>
        <h1 className='text-xl font-semibold'>{t('title')}</h1>
        <p className='text-muted-foreground text-xs'>{t('description')}</p>
      </div>

      {/* Settings panel */}
      <div className='bg-card border-border rounded-lg border p-4'>
        <h3 className='mb-3 text-sm font-semibold'>{t('settings')}</h3>
        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
          {/* Strategy */}
          <div>
            <label className='text-muted-foreground mb-1.5 block text-xs'>
              {t('strategy')}
            </label>
            <select
              value={strategy}
              onChange={(e) => setStrategy(e.target.value)}
              className='bg-input border-border w-full rounded-md border px-3 py-1.5 text-xs'
            >
              {strategyOptions.map((s) => (
                <option key={s.value} value={s.value}>
                  {isKo ? s.label : s.labelEn}
                </option>
              ))}
            </select>
          </div>
          {/* Symbol */}
          <div>
            <label className='text-muted-foreground mb-1.5 block text-xs'>
              {t('symbol')}
            </label>
            <select
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              className='bg-input border-border w-full rounded-md border px-3 py-1.5 text-xs'
            >
              {symbols.map((s) => (
                <option key={s} value={s}>
                  {s}/{isKo ? 'KRW' : 'USDT'}
                </option>
              ))}
            </select>
          </div>
          {/* Period */}
          <div>
            <label className='text-muted-foreground mb-1.5 block text-xs'>
              {t('period')}
            </label>
            <div className='flex gap-2'>
              <input
                type='date'
                defaultValue='2025-12-23'
                className='bg-input border-border w-full rounded-md border px-2 py-1.5 text-xs'
              />
              <input
                type='date'
                defaultValue='2026-03-23'
                className='bg-input border-border w-full rounded-md border px-2 py-1.5 text-xs'
              />
            </div>
          </div>
          {/* Capital */}
          <div>
            <label className='text-muted-foreground mb-1.5 block text-xs'>
              {t('initialCapital')}
            </label>
            <input
              type='number'
              defaultValue={10000000}
              className='bg-input border-border w-full rounded-md border px-3 py-1.5 font-mono text-xs'
            />
          </div>
        </div>
        <button
          onClick={handleRun}
          disabled={isRunning}
          className='bg-accent-cyan text-primary-foreground hover:bg-accent-cyan/90 mt-4 flex items-center gap-1.5 rounded-md px-4 py-2 text-xs font-medium transition-colors disabled:opacity-50'
        >
          <IconPlayerPlay size={14} />
          {isRunning ? t('running') : t('run')}
        </button>
      </div>

      {/* Result */}
      {result && (
        <>
          {/* Chart */}
          <div className='bg-card border-border rounded-lg border p-3'>
            <h3 className='mb-3 text-sm font-semibold'>{t('returnCurve')}</h3>
            <ResponsiveContainer width='100%' height={350}>
              <LineChart
                data={result.data}
                margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray='3 3'
                  stroke='#21262d'
                  vertical={false}
                />
                <XAxis
                  dataKey='date'
                  tick={{
                    fill: '#8b949e',
                    fontSize: 10,
                    fontFamily: "'JetBrains Mono'"
                  }}
                  axisLine={{ stroke: '#30363d' }}
                  tickLine={false}
                  interval={Math.floor(result.data.length / 8)}
                />
                <YAxis
                  tick={{
                    fill: '#8b949e',
                    fontSize: 10,
                    fontFamily: "'JetBrains Mono'"
                  }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `${v >= 0 ? '+' : ''}${v}%`}
                  width={50}
                />
                <ReferenceLine y={0} stroke='#30363d' strokeDasharray='3 3' />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#161b22',
                    border: '1px solid #30363d',
                    borderRadius: 6,
                    fontSize: 12,
                    fontFamily: "'JetBrains Mono'"
                  }}
                  formatter={(value: number, name: string) => [
                    `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`,
                    name === 'strategy' ? t('strategy_line') : t('benchmark')
                  ]}
                />
                <Legend
                  formatter={(value: string) =>
                    value === 'strategy' ? t('strategy_line') : t('benchmark')
                  }
                  wrapperStyle={{
                    fontSize: 11,
                    fontFamily: "'JetBrains Mono'"
                  }}
                />
                <Line
                  type='monotone'
                  dataKey='strategy'
                  stroke='#00d4ff'
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type='monotone'
                  dataKey='benchmark'
                  stroke='#8b949e'
                  strokeWidth={1.5}
                  dot={false}
                  strokeDasharray='5 5'
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Summary cards */}
          <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5'>
            <SummaryCard
              label={t('summary.totalReturn')}
              value={`${result.totalReturn >= 0 ? '+' : ''}${result.totalReturn}%`}
              color={result.totalReturn >= 0 ? 'profit' : 'loss'}
            />
            <SummaryCard
              label={t('summary.mdd')}
              value={`${result.mdd}%`}
              color='loss'
            />
            <SummaryCard
              label={t('summary.trades')}
              value={String(result.trades)}
            />
            <SummaryCard
              label={t('summary.winRate')}
              value={`${result.winRate}%`}
            />
            <SummaryCard
              label={t('summary.avgHolding')}
              value={`${result.avgHoldingDays} ${t('summary.days')}`}
            />
          </div>

          {/* Create bot button */}
          <button className='bg-secondary hover:bg-secondary/80 flex items-center justify-center gap-2 rounded-md py-2.5 text-xs font-medium transition-colors'>
            <IconRobot size={14} />
            {t('createBot')}
          </button>
        </>
      )}
    </div>
  );
}

function SummaryCard({
  label,
  value,
  color
}: {
  label: string;
  value: string;
  color?: 'profit' | 'loss';
}) {
  return (
    <div className='bg-card border-border rounded-lg border p-3 text-center'>
      <p className='text-muted-foreground text-xs'>{label}</p>
      <p
        className={cn(
          'mt-1 font-mono text-lg font-bold',
          color === 'profit' && 'text-profit',
          color === 'loss' && 'text-loss'
        )}
      >
        {value}
      </p>
    </div>
  );
}
