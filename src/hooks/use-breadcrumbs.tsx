'use client';

import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

const routeLabels: Record<string, string> = {
  dashboard: '대시보드',
  trades: '매매 내역',
  bots: '봇 관리',
  portfolio: '포트폴리오',
  backtest: '백테스트',
  settings: '설정',
  'api-keys': 'API 키 관리',
  alerts: '알림 설정'
};

interface BreadcrumbItem {
  title: string;
  link: string;
}

export function useBreadcrumbs(): BreadcrumbItem[] {
  const pathname = usePathname();

  return useMemo(() => {
    const segments = pathname.split('/').filter(Boolean);
    return segments.map((segment, index) => {
      const path = '/' + segments.slice(0, index + 1).join('/');
      return {
        title: routeLabels[segment] || segment,
        link: path
      };
    });
  }, [pathname]);
}
