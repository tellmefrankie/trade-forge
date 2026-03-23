'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { strategyOptions, type StrategyType } from '@/data/mock/bots';
import { cn } from '@/lib/utils';
import { IconX } from '@tabler/icons-react';

const symbols = ['BTC', 'ETH', 'SOL', 'XRP', 'DOGE'];

interface CreateBotModalProps {
  open: boolean;
  onClose: () => void;
  locale: string;
}

export function CreateBotModal({ open, onClose, locale }: CreateBotModalProps) {
  const t = useTranslations('bots.create');
  const isKo = locale === 'ko';

  const [strategy, setStrategy] = useState<StrategyType>('grid');
  const [symbol, setSymbol] = useState('BTC');

  if (!open) return null;

  const strategyParams: Record<StrategyType, { key: string; label: string }[]> =
    {
      grid: [
        { key: 'upperPrice', label: t('grid.upperPrice') },
        { key: 'lowerPrice', label: t('grid.lowerPrice') },
        { key: 'gridCount', label: t('grid.gridCount') }
      ],
      rsi: [
        { key: 'rsiPeriod', label: t('rsi.period') },
        { key: 'overbought', label: t('rsi.overbought') },
        { key: 'oversold', label: t('rsi.oversold') }
      ],
      ma_cross: [
        { key: 'shortPeriod', label: t('ma.shortPeriod') },
        { key: 'longPeriod', label: t('ma.longPeriod') }
      ],
      bollinger: [
        { key: 'bbPeriod', label: t('bollinger.period') },
        { key: 'bbMultiplier', label: t('bollinger.multiplier') }
      ]
    };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
      <div className='fixed inset-0 bg-black/60' onClick={onClose} />
      <div className='bg-card border-border relative z-10 w-full max-w-lg rounded-lg border shadow-xl'>
        {/* Header */}
        <div className='border-border flex items-center justify-between border-b px-4 py-3'>
          <h2 className='text-sm font-semibold'>{t('title')}</h2>
          <button
            onClick={onClose}
            className='text-muted-foreground hover:text-foreground'
          >
            <IconX size={16} />
          </button>
        </div>

        {/* Body */}
        <div className='flex flex-col gap-4 p-4'>
          {/* Strategy */}
          <div>
            <label className='text-muted-foreground mb-1.5 block text-xs'>
              {t('strategy')}
            </label>
            <div className='grid grid-cols-2 gap-2'>
              {strategyOptions.map((s) => (
                <button
                  key={s.value}
                  onClick={() => setStrategy(s.value)}
                  className={cn(
                    'rounded-md border px-3 py-2 text-xs font-medium transition-colors',
                    strategy === s.value
                      ? 'border-accent-cyan bg-accent-cyan/10 text-accent-cyan'
                      : 'border-border text-muted-foreground hover:text-foreground'
                  )}
                >
                  {isKo ? s.label : s.labelEn}
                </button>
              ))}
            </div>
          </div>

          {/* Symbol */}
          <div>
            <label className='text-muted-foreground mb-1.5 block text-xs'>
              {t('symbol')}
            </label>
            <div className='flex gap-2'>
              {symbols.map((s) => (
                <button
                  key={s}
                  onClick={() => setSymbol(s)}
                  className={cn(
                    'rounded-md border px-3 py-1.5 font-mono text-xs transition-colors',
                    symbol === s
                      ? 'border-accent-cyan bg-accent-cyan/10 text-accent-cyan'
                      : 'border-border text-muted-foreground hover:text-foreground'
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Invest + SL/TP */}
          <div className='grid grid-cols-3 gap-3'>
            <div>
              <label className='text-muted-foreground mb-1.5 block text-xs'>
                {t('investAmount')}
              </label>
              <input
                type='number'
                defaultValue={3000000}
                className='bg-input border-border w-full rounded-md border px-3 py-1.5 font-mono text-xs'
              />
            </div>
            <div>
              <label className='text-muted-foreground mb-1.5 block text-xs'>
                {t('stopLoss')}
              </label>
              <input
                type='number'
                defaultValue={5}
                className='bg-input border-border w-full rounded-md border px-3 py-1.5 font-mono text-xs'
              />
            </div>
            <div>
              <label className='text-muted-foreground mb-1.5 block text-xs'>
                {t('takeProfit')}
              </label>
              <input
                type='number'
                defaultValue={10}
                className='bg-input border-border w-full rounded-md border px-3 py-1.5 font-mono text-xs'
              />
            </div>
          </div>

          {/* Strategy Params */}
          <div>
            <label className='text-muted-foreground mb-1.5 block text-xs'>
              {t('params')}
            </label>
            <div className='grid grid-cols-2 gap-3 md:grid-cols-3'>
              {strategyParams[strategy].map((param) => (
                <div key={param.key}>
                  <label className='text-muted-foreground mb-1 block text-xs'>
                    {param.label}
                  </label>
                  <input
                    type='number'
                    className='bg-input border-border w-full rounded-md border px-3 py-1.5 font-mono text-xs'
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className='border-border flex justify-end gap-2 border-t px-4 py-3'>
          <button
            onClick={onClose}
            className='bg-secondary hover:bg-secondary/80 rounded-md px-4 py-1.5 text-xs font-medium'
          >
            {t('cancel')}
          </button>
          <button
            onClick={onClose}
            className='bg-accent-cyan text-primary-foreground hover:bg-accent-cyan/90 rounded-md px-4 py-1.5 text-xs font-medium'
          >
            {t('submit')}
          </button>
        </div>
      </div>
    </div>
  );
}
