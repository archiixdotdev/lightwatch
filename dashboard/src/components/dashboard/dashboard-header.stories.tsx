import type { Meta, StoryObj } from '@storybook/react';
import { DashboardHeader } from './dashboard-header';

const meta: Meta<typeof DashboardHeader> = {
  title: 'Dashboard/DashboardHeader',
  component: DashboardHeader,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="min-h-[120px] bg-background p-4">
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof DashboardHeader>;

// Default state with all features
export const Default: Story = {
  args: {
    connectionStatus: 'connected',
    notificationCount: 15
  }
};

// Connected State
export const Connected: Story = {
  args: {
    connectionStatus: 'connected',
    notificationCount: 5
  }
};

// Connecting State
export const Connecting: Story = {
  args: {
    connectionStatus: 'connecting',
    notificationCount: 0
  }
};

// Disconnected State
export const Disconnected: Story = {
  args: {
    connectionStatus: 'disconnected',
    notificationCount: 3
  }
};

// Mobile viewport
export const Mobile: Story = {
  args: {
    connectionStatus: 'connected',
    notificationCount: 15
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
};

// Dark mode
export const DarkMode: Story = {
  args: {
    connectionStatus: 'connected',
    notificationCount: 15
  },
  parameters: {
    backgrounds: {
      default: 'dark'
    }
  },
  decorators: [
    (Story) => (
      <div className="dark min-h-[120px] bg-background p-4">
        <Story />
      </div>
    )
  ]
};

// With many notifications
export const WithManyNotifications: Story = {
  args: {
    connectionStatus: 'connected',
    notificationCount: 99
  }
};

// With no notifications
export const WithNoNotifications: Story = {
  args: {
    connectionStatus: 'connected',
    notificationCount: 0
  }
}; 