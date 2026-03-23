'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import {
  coins,
  candleDataMap,
  getCurrentPrice,
  get24hChange
} from '@/data/mock/candles';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/lib/format';

const CandlestickChart = dynamic(
  () => import('@/components/charts/candlestick-chart'),
  {
    ssr: false,
    loading: () => <div className='bg-muted h-[400px] animate-pulse rounded' />
  }
);

const timeframes = [
  { label: '1m', value: '1m' },
  { label: '5m', value: '5m' },
  { label: '15m', value: '15m' },
  { label: '1H', value: '1h' },
  { label: '4H', value: '4h' },
  { label: '1D', value: '1d' }
];

interface ChartPanelProps {
  locale: string;
}

export function ChartPanel({ locale }: ChartPanelProps) {
  const [selectedCoin, setSelectedCoin] = useState('BTC');
  const [selectedTimeframe, setSelectedTimeframe] = useState('1d');
  const isKo = locale === 'ko';

  const coin = coins.find((c) => c.symbol === selectedCoin)!;
  const price = getCurrentPrice(selectedCoin);
  const change = get24hChange(selectedCoin);
  const data = candleDataMap[selectedCoin];

  return (
    <div className='bg-card border-border rounded-lg border'>
      {/* Header: coin selector + price + timeframe */}
      <div className='border-border flex flex-wrap items-center justify-between gap-2 border-b px-3 py-2'>
        <div className='flex items-center gap-3'>
          {/* Coin tabs */}
          <div className='flex gap-1'>
            {coins.map((c) => (
              <button
                key={c.symbol}
                onClick={() => setSelectedCoin(c.symbol)}
                className={cn(
                  'rounded px-2 py-1 font-mono text-xs font-medium transition-colors',
                  selectedCoin === c.symbol
                    ? 'bg-accent-cyan/10 text-accent-cyan'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {c.symbol}
              </button>
            ))}
          </div>
          {/* Price + change */}
          <div className='flex items-baseline gap-2'>
            <span className='font-mono text-lg font-bold'>
              {formatCurrency(price, isKo ? 'ko' : 'en')}
            </span>
            <span
              className={cn(
                'font-mono text-xs font-medium',
                change >= 0 ? 'text-profit' : 'text-loss'
              )}
            >
              {change >= 0 ? '+' : ''}
              {change.toFixed(2)}%
            </span>
          </div>
        </div>
        {/* Timeframe tabs */}
        <div className='flex gap-1'>
          {timeframes.map((tf) => (
            <button
              key={tf.value}
              onClick={() => setSelectedTimeframe(tf.value)}
              className={cn(
                'rounded px-2 py-1 font-mono text-xs transition-colors',
                selectedTimeframe === tf.value
                  ? 'bg-secondary text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {tf.label}
            </button>
          ))}
        </div>
      </div>
      {/* Chart */}
      <div className='p-2'>
        <CandlestickChart data={data} className='h-[400px] w-full' />
      </div>
      {/* Pair info */}
      <div className='border-border text-muted-foreground border-t px-3 py-1.5 font-mono text-xs'>
        {isKo ? coin.pair : coin.pairEn} · {isKo ? coin.name : coin.nameEn}
      </div>
    </div>
  );
}
