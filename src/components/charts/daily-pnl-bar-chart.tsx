'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { type DailyPnl } from '@/data/mock/trade-history';

interface DailyPnlBarChartProps {
  data: DailyPnl[];
  locale: string;
}

export function DailyPnlBarChart({ data, locale }: DailyPnlBarChartProps) {
  const isKo = locale === 'ko';

  return (
    <ResponsiveContainer width='100%' height={200}>
      <BarChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
        <CartesianGrid
          strokeDasharray='3 3'
          stroke='#21262d'
          vertical={false}
        />
        <XAxis
          dataKey='date'
          tick={{
            fill: '#8b949e',
            fontSize: 10,
            fontFamily: "'JetBrains Mono'"
          }}
          axisLine={{ stroke: '#30363d' }}
          tickLine={false}
          interval={4}
        />
        <YAxis
          tick={{
            fill: '#8b949e',
            fontSize: 10,
            fontFamily: "'JetBrains Mono'"
          }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) =>
            isKo
              ? `${v >= 0 ? '+' : ''}${(v / 10000).toFixed(0)}만`
              : `${v >= 0 ? '+' : ''}$${(v / 1350).toFixed(0)}`
          }
          width={60}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#161b22',
            border: '1px solid #30363d',
            borderRadius: 6,
            fontSize: 12,
            fontFamily: "'JetBrains Mono'"
          }}
          labelStyle={{ color: '#8b949e' }}
          formatter={(value: number) => [
            isKo
              ? `₩${value.toLocaleString('ko-KR')}`
              : `$${(value / 1350).toFixed(2)}`,
            isKo ? '손익' : 'P&L'
          ]}
        />
        <Bar dataKey='pnl' radius={[2, 2, 0, 0]}>
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={entry.pnl >= 0 ? '#00c087' : '#f6465d'}
              fillOpacity={0.8}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
