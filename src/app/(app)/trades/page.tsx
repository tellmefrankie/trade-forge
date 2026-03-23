'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import {
  tradeHistory,
  dailyPnlData,
  type TradeRecord
} from '@/data/mock/trade-history';
import { DailyPnlBarChart } from '@/components/charts/daily-pnl-bar-chart';
import { formatCurrency } from '@/lib/format';
import { cn } from '@/lib/utils';
import { IconDownload } from '@tabler/icons-react';

const ITEMS_PER_PAGE = 15;
const symbols = ['all', 'BTC', 'ETH', 'SOL', 'XRP', 'DOGE'];
const periods = ['all', 'today', 'thisWeek', 'thisMonth'];
const types = ['all', 'buy', 'sell'];
const results = ['all', 'profit', 'loss'];

export default function TradesPage() {
  const t = useTranslations('trades');
  const tNav = useTranslations('nav');
  const isKo = tNav('dashboard') === '대시보드';
  const locale = isKo ? 'ko' : 'en';

  const [page, setPage] = useState(1);
  const [filterSymbol, setFilterSymbol] = useState('all');
  const [filterPeriod, setFilterPeriod] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [filterResult, setFilterResult] = useState('all');

  const filtered = useMemo(() => {
    let data = tradeHistory;

    if (filterSymbol !== 'all') {
      data = data.filter((t) => t.symbol === filterSymbol);
    }
    if (filterType !== 'all') {
      data = data.filter((t) => t.type === filterType);
    }
    if (filterResult !== 'all') {
      data = data.filter((t) => t.result === filterResult);
    }
    if (filterPeriod !== 'all') {
      const now = new Date(2026, 2, 23);
      data = data.filter((t) => {
        const parts = t.time.split(' ')[0].split('.');
        const tradeDate = new Date(
          Number(parts[0]),
          Number(parts[1]) - 1,
          Number(parts[2])
        );
        if (filterPeriod === 'today') {
          return tradeDate.toDateString() === now.toDateString();
        }
        if (filterPeriod === 'thisWeek') {
          const weekAgo = new Date(now);
          weekAgo.setDate(weekAgo.getDate() - 7);
          return tradeDate >= weekAgo;
        }
        if (filterPeriod === 'thisMonth') {
          return (
            tradeDate.getMonth() === now.getMonth() &&
            tradeDate.getFullYear() === now.getFullYear()
          );
        }
        return true;
      });
    }

    return data;
  }, [filterSymbol, filterPeriod, filterType, filterResult]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paged = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const handleExportCSV = () => {
    const headers = [
      'Time',
      'Symbol',
      'Type',
      'Price',
      'Amount',
      'Total',
      'Fee',
      'P&L',
      'P&L%',
      'Bot'
    ];
    const rows = filtered.map((t) =>
      [
        t.time,
        t.symbol,
        t.type,
        t.price,
        t.amount,
        t.total,
        t.fee,
        t.pnl ?? '',
        t.pnlPercent ?? '',
        isKo ? t.botName : t.botNameEn
      ].join(',')
    );
    const csv = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'trade-history.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className='flex flex-1 flex-col gap-3 p-3'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-xl font-semibold'>{t('title')}</h1>
          <p className='text-muted-foreground text-xs'>{t('description')}</p>
        </div>
        <button
          onClick={handleExportCSV}
          className='bg-secondary hover:bg-secondary/80 flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors'
        >
          <IconDownload size={14} />
          {t('export')}
        </button>
      </div>

      {/* Daily PnL Chart */}
      <div className='bg-card border-border rounded-lg border p-3'>
        <div className='mb-2 flex items-center justify-between'>
          <h3 className='text-sm font-semibold'>{t('dailyPnl')}</h3>
          <span className='text-muted-foreground text-xs'>{t('last30d')}</span>
        </div>
        <DailyPnlBarChart data={dailyPnlData} locale={locale} />
      </div>

      {/* Filters */}
      <div className='flex flex-wrap gap-2'>
        <FilterGroup
          label={t('filter.period')}
          options={periods}
          value={filterPeriod}
          onChange={(v) => {
            setFilterPeriod(v);
            setPage(1);
          }}
          getLabel={(v) => t(`filter.${v === 'all' ? 'all' : v}`)}
        />
        <FilterGroup
          label={t('filter.symbol')}
          options={symbols}
          value={filterSymbol}
          onChange={(v) => {
            setFilterSymbol(v);
            setPage(1);
          }}
          getLabel={(v) => (v === 'all' ? t('filter.allSymbols') : v)}
        />
        <FilterGroup
          label={t('filter.type')}
          options={types}
          value={filterType}
          onChange={(v) => {
            setFilterType(v);
            setPage(1);
          }}
          getLabel={(v) =>
            v === 'all' ? t('filter.allTypes') : t(`filter.${v}`)
          }
        />
        <FilterGroup
          label={t('filter.result')}
          options={results}
          value={filterResult}
          onChange={(v) => {
            setFilterResult(v);
            setPage(1);
          }}
          getLabel={(v) =>
            v === 'all' ? t('filter.allResults') : t(`filter.${v}`)
          }
        />
      </div>

      {/* Table */}
      <div className='bg-card border-border overflow-hidden rounded-lg border'>
        <div className='overflow-x-auto'>
          <table className='w-full text-xs'>
            <thead>
              <tr className='border-border bg-muted/30 border-b'>
                <th className='px-3 py-2 text-left font-medium'>
                  {t('table.time')}
                </th>
                <th className='px-3 py-2 text-left font-medium'>
                  {t('table.symbol')}
                </th>
                <th className='px-3 py-2 text-left font-medium'>
                  {t('table.type')}
                </th>
                <th className='px-3 py-2 text-right font-medium'>
                  {t('table.price')}
                </th>
                <th className='px-3 py-2 text-right font-medium'>
                  {t('table.amount')}
                </th>
                <th className='px-3 py-2 text-right font-medium'>
                  {t('table.total')}
                </th>
                <th className='px-3 py-2 text-right font-medium'>
                  {t('table.fee')}
                </th>
                <th className='px-3 py-2 text-right font-medium'>
                  {t('table.pnl')}
                </th>
                <th className='px-3 py-2 text-right font-medium'>
                  {t('table.pnlPercent')}
                </th>
                <th className='px-3 py-2 text-left font-medium'>
                  {t('table.bot')}
                </th>
              </tr>
            </thead>
            <tbody>
              {paged.length === 0 ? (
                <tr>
                  <td
                    colSpan={10}
                    className='text-muted-foreground px-3 py-8 text-center'
                  >
                    {t('table.noResults')}
                  </td>
                </tr>
              ) : (
                paged.map((trade) => (
                  <TradeRow
                    key={trade.id}
                    trade={trade}
                    locale={locale}
                    t={t}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filtered.length > 0 && (
          <div className='border-border flex items-center justify-between border-t px-3 py-2'>
            <span className='text-muted-foreground text-xs'>
              {t('pagination.showing', {
                from: (page - 1) * ITEMS_PER_PAGE + 1,
                to: Math.min(page * ITEMS_PER_PAGE, filtered.length),
                total: filtered.length
              })}
            </span>
            <div className='flex gap-1'>
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className='bg-secondary hover:bg-secondary/80 rounded px-2 py-1 text-xs font-medium disabled:opacity-40'
              >
                {t('pagination.prev')}
              </button>
              {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                let pageNum: number;
                if (totalPages <= 7) {
                  pageNum = i + 1;
                } else if (page <= 4) {
                  pageNum = i + 1;
                } else if (page >= totalPages - 3) {
                  pageNum = totalPages - 6 + i;
                } else {
                  pageNum = page - 3 + i;
                }
                return (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={cn(
                      'rounded px-2 py-1 font-mono text-xs',
                      page === pageNum
                        ? 'bg-accent-cyan/10 text-accent-cyan'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    {pageNum}
                  </button>
                );
              })}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className='bg-secondary hover:bg-secondary/80 rounded px-2 py-1 text-xs font-medium disabled:opacity-40'
              >
                {t('pagination.next')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function FilterGroup({
  label,
  options,
  value,
  onChange,
  getLabel
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
  getLabel: (v: string) => string;
}) {
  return (
    <div className='flex items-center gap-1.5'>
      <span className='text-muted-foreground text-xs'>{label}</span>
      <div className='flex gap-0.5'>
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={cn(
              'rounded px-2 py-1 text-xs transition-colors',
              value === opt
                ? 'bg-secondary text-foreground font-medium'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {getLabel(opt)}
          </button>
        ))}
      </div>
    </div>
  );
}

function TradeRow({
  trade,
  locale,
  t
}: {
  trade: TradeRecord;
  locale: string;
  t: ReturnType<typeof useTranslations>;
}) {
  const isKo = locale === 'ko';
  return (
    <tr className='border-border hover:bg-muted/20 border-b last:border-b-0'>
      <td className='text-muted-foreground px-3 py-2 font-mono whitespace-nowrap'>
        {trade.time}
      </td>
      <td className='px-3 py-2 font-mono font-medium'>{trade.symbol}</td>
      <td className='px-3 py-2'>
        <span
          className={cn(
            'font-mono text-xs font-semibold',
            trade.type === 'buy' ? 'text-profit' : 'text-loss'
          )}
        >
          {t(`table.${trade.type}`)}
        </span>
      </td>
      <td className='px-3 py-2 text-right font-mono'>
        {formatCurrency(trade.price, locale)}
      </td>
      <td className='px-3 py-2 text-right font-mono'>{trade.amount}</td>
      <td className='px-3 py-2 text-right font-mono'>
        {formatCurrency(trade.total, locale)}
      </td>
      <td className='text-muted-foreground px-3 py-2 text-right font-mono'>
        {formatCurrency(trade.fee, locale)}
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
            {formatCurrency(trade.pnl, locale)}
          </span>
        ) : (
          <span className='text-muted-foreground'>—</span>
        )}
      </td>
      <td className='px-3 py-2 text-right'>
        {trade.pnlPercent !== null ? (
          <span
            className={cn(
              'font-mono font-medium',
              trade.pnlPercent > 0 ? 'text-profit' : 'text-loss'
            )}
          >
            {trade.pnlPercent > 0 ? '+' : ''}
            {trade.pnlPercent}%
          </span>
        ) : (
          <span className='text-muted-foreground'>—</span>
        )}
      </td>
      <td className='text-muted-foreground px-3 py-2 text-xs whitespace-nowrap'>
        {isKo ? trade.botName : trade.botNameEn}
      </td>
    </tr>
  );
}
