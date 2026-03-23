'use client';

import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

interface BreadcrumbItem {
  title: string;
  link: string;
}

const routeKeyMap: Record<string, string> = {
  dashboard: 'dashboard',
  trades: 'trades',
  bots: 'bots',
  portfolio: 'portfolio',
  backtest: 'backtest',
  settings: 'settings',
  'api-keys': 'apiKeys',
  alerts: 'alerts'
};

export function useBreadcrumbs(): BreadcrumbItem[] {
  const pathname = usePathname();
  const t = useTranslations('nav');

  return useMemo(() => {
    const segments = pathname.split('/').filter(Boolean);
    return segments.map((segment, index) => {
      const path = '/' + segments.slice(0, index + 1).join('/');
      const key = routeKeyMap[segment];
      return {
        title: key ? t(key) : segment,
        link: path
      };
    });
  }, [pathname, t]);
}
