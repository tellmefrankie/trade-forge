'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import {
  IconPlus,
  IconTrash,
  IconCheck,
  IconShieldLock
} from '@tabler/icons-react';

interface ApiKey {
  id: string;
  exchange: string;
  apiKey: string;
  connected: boolean;
}

const exchanges = [
  { value: 'upbit', label: '업비트', labelEn: 'Upbit' },
  { value: 'bithumb', label: '빗썸', labelEn: 'Bithumb' },
  { value: 'binance', label: '바이낸스', labelEn: 'Binance' }
];

export default function ApiKeysPage() {
  const t = useTranslations('settings.apiKeys');
  const tNav = useTranslations('nav');
  const isKo = tNav('dashboard') === '대시보드';

  const [keys, setKeys] = useState<ApiKey[]>([
    { id: '1', exchange: 'upbit', apiKey: 'XXXX...7f2a', connected: true }
  ]);
  const [exchange, setExchange] = useState('upbit');
  const [apiKey, setApiKey] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [testResult, setTestResult] = useState<string | null>(null);

  const handleAdd = () => {
    if (!apiKey || !secretKey) return;
    const masked = apiKey.slice(0, 4) + '...' + apiKey.slice(-4);
    setKeys((prev) => [
      ...prev,
      { id: String(Date.now()), exchange, apiKey: masked, connected: false }
    ]);
    setApiKey('');
    setSecretKey('');
  };

  const handleTest = (id: string) => {
    setKeys((prev) =>
      prev.map((k) => (k.id === id ? { ...k, connected: true } : k))
    );
    setTestResult(id);
    setTimeout(() => setTestResult(null), 2000);
  };

  const handleDelete = (id: string) => {
    setKeys((prev) => prev.filter((k) => k.id !== id));
  };

  return (
    <div className='flex flex-1 flex-col gap-3 p-3'>
      <div>
        <h1 className='text-xl font-semibold'>{t('title')}</h1>
        <p className='text-muted-foreground text-xs'>{t('description')}</p>
      </div>

      {/* Add key form */}
      <div className='bg-card border-border rounded-lg border p-4'>
        <div className='grid gap-3 sm:grid-cols-4'>
          <div>
            <label className='text-muted-foreground mb-1.5 block text-xs'>
              {t('exchange')}
            </label>
            <select
              value={exchange}
              onChange={(e) => setExchange(e.target.value)}
              className='bg-input border-border w-full rounded-md border px-3 py-1.5 text-xs'
            >
              {exchanges.map((ex) => (
                <option key={ex.value} value={ex.value}>
                  {isKo ? ex.label : ex.labelEn}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className='text-muted-foreground mb-1.5 block text-xs'>
              {t('apiKey')}
            </label>
            <input
              type='text'
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder='API Key'
              className='bg-input border-border w-full rounded-md border px-3 py-1.5 font-mono text-xs'
            />
          </div>
          <div>
            <label className='text-muted-foreground mb-1.5 block text-xs'>
              {t('secretKey')}
            </label>
            <input
              type='password'
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
              placeholder='Secret Key'
              className='bg-input border-border w-full rounded-md border px-3 py-1.5 font-mono text-xs'
            />
          </div>
          <div className='flex items-end'>
            <button
              onClick={handleAdd}
              className='bg-accent-cyan text-primary-foreground hover:bg-accent-cyan/90 flex w-full items-center justify-center gap-1.5 rounded-md py-1.5 text-xs font-medium'
            >
              <IconPlus size={14} />
              {t('add')}
            </button>
          </div>
        </div>
      </div>

      {/* Registered keys */}
      <div className='bg-card border-border rounded-lg border'>
        <div className='border-border border-b px-4 py-2.5'>
          <h3 className='text-sm font-semibold'>{t('registered')}</h3>
        </div>
        {keys.length === 0 ? (
          <div className='text-muted-foreground px-4 py-8 text-center text-xs'>
            {t('noKeys')}
          </div>
        ) : (
          <div className='divide-border divide-y'>
            {keys.map((k) => {
              const ex = exchanges.find((e) => e.value === k.exchange);
              return (
                <div
                  key={k.id}
                  className='flex items-center justify-between px-4 py-3'
                >
                  <div className='flex items-center gap-4'>
                    <span className='text-xs font-medium'>
                      {isKo ? ex?.label : ex?.labelEn}
                    </span>
                    <span className='text-muted-foreground font-mono text-xs'>
                      {k.apiKey}
                    </span>
                    {k.connected && (
                      <span className='text-profit flex items-center gap-1 text-xs'>
                        <IconCheck size={12} />
                        {t('testSuccess')}
                      </span>
                    )}
                  </div>
                  <div className='flex gap-2'>
                    <button
                      onClick={() => handleTest(k.id)}
                      className='bg-secondary hover:bg-secondary/80 rounded px-2.5 py-1 text-xs'
                    >
                      {t('test')}
                    </button>
                    <button
                      onClick={() => handleDelete(k.id)}
                      className='text-muted-foreground hover:text-loss text-xs'
                    >
                      <IconTrash size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Encryption notice */}
      <div className='text-muted-foreground flex items-center gap-2 text-xs'>
        <IconShieldLock size={14} />
        {t('encryption')}
      </div>
    </div>
  );
}
