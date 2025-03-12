import type { Meta, StoryObj } from '@storybook/react';
import { ServerCard } from '@/components/servers/server-card';
import { action } from '@storybook/addon-actions';
import { ServerStatus } from '@/types/server';

const meta: Meta<typeof ServerCard> = {
  title: 'Servers/ServerCard',
  component: ServerCard,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="max-w-2xl">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ServerCard>;

const defaultActions = {
  onViewDetails: action('View Details clicked'),
  onViewConsole: action('View Console clicked'),
  onRestart: action('Restart clicked'),
};

export const HealthyServer: Story = {
  args: {
    server: {
        id: 1,
        name: 'prod-web-01',
        status: ServerStatus.ONLINE,
        type: 'Web Server',
        location: 'US East',
        cpu: 45,
        memory: 60,
        disk: 35,
        network: 0,
        last_checkin: 0
    },
    ...defaultActions
  }
};

export const WarningServer: Story = {
  args: {
    server: {
        id: 2,
        name: 'prod-db-01',
        status: ServerStatus.WARNING,
        type: 'Database',
        location: 'US West',
        cpu: 85,
        memory: 92,
        disk: 78,
        network: 0,
        last_checkin: 0
    },
    ...defaultActions
  }
};

export const ErrorServer: Story = {
  args: {
    server: {
        id: 3,
        name: 'prod-cache-01',
        status: ServerStatus.ERROR,
        type: 'Cache Server',
        location: 'EU Central',
        cpu: 98,
        memory: 95,
        disk: 96,
        network: 0,
        last_checkin: 0
    },
    ...defaultActions
  }
};

export const HighLoadServer: Story = {
  args: {
    server: {
        id: 4,
        name: 'staging-api-01',
        status: ServerStatus.WARNING,
        type: 'API Server',
        location: 'Asia Pacific',
        cpu: 92,
        memory: 87,
        disk: 45,
        network: 0,
        last_checkin: 0
    },
    ...defaultActions
  }
};

export const LowResourceServer: Story = {
  args: {
    server: {
        id: 5,
        name: 'dev-test-01',
        status: ServerStatus.ONLINE,
        type: 'Test Server',
        location: 'Local',
        cpu: 12,
        memory: 24,
        disk: 15,
        network: 0,
        last_checkin: 0
    },
    ...defaultActions
  }
}; 