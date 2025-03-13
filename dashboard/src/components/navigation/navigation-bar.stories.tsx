import { Meta, StoryObj } from "@storybook/react";
import { NavigationBar } from "./navigation-bar";
import { AlertTriangle, Bot, FileCode, LineChart, Server, Settings } from "lucide-react";
import { useRouter } from 'next/navigation';

const withRouter = (Story: any) => {
  // @ts-ignore - mock router for storybook
  useRouter.mockImplementation(() => ({
    push: () => {},
  }));
  
  return (
    <div className="max-w-4xl mx-auto">
      <Story />
    </div>
  );
};

const meta: Meta<typeof NavigationBar> = {
    title: 'Navigation/NavigationBar',
    component: NavigationBar,
    tags: ['autodocs'],
    decorators: [withRouter]
}

export default meta;

type Story = StoryObj<typeof NavigationBar>;

const defaultTabs = [
    {
        label: 'Overview',
        icon: LineChart,
        value: 'overview',
        href: '/overview',
    },
    {
        label: 'Servers',
        icon: Server,
        value: 'servers',
        href: '/servers',
    },
    {
        label: 'Applications',
        icon: FileCode,
        value: 'applications',
        href: '/applications',
    },
    {
        label: 'Agents',
        icon: Bot,
        value: 'agents',
        href: '/agents',
    },
    {
        label: 'Alerts',
        icon: AlertTriangle,
        value: 'alerts',
        href: '/alerts',
    },
    {
        label: 'Settings',
        icon: Settings,
        value: 'settings',
        href: '/settings',
    },
    
]

export const Default: Story = {
    args: {
        defaultTab: 'overview',
        tabs: defaultTabs,
    },
}

export const StartingOnServers: Story = {
    args: {
        defaultTab: 'servers',
        tabs: defaultTabs,
    },
}

export const Minimal: Story = {
    args: {
        defaultTab: 'overview',
        tabs: defaultTabs.slice(0, 3),
    },
}