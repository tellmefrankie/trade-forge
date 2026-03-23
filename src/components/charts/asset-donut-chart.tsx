'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { type HoldingAsset } from '@/data/mock/portfolio';

const COLORS = ['#00d4ff', '#00c087', '#f0b90b', '#8b949e'];

interface AssetDonutChartProps {
  data: HoldingAsset[];
  locale: string;
}

export function AssetDonutChart({ data, locale }: AssetDonutChartProps) {
  const isKo = locale === 'ko';
  const chartData = data.map((h) => ({
    name: isKo ? h.name : h.nameEn,
    value: h.allocation,
    symbol: h.symbol
  }));

  return (
    <ResponsiveContainer width='100%' height={220}>
      <PieChart>
        <Pie
          data={chartData}
          cx='50%'
          cy='50%'
          innerRadius={60}
          outerRadius={90}
          dataKey='value'
          stroke='#0d1117'
          strokeWidth={2}
        >
          {chartData.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: '#161b22',
            border: '1px solid #30363d',
            borderRadius: 6,
            fontSize: 12,
            fontFamily: "'JetBrains Mono'"
          }}
          formatter={(value: number, name: string) => [
            `${value.toFixed(1)}%`,
            name
          ]}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
