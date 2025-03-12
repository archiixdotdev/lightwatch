import type { Meta, StoryObj } from '@storybook/react';
import { MetricCard } from './metric-card';
import { 
  Cpu, 
  Database, 
  MemoryStick, 
  Network, 
  Clock, 
  HardDrive,
  AlertTriangle
} from 'lucide-react';

const meta: Meta<typeof MetricCard> = {
  title: 'Dashboard/MetricCard',
  component: MetricCard,
  tags: ['autodocs'],
  argTypes: {
    changeDirection: {
      control: 'select',
      options: ['up', 'down', 'neutral']
    },
    iconColor: {
      control: 'text'
    },
    changeColor: {
      control: 'text'
    },
    icon: {
      control: false
    }
  }
};

export default meta;
type Story = StoryObj<typeof MetricCard>;

export const CPUUsage: Story = {
  args: {
    title: 'CPU Usage',
    value: '78%',
    icon: Cpu,
    changeLabel: '+12.5% from last hour',
    iconColor: 'text-blue-500',
    changeDirection: 'up',
    changeColor: 'text-yellow-500'
  }
};

export const MemoryUtilization: Story = {
  args: {
    title: 'Memory Usage',
    value: '13.4 GB',
    icon: MemoryStick,
    changeLabel: '-5.2% from last hour',
    iconColor: 'text-purple-500',
    changeDirection: 'down',
    changeColor: 'text-green-500'
  }
};

export const NetworkLatency: Story = {
  args: {
    title: 'Network Latency',
    value: '42ms',
    icon: Network,
    changeLabel: '+15ms from baseline',
    iconColor: 'text-orange-500',
    changeDirection: 'up',
    changeColor: 'text-red-500'
  }
};

export const DiskUsage: Story = {
  args: {
    title: 'Disk Usage',
    value: '82%',
    icon: HardDrive,
    changeLabel: '+3.8% from last check',
    iconColor: 'text-emerald-500',
    changeDirection: 'up',
    changeColor: 'text-yellow-500'
  }
};

export const DatabaseConnections: Story = {
  args: {
    title: 'DB Connections',
    value: '1,234',
    icon: Database,
    changeLabel: 'Stable',
    iconColor: 'text-blue-500',
    changeDirection: 'neutral',
    changeColor: 'text-gray-500'
  }
};

export const ErrorRate: Story = {
  args: {
    title: 'Error Rate',
    value: '0.05%',
    icon: AlertTriangle,
    changeLabel: '-0.02% from last hour',
    iconColor: 'text-red-500',
    changeDirection: 'down',
    changeColor: 'text-green-500'
  }
};

export const Uptime: Story = {
  args: {
    title: 'System Uptime',
    value: '99.99%',
    icon: Clock,
    changeLabel: '+0.01% from last month',
    iconColor: 'text-green-500',
    changeDirection: 'up',
    changeColor: 'text-green-500'
  }
}; 