'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { type PerformancePoint } from '@/data/mock/portfolio';

interface ProfitLineChartProps {
  data: PerformancePoint[];
}

export function ProfitLineChart({ data }: ProfitLineChartProps) {
  return (
    <ResponsiveContainer width='100%' height={280}>
      <LineChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
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
          interval={Math.floor(data.length / 8)}
        />
        <YAxis
          tick={{
            fill: '#8b949e',
            fontSize: 10,
            fontFamily: "'JetBrains Mono'"
          }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `${v >= 0 ? '+' : ''}${v}%`}
          width={50}
        />
        <ReferenceLine y={0} stroke='#30363d' strokeDasharray='3 3' />
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
            `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`,
            '수익률'
          ]}
        />
        <Line
          type='monotone'
          dataKey='cumReturn'
          stroke='#00d4ff'
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4, fill: '#00d4ff' }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
