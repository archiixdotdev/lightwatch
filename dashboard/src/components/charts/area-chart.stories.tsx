import type { Meta, StoryObj } from '@storybook/react';
import { AreaChart, darkColorScheme, lightColorScheme } from './area-chart';

// Define some preset color palettes
const colorPalettes = {
  blue: ['#3b82f6', '#60a5fa', '#93c5fd'],
  red: ['#ef4444', '#f87171', '#fca5a5'],
  green: ['#22c55e', '#4ade80', '#86efac'],
  purple: ['#8b5cf6', '#a78bfa', '#c4b5fd'],
};

const meta: Meta<typeof AreaChart> = {
  title: 'Charts/AreaChart',
  component: AreaChart,
  tags: ['autodocs'],
  argTypes: {
    colorScheme: {
      control: 'select',
      options: ['dark', 'light'],
      mapping: {
        dark: darkColorScheme,
        light: lightColorScheme,
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof AreaChart>;

// Sample data generation function
const generateTimeSeriesData = (hours: number) => {
  return Array.from({ length: hours }, (_, i) => ({
    time: `${i}:00`,
    cpu: Math.floor(Math.random() * 40) + 30,
    memory: Math.floor(Math.random() * 30) + 40,
    disk: Math.floor(Math.random() * 20) + 50,
  }));
};

export const SingleMetric: Story = {
  args: {
    data: generateTimeSeriesData(24),
    xAxisKey: 'time',
    height: 300,
    series: [
      {
        dataKey: 'cpu',
        name: 'CPU Usage',
        color: colorPalettes.blue[0],
        gradientId: 'cpuGradient',
        gradientStops: [
          { offset: '0%', color: colorPalettes.blue[0], opacity: 0.4 },
          { offset: '100%', color: colorPalettes.blue[0], opacity: 0.1 },
        ],
      },
    ],
    yAxisDomain: [0, 100],
    colorScheme: darkColorScheme,
  },
};

// Sample data for memory usage over time
const resourceData = Array.from({ length: 24 }, (_, i) => ({
  time: `${i}:00`,
  used: Math.floor(Math.random() * 30) + 40,
  available: Math.floor(Math.random() * 20) + 20,
}));

export const StackedAreas: Story = {
  args: {
    data: resourceData,
    xAxisKey: 'time',
    height: 300,
    series: [
      {
        dataKey: 'used',
        name: 'Used Memory',
        color: '#ef4444',
        gradientId: 'usedMemoryGradient',
        gradientStops: [
          { offset: '0%', color: '#ef4444', opacity: 0.4 },
          { offset: '100%', color: '#ef4444', opacity: 0.1 },
        ],
        stackId: 'memory',
      },
      {
        dataKey: 'available',
        name: 'Available Memory',
        color: '#22c55e',
        gradientId: 'availableMemoryGradient',
        gradientStops: [
          { offset: '0%', color: '#22c55e', opacity: 0.4 },
          { offset: '100%', color: '#22c55e', opacity: 0.1 },
        ],
        stackId: 'memory',
      },
    ],
    yAxisDomain: [0, 100],
  },
};

export const MultipleMetrics: Story = {
  args: {
    data: generateTimeSeriesData(24),
    xAxisKey: 'time',
    height: 300,
    series: [
      {
        dataKey: 'cpu',
        name: 'CPU',
        color: colorPalettes.blue[0],
        gradientId: 'cpuGradient',
        gradientStops: [
          { offset: '0%', color: colorPalettes.blue[0], opacity: 0.4 },
          { offset: '100%', color: colorPalettes.blue[0], opacity: 0.1 },
        ],
      },
      {
        dataKey: 'memory',
        name: 'Memory',
        color: colorPalettes.red[0],
        gradientId: 'memoryGradient',
        gradientStops: [
          { offset: '0%', color: colorPalettes.red[0], opacity: 0.4 },
          { offset: '100%', color: colorPalettes.red[0], opacity: 0.1 },
        ],
      },
      {
        dataKey: 'disk',
        name: 'Disk',
        color: colorPalettes.green[0],
        gradientId: 'diskGradient',
        gradientStops: [
          { offset: '0%', color: colorPalettes.green[0], opacity: 0.4 },
          { offset: '100%', color: colorPalettes.green[0], opacity: 0.1 },
        ],
      },
    ],
    yAxisDomain: [0, 100],
    colorScheme: darkColorScheme,
  },
};

// Sample data with longer time range
const weeklyData = Array.from({ length: 7 }, (_, i) => ({
  day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
  traffic: Math.floor(Math.random() * 1000) + 500,
}));

export const WeeklyTraffic: Story = {
  args: {
    data: weeklyData,
    xAxisKey: 'day',
    height: 300,
    series: [
      {
        dataKey: 'traffic',
        name: 'Network Traffic',
        color: '#8b5cf6',
        gradientId: 'trafficGradient',
        gradientStops: [
          { offset: '0%', color: '#8b5cf6', opacity: 0.4 },
          { offset: '100%', color: '#8b5cf6', opacity: 0.1 },
        ],
      },
    ],
  },
}; 