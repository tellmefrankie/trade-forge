'use client';

import { cn } from '@/lib/utils';
import { type Bot } from '@/data/mock/bots';
import { formatCurrency, formatPercent } from '@/lib/format';

interface BotStatusCardProps {
  bot: Bot;
  locale: string;
}

export function BotStatusCard({ bot, locale }: BotStatusCardProps) {
  const isKo = locale === 'ko';
  const statusLabels: Record<string, { ko: string; en: string }> = {
    running: { ko: '실행 중', en: 'Running' },
    stopped: { ko: '중지', en: 'Stopped' },
    error: { ko: '에러', en: 'Error' }
  };

  return (
    <div className='bg-card border-border rounded-lg border p-3'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <span className='font-mono text-sm font-semibold'>
            {isKo ? bot.name : bot.nameEn}
          </span>
          <span className='text-muted-foreground font-mono text-xs'>
            {bot.symbol}
          </span>
        </div>
        <span
          className={cn(
            'rounded-full px-2 py-0.5 text-xs font-medium',
            bot.status === 'running' && 'bg-profit/10 text-profit',
            bot.status === 'stopped' && 'bg-muted text-muted-foreground',
            bot.status === 'error' && 'bg-loss/10 text-loss'
          )}
        >
          {isKo ? statusLabels[bot.status].ko : statusLabels[bot.status].en}
        </span>
      </div>
      <div className='mt-2 grid grid-cols-3 gap-2 text-xs'>
        <div>
          <span className='text-muted-foreground'>
            {isKo ? '오늘 거래' : 'Trades'}
          </span>
          <p className='font-mono font-medium'>{bot.todayTrades}</p>
        </div>
        <div>
          <span className='text-muted-foreground'>
            {isKo ? '오늘 수익' : "Today's P&L"}
          </span>
          <p
            className={cn(
              'font-mono font-medium',
              bot.todayPnl > 0 && 'text-profit',
              bot.todayPnl < 0 && 'text-loss'
            )}
          >
            {bot.todayPnl > 0 ? '+' : ''}
            {formatCurrency(bot.todayPnl, isKo ? 'ko' : 'en')}
          </p>
        </div>
        <div>
          <span className='text-muted-foreground'>
            {isKo ? '총 수익' : 'Total P&L'}
          </span>
          <p
            className={cn(
              'font-mono font-medium',
              bot.totalPnl > 0 && 'text-profit',
              bot.totalPnl < 0 && 'text-loss'
            )}
          >
            {bot.totalPnl > 0 ? '+' : ''}
            {formatCurrency(bot.totalPnl, isKo ? 'ko' : 'en')}
          </p>
        </div>
      </div>
    </div>
  );
}
