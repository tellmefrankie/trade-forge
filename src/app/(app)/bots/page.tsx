'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { bots as initialBots, type Bot } from '@/data/mock/bots';
import { CreateBotModal } from '@/components/trading/create-bot-modal';
import { formatCurrency } from '@/lib/format';
import { cn } from '@/lib/utils';
import {
  IconPlus,
  IconPlayerPlay,
  IconPlayerStop,
  IconTrash
} from '@tabler/icons-react';

export default function BotsPage() {
  const t = useTranslations('bots');
  const tNav = useTranslations('nav');
  const isKo = tNav('dashboard') === '대시보드';
  const locale = isKo ? 'ko' : 'en';

  const [botList, setBotList] = useState<Bot[]>(initialBots);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const toggleBot = (id: string) => {
    setBotList((prev) =>
      prev.map((b) =>
        b.id === id
          ? { ...b, status: b.status === 'running' ? 'stopped' : 'running' }
          : b
      )
    );
  };

  const deleteBot = (id: string) => {
    setBotList((prev) => prev.filter((b) => b.id !== id));
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
          onClick={() => setCreateModalOpen(true)}
          className='bg-accent-cyan text-primary-foreground hover:bg-accent-cyan/90 flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors'
        >
          <IconPlus size={14} />
          {t('createBot')}
        </button>
      </div>

      {/* Bot cards */}
      <div className='grid gap-3 md:grid-cols-2 xl:grid-cols-3'>
        {botList.map((bot) => (
          <BotCard
            key={bot.id}
            bot={bot}
            locale={locale}
            t={t}
            onToggle={() => toggleBot(bot.id)}
            onDelete={() => deleteBot(bot.id)}
          />
        ))}
      </div>

      {botList.length === 0 && (
        <div className='text-muted-foreground flex flex-1 items-center justify-center py-20 text-sm'>
          {isKo
            ? '등록된 봇이 없습니다. 새 봇을 생성해보세요.'
            : 'No bots found. Create a new one.'}
        </div>
      )}

      {/* Create modal */}
      <CreateBotModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        locale={locale}
      />
    </div>
  );
}

function BotCard({
  bot,
  locale,
  t,
  onToggle,
  onDelete
}: {
  bot: Bot;
  locale: string;
  t: ReturnType<typeof useTranslations>;
  onToggle: () => void;
  onDelete: () => void;
}) {
  const isKo = locale === 'ko';

  return (
    <div className='bg-card border-border rounded-lg border'>
      {/* Card header */}
      <div className='border-border flex items-center justify-between border-b px-4 py-3'>
        <div className='flex items-center gap-2'>
          <span className='font-mono text-sm font-semibold'>
            {isKo ? bot.name : bot.nameEn}
          </span>
          <span
            className={cn(
              'rounded-full px-2 py-0.5 text-xs font-medium',
              bot.status === 'running' && 'bg-profit/10 text-profit',
              bot.status === 'stopped' && 'bg-muted text-muted-foreground',
              bot.status === 'error' && 'bg-loss/10 text-loss'
            )}
          >
            {t(`status.${bot.status}`)}
          </span>
        </div>
        <span className='text-muted-foreground font-mono text-xs'>
          {bot.symbol}/{isKo ? 'KRW' : 'USDT'}
        </span>
      </div>

      {/* Stats grid */}
      <div className='grid grid-cols-2 gap-x-4 gap-y-2 px-4 py-3 text-xs'>
        <StatRow
          label={t('card.invest')}
          value={formatCurrency(bot.investAmount, locale)}
        />
        <StatRow
          label={t('card.todayPnl')}
          value={`${bot.todayPnl > 0 ? '+' : ''}${formatCurrency(bot.todayPnl, locale)}`}
          color={
            bot.todayPnl > 0 ? 'profit' : bot.todayPnl < 0 ? 'loss' : undefined
          }
        />
        <StatRow
          label={t('card.totalPnl')}
          value={`${bot.totalPnl > 0 ? '+' : ''}${formatCurrency(bot.totalPnl, locale)}`}
          color={
            bot.totalPnl > 0 ? 'profit' : bot.totalPnl < 0 ? 'loss' : undefined
          }
        />
        <StatRow label={t('card.winRate')} value={`${bot.winRate}%`} />
        <StatRow
          label={t('card.totalTrades')}
          value={String(bot.totalTrades)}
        />
        <StatRow
          label={t('card.todayTrades')}
          value={String(bot.todayTrades)}
        />
        <StatRow
          label={t('card.stopLoss')}
          value={`-${bot.stopLoss}%`}
          color='loss'
        />
        <StatRow
          label={t('card.takeProfit')}
          value={`+${bot.takeProfit}%`}
          color='profit'
        />
        <StatRow label={t('card.created')} value={bot.createdAt} />
        <StatRow
          label={t('card.runningDays')}
          value={`${bot.runningDays} ${t('card.days')}`}
        />
      </div>

      {/* Actions */}
      <div className='border-border flex gap-2 border-t px-4 py-2.5'>
        <button
          onClick={onToggle}
          className={cn(
            'flex flex-1 items-center justify-center gap-1.5 rounded-md py-1.5 text-xs font-medium transition-colors',
            bot.status === 'running'
              ? 'bg-loss/10 text-loss hover:bg-loss/20'
              : 'bg-profit/10 text-profit hover:bg-profit/20'
          )}
        >
          {bot.status === 'running' ? (
            <>
              <IconPlayerStop size={13} />
              {t('card.stop')}
            </>
          ) : (
            <>
              <IconPlayerPlay size={13} />
              {t('card.start')}
            </>
          )}
        </button>
        <button
          onClick={onDelete}
          className='text-muted-foreground hover:text-loss flex items-center gap-1 rounded-md px-3 py-1.5 text-xs transition-colors'
        >
          <IconTrash size={13} />
          {t('card.delete')}
        </button>
      </div>
    </div>
  );
}

function StatRow({
  label,
  value,
  color
}: {
  label: string;
  value: string;
  color?: 'profit' | 'loss';
}) {
  return (
    <div className='flex items-center justify-between'>
      <span className='text-muted-foreground'>{label}</span>
      <span
        className={cn(
          'font-mono font-medium',
          color === 'profit' && 'text-profit',
          color === 'loss' && 'text-loss'
        )}
      >
        {value}
      </span>
    </div>
  );
}
