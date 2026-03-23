'use client';

import dynamic from 'next/dynamic';
import { type CandlestickData, type Time } from 'lightweight-charts';

const CandlestickChart = dynamic(
  () => import('@/components/charts/candlestick-chart'),
  { ssr: false }
);

// Sample data for testing — will be replaced with full mock data in stage 2
const sampleData: CandlestickData<Time>[] = Array.from(
  { length: 30 },
  (_, i) => {
    const date = new Date(2026, 2, i + 1);
    const basePrice = 135000000 + Math.random() * 10000000;
    const open = basePrice;
    const close = basePrice + (Math.random() - 0.45) * 3000000;
    const high = Math.max(open, close) + Math.random() * 1500000;
    const low = Math.min(open, close) - Math.random() * 1500000;
    return {
      time: (date.getTime() / 1000) as Time,
      open,
      high,
      low,
      close
    };
  }
);

export default function DashboardPage() {
  return (
    <div className='flex flex-1 flex-col gap-3 p-3'>
      <h1 className='text-xl font-semibold'>대시보드</h1>
      <div className='border-border bg-card rounded-lg border p-3'>
        <div className='text-muted-foreground mb-2 font-mono text-xs'>
          BTC/KRW · 캔들스틱 차트 테스트
        </div>
        <CandlestickChart data={sampleData} className='h-[400px] w-full' />
      </div>
    </div>
  );
}
