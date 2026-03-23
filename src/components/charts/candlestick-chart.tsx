'use client';

import { useEffect, useRef } from 'react';
import {
  createChart,
  type IChartApi,
  type CandlestickData,
  type Time,
  CandlestickSeries,
  ColorType
} from 'lightweight-charts';

interface CandlestickChartProps {
  data: CandlestickData<Time>[];
  className?: string;
}

export default function CandlestickChart({
  data,
  className
}: CandlestickChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: '#8b949e',
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 11
      },
      grid: {
        vertLines: { color: '#21262d' },
        horzLines: { color: '#21262d' }
      },
      crosshair: {
        vertLine: { color: '#30363d', labelBackgroundColor: '#161b22' },
        horzLine: { color: '#30363d', labelBackgroundColor: '#161b22' }
      },
      rightPriceScale: {
        borderColor: '#30363d'
      },
      timeScale: {
        borderColor: '#30363d',
        timeVisible: true
      },
      handleScale: { mouseWheel: true, pinch: true },
      handleScroll: { mouseWheel: true, pressedMouseMove: true }
    });

    const candleSeries = chart.addSeries(CandlestickSeries, {
      upColor: '#00c087',
      downColor: '#f6465d',
      borderUpColor: '#00c087',
      borderDownColor: '#f6465d',
      wickUpColor: '#00c087',
      wickDownColor: '#f6465d'
    });

    candleSeries.setData(data);
    chart.timeScale().fitContent();
    chartRef.current = chart;

    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({
          width: chartContainerRef.current.clientWidth
        });
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(chartContainerRef.current);

    return () => {
      resizeObserver.disconnect();
      chart.remove();
      chartRef.current = null;
    };
  }, [data]);

  return <div ref={chartContainerRef} className={className} />;
}
