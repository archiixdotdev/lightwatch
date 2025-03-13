// components/charts/area-chart.tsx
import { ResponsiveContainer, AreaChart as RechartsAreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

// Define color scheme types
export type ChartColorScheme = {
  primary: string;
  background: string;
  grid: string;
  text: string;
  tooltip: {
    background: string;
    border: string;
    text: string;
    label: string;
  };
};

// Default dark theme
export const darkColorScheme: ChartColorScheme = {
  primary: '#3b82f6',
  background: '#1a1f2e',
  grid: '#374151',
  text: '#6b7280',
  tooltip: {
    background: '#1a1f2e',
    border: '#374151',
    text: '#ffffff',
    label: '#6b7280'
  }
};

// Default light theme
export const lightColorScheme: ChartColorScheme = {
  primary: '#2563eb',
  background: '#ffffff',
  grid: '#e5e7eb',
  text: '#4b5563',
  tooltip: {
    background: '#ffffff',
    border: '#e5e7eb',
    text: '#111827',
    label: '#4b5563'
  }
};

interface GradientStop {
  offset: string;
  color: string;
  opacity: number;
}

interface AreaSeriesProps {
  dataKey: string;
  name: string;
  color: string;
  gradientId: string;
  gradientStops: GradientStop[];
  stackId?: string;
}

interface AreaChartProps {
  data: any[];
  height?: number;
  series: AreaSeriesProps[];
  xAxisKey: string;
  yAxisDomain?: [number, number];
  colorScheme?: ChartColorScheme;
}

export function AreaChart({ 
  data, 
  height = 300, 
  series, 
  xAxisKey,
  yAxisDomain,
  colorScheme = darkColorScheme
}: AreaChartProps) {
  return (
    <div className={`h-[${height}px]`} style={{ background: colorScheme.background }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsAreaChart data={data}>
          <defs>
            {series.map((s) => (
              <linearGradient key={s.gradientId} id={s.gradientId} x1="0" y1="0" x2="0" y2="1">
                {s.gradientStops.map((stop, index) => (
                  <stop 
                    key={index}
                    offset={stop.offset} 
                    stopColor={stop.color} 
                    stopOpacity={stop.opacity} 
                  />
                ))}
              </linearGradient>
            ))}
          </defs>
          <XAxis
            dataKey={xAxisKey}
            tick={{ fill: colorScheme.text, fontSize: 12 }}
            axisLine={{ stroke: colorScheme.grid }}
            tickLine={{ stroke: colorScheme.grid }}
          />
          <YAxis
            tick={{ fill: colorScheme.text, fontSize: 12 }}
            axisLine={{ stroke: colorScheme.grid }}
            tickLine={{ stroke: colorScheme.grid }}
            domain={yAxisDomain}
          />
          <CartesianGrid strokeDasharray="3 3" stroke={colorScheme.grid} />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: colorScheme.tooltip.background, 
              borderColor: colorScheme.tooltip.border 
            }} 
            itemStyle={{ color: colorScheme.tooltip.text }}
            labelStyle={{ color: colorScheme.tooltip.label }}
          />
          {series.map((s) => (
            <Area 
              key={s.dataKey}
              type="monotone" 
              dataKey={s.dataKey} 
              name={s.name}
              stroke={s.color}
              fillOpacity={1} 
              fill={`url(#${s.gradientId})`} 
              stackId={s.stackId}
            />
          ))}
          <Legend 
            wrapperStyle={{ color: colorScheme.text }}
          />
        </RechartsAreaChart>
      </ResponsiveContainer>
    </div>
  );
}