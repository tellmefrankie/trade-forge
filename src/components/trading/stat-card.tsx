'use client';

import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: 'profit' | 'loss' | 'neutral';
  subtitle?: string;
  icon?: React.ReactNode;
}

export function StatCard({
  title,
  value,
  change,
  changeType = 'neutral',
  subtitle,
  icon
}: StatCardProps) {
  return (
    <div className='bg-card border-border rounded-lg border p-3'>
      <div className='flex items-center justify-between'>
        <span className='text-muted-foreground text-xs'>{title}</span>
        {icon && <span className='text-muted-foreground'>{icon}</span>}
      </div>
      <div className='mt-1 flex items-baseline gap-2'>
        <span className='font-mono text-xl font-bold'>{value}</span>
        {change && (
          <span
            className={cn(
              'font-mono text-xs font-medium',
              changeType === 'profit' && 'text-profit',
              changeType === 'loss' && 'text-loss',
              changeType === 'neutral' && 'text-muted-foreground'
            )}
          >
            {change}
          </span>
        )}
      </div>
      {subtitle && (
        <p className='text-muted-foreground mt-0.5 text-xs'>{subtitle}</p>
      )}
    </div>
  );
}
