'use client';

import { cn } from '@/lib/utils';
import { type Trade } from '@/data/mock/trades';
import { formatCurrency } from '@/lib/format';

interface RecentTradesTableProps {
  trades: Trade[];
  locale: string;
}

export function RecentTradesTable({ trades, locale }: RecentTradesTableProps) {
  const isKo = locale === 'ko';

  return (
    <div className='bg-card border-border rounded-lg border'>
      <div className='border-border border-b p-3'>
        <h3 className='text-sm font-semibold'>
          {isKo ? '최근 체결 내역' : 'Recent Trades'}
        </h3>
      </div>
      <div className='overflow-x-auto'>
        <table className='w-full text-xs'>
          <thead>
            <tr className='border-border text-muted-foreground border-b'>
              <th className='px-3 py-2 text-left font-medium'>
                {isKo ? '시간' : 'Time'}
              </th>
              <th className='px-3 py-2 text-left font-medium'>
                {isKo ? '종목' : 'Pair'}
              </th>
              <th className='px-3 py-2 text-left font-medium'>
                {isKo ? '유형' : 'Side'}
              </th>
              <th className='px-3 py-2 text-right font-medium'>
                {isKo ? '가격' : 'Price'}
              </th>
              <th className='px-3 py-2 text-right font-medium'>
                {isKo ? '손익' : 'P&L'}
              </th>
              <th className='px-3 py-2 text-left font-medium'>
                {isKo ? '봇' : 'Bot'}
              </th>
            </tr>
          </thead>
          <tbody>
            {trades.map((trade) => (
              <tr
                key={trade.id}
                className='border-border hover:bg-muted/30 border-b last:border-b-0'
              >
                <td className='text-muted-foreground px-3 py-2 font-mono'>
                  {trade.time.split(' ')[1]}
                </td>
                <td className='px-3 py-2 font-mono font-medium'>
                  {trade.symbol}
                </td>
                <td className='px-3 py-2'>
                  <span
                    className={cn(
                      'font-mono font-medium',
                      trade.type === 'buy' ? 'text-profit' : 'text-loss'
                    )}
                  >
                    {trade.type === 'buy'
                      ? isKo
                        ? '매수'
                        : 'BUY'
                      : isKo
                        ? '매도'
                        : 'SELL'}
                  </span>
                </td>
                <td className='px-3 py-2 text-right font-mono'>
                  {formatCurrency(trade.price, isKo ? 'ko' : 'en')}
                </td>
                <td className='px-3 py-2 text-right'>
                  {trade.pnl !== null ? (
                    <span
                      className={cn(
                        'font-mono font-medium',
                        trade.pnl > 0 ? 'text-profit' : 'text-loss'
                      )}
                    >
                      {trade.pnl > 0 ? '+' : ''}
                      {formatCurrency(trade.pnl, isKo ? 'ko' : 'en')}
                    </span>
                  ) : (
                    <span className='text-muted-foreground'>—</span>
                  )}
                </td>
                <td className='text-muted-foreground px-3 py-2 text-xs'>
                  {isKo ? trade.botName : trade.botNameEn}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
