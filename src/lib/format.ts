import { format } from 'date-fns';

export function formatDate(
  date: Date | string | undefined,
  pattern = 'yyyy.MM.dd HH:mm'
) {
  if (!date) return '';
  return format(new Date(date), pattern);
}

export function formatCurrency(value: number, locale: string = 'ko'): string {
  if (locale === 'ko') {
    return `₩${value.toLocaleString('ko-KR')}`;
  }
  return `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function formatPercent(value: number): string {
  const prefix = value >= 0 ? '+' : '';
  return `${prefix}${value.toFixed(2)}%`;
}
