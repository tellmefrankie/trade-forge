import { NavItem } from '@/types';

// titleKey maps to messages/[locale].json > nav.[key]
export interface NavItemWithI18n extends NavItem {
  titleKey: string;
  items?: NavItemWithI18n[];
}

export const navItems: NavItemWithI18n[] = [
  {
    title: '대시보드',
    titleKey: 'dashboard',
    url: '/dashboard',
    icon: 'dashboard',
    isActive: false,
    shortcut: ['d', 'd'],
    items: []
  },
  {
    title: '매매 내역',
    titleKey: 'trades',
    url: '/trades',
    icon: 'trades',
    isActive: false,
    shortcut: ['t', 't'],
    items: []
  },
  {
    title: '봇 관리',
    titleKey: 'bots',
    url: '/bots',
    icon: 'bot',
    isActive: false,
    shortcut: ['b', 'b'],
    items: []
  },
  {
    title: '포트폴리오',
    titleKey: 'portfolio',
    url: '/portfolio',
    icon: 'portfolio',
    isActive: false,
    shortcut: ['p', 'p'],
    items: []
  },
  {
    title: '백테스트',
    titleKey: 'backtest',
    url: '/backtest',
    icon: 'backtest',
    isActive: false,
    items: []
  },
  {
    title: '설정',
    titleKey: 'settings',
    url: '#',
    icon: 'settings',
    isActive: false,
    items: [
      {
        title: 'API 키 관리',
        titleKey: 'apiKeys',
        url: '/settings/api-keys',
        icon: 'key'
      },
      {
        title: '알림 설정',
        titleKey: 'alerts',
        url: '/settings/alerts',
        icon: 'bell'
      }
    ]
  }
];
