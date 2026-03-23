'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { IconBell } from '@tabler/icons-react';

interface AlertCondition {
  key: string;
  labelKey: string;
  enabled: boolean;
}

interface AlertLog {
  id: string;
  time: string;
  message: string;
  messageEn: string;
}

const initialConditions: AlertCondition[] = [
  { key: 'onTrade', labelKey: 'onTrade', enabled: true },
  { key: 'onProfit', labelKey: 'onProfit', enabled: true },
  { key: 'onStopLoss', labelKey: 'onStopLoss', enabled: true },
  { key: 'onError', labelKey: 'onError', enabled: false }
];

const alertLogs: AlertLog[] = [
  {
    id: '1',
    time: '2026.03.23 14:30',
    message: '[BTC] 매수 체결: ₩138,420,000 × 0.005 BTC',
    messageEn: '[BTC] Buy filled: $102,533.33 × 0.005 BTC'
  },
  {
    id: '2',
    time: '2026.03.23 13:15',
    message: '[ETH] 매도 체결: ₩5,215,000 × 0.15 ETH (+1.2%)',
    messageEn: '[ETH] Sell filled: $3,862.96 × 0.15 ETH (+1.2%)'
  },
  {
    id: '3',
    time: '2026.03.23 11:42',
    message: '[SOL] 손절 발동: -4.0% 도달',
    messageEn: '[SOL] Stop loss triggered: -4.0% reached'
  },
  {
    id: '4',
    time: '2026.03.22 22:10',
    message: '[BTC 그리드] 익절 목표 도달: +10.0%',
    messageEn: '[BTC Grid] Take profit target: +10.0%'
  },
  {
    id: '5',
    time: '2026.03.22 18:33',
    message: '[ETH RSI] 매수 체결: ₩5,180,000 × 0.2 ETH',
    messageEn: '[ETH RSI] Buy filled: $3,837.04 × 0.2 ETH'
  }
];

export default function AlertsPage() {
  const t = useTranslations('settings.alerts');
  const tNav = useTranslations('nav');
  const isKo = tNav('dashboard') === '대시보드';

  const [conditions, setConditions] = useState(initialConditions);
  const [token, setToken] = useState('');

  const toggleCondition = (key: string) => {
    setConditions((prev) =>
      prev.map((c) => (c.key === key ? { ...c, enabled: !c.enabled } : c))
    );
  };

  return (
    <div className='flex flex-1 flex-col gap-3 p-3'>
      <div>
        <h1 className='text-xl font-semibold'>{t('title')}</h1>
        <p className='text-muted-foreground text-xs'>{t('description')}</p>
      </div>

      {/* Telegram token */}
      <div className='bg-card border-border rounded-lg border p-4'>
        <label className='text-muted-foreground mb-1.5 block text-xs'>
          {t('telegramToken')}
        </label>
        <div className='flex gap-2'>
          <input
            type='text'
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder={t('tokenPlaceholder')}
            className='bg-input border-border flex-1 rounded-md border px-3 py-1.5 font-mono text-xs'
          />
          <button className='bg-accent-cyan text-primary-foreground hover:bg-accent-cyan/90 rounded-md px-4 py-1.5 text-xs font-medium'>
            {t('save')}
          </button>
        </div>
      </div>

      {/* Alert conditions */}
      <div className='bg-card border-border rounded-lg border'>
        <div className='border-border border-b px-4 py-2.5'>
          <h3 className='text-sm font-semibold'>{t('conditions')}</h3>
        </div>
        <div className='divide-border divide-y'>
          {conditions.map((cond) => (
            <div
              key={cond.key}
              className='flex items-center justify-between px-4 py-3'
            >
              <div className='flex items-center gap-2'>
                <IconBell size={14} className='text-muted-foreground' />
                <span className='text-sm'>{t(cond.labelKey)}</span>
              </div>
              <button
                onClick={() => toggleCondition(cond.key)}
                className={`relative h-5 w-9 rounded-full transition-colors ${
                  cond.enabled ? 'bg-profit' : 'bg-muted'
                }`}
              >
                <span
                  className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${
                    cond.enabled ? 'left-[18px]' : 'left-0.5'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Alert history */}
      <div className='bg-card border-border rounded-lg border'>
        <div className='border-border border-b px-4 py-2.5'>
          <h3 className='text-sm font-semibold'>{t('history')}</h3>
        </div>
        {alertLogs.length === 0 ? (
          <div className='text-muted-foreground px-4 py-8 text-center text-xs'>
            {t('noHistory')}
          </div>
        ) : (
          <div className='divide-border divide-y'>
            {alertLogs.map((log) => (
              <div key={log.id} className='px-4 py-2.5'>
                <div className='text-muted-foreground mb-0.5 font-mono text-xs'>
                  {log.time}
                </div>
                <div className='text-xs'>
                  {isKo ? log.message : log.messageEn}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
