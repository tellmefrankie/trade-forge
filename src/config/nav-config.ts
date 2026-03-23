import { NavItem } from '@/types';

export const navItems: NavItem[] = [
  {
    title: '대시보드',
    url: '/dashboard',
    icon: 'dashboard',
    isActive: false,
    shortcut: ['d', 'd'],
    items: []
  },
  {
    title: '매매 내역',
    url: '/trades',
    icon: 'trades',
    isActive: false,
    shortcut: ['t', 't'],
    items: []
  },
  {
    title: '봇 관리',
    url: '/bots',
    icon: 'bot',
    isActive: false,
    shortcut: ['b', 'b'],
    items: []
  },
  {
    title: '포트폴리오',
    url: '/portfolio',
    icon: 'portfolio',
    isActive: false,
    shortcut: ['p', 'p'],
    items: []
  },
  {
    title: '백테스트',
    url: '/backtest',
    icon: 'backtest',
    isActive: false,
    items: []
  },
  {
    title: '설정',
    url: '#',
    icon: 'settings',
    isActive: false,
    items: [
      {
        title: 'API 키 관리',
        url: '/settings/api-keys',
        icon: 'key'
      },
      {
        title: '알림 설정',
        url: '/settings/alerts',
        icon: 'bell'
      }
    ]
  }
];
