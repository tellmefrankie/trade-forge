import {
  IconLayoutDashboard,
  IconArrowsExchange,
  IconRobot,
  IconChartPie,
  IconChartLine,
  IconSettings,
  IconKey,
  IconBell,
  IconChevronLeft,
  IconChevronRight,
  IconLoader2,
  IconPlus,
  IconTrash,
  IconX,
  IconCommand,
  IconProps
} from '@tabler/icons-react';

export type Icon = React.ComponentType<IconProps>;

export const Icons = {
  dashboard: IconLayoutDashboard,
  trades: IconArrowsExchange,
  bot: IconRobot,
  portfolio: IconChartPie,
  backtest: IconChartLine,
  settings: IconSettings,
  key: IconKey,
  bell: IconBell,
  logo: IconCommand,
  chevronLeft: IconChevronLeft,
  chevronRight: IconChevronRight,
  spinner: IconLoader2,
  add: IconPlus,
  trash: IconTrash,
  close: IconX
};
