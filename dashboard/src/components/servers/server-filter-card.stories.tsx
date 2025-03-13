import type { Meta, StoryObj } from '@storybook/react';
import { FilterOption, ServerFilterCard, ViewMode } from './server-filter-card';
import { useState } from 'react';
import { Database, Activity, AlertTriangle, Server } from 'lucide-react';

const meta: Meta<typeof ServerFilterCard> = {
  title: 'Servers/ServerFilterCard',
  component: ServerFilterCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof ServerFilterCard>;

const filterOptions: FilterOption[] = [
  {
      id: "cluster",
      label: "Cluster",
      icon: <Database className="h-4 w-4" />,
      options: [
          { id: "prod", label: "Production", description: "Production environment clusters" },
          { id: "staging", label: "Staging", description: "Staging environment clusters" },
          { id: "dev", label: "Development", description: "Development environment clusters" },
      ],
  },
  {
      id: "environment",
      label: "Environment",
      icon: <Server className="h-4 w-4" />,
      options: [
          { id: "aws", label: "AWS", description: "Amazon Web Services" },
          { id: "gcp", label: "GCP", description: "Google Cloud Platform" },
          { id: "azure", label: "Azure", description: "Microsoft Azure" },
      ],
  },
  {
      id: "utilization",
      label: "Server Utilization",
      icon: <Activity className="h-4 w-4" />,
      options: [
          { id: "high", label: "High (>80%)", description: "Servers with high utilization" },
          { id: "medium", label: "Medium (40-80%)", description: "Servers with medium utilization" },
          { id: "low", label: "Low (<40%)", description: "Servers with low utilization" },
      ],
  },
  {
      id: "alerts",
      label: "Alerts & Warnings",
      icon: <AlertTriangle className="h-4 w-4" />,
      options: [
          { id: "critical", label: "Critical", description: "Critical alerts" },
          { id: "warning", label: "Warning", description: "Warning alerts" },
          { id: "info", label: "Info", description: "Information alerts" },
      ],
  },
];

// Interactive story with state management
export const Interactive: Story = {
  render: () => {
    const [viewMode, setViewMode] = useState<ViewMode>('grid');
    const [searchValue, setSearchValue] = useState('');
    const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});

    const handleFilterChange = (filterId: string, options: string[]) => {
      setSelectedFilters(prev => ({
        ...prev,
        [filterId]: options
      }));
    };

    return (
      <ServerFilterCard
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onSearch={setSearchValue}
        onFilter={handleFilterChange}
        onRefresh={() => console.log('Refresh clicked')}
        selectedFilters={selectedFilters}
        filterOptions={filterOptions}
      />
    );
  },
};

// With active filters story
export const WithActiveFilters: Story = {
  render: () => {
    const [viewMode, setViewMode] = useState<ViewMode>('grid');
    const [searchValue, setSearchValue] = useState('');
    const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({
      cluster: ['prod', 'staging'],
      environment: ['aws'],
      utilization: ['high'],
      alerts: ['critical', 'warning']
    });

    const handleFilterChange = (filterId: string, options: string[]) => {
      setSelectedFilters(prev => ({
        ...prev,
        [filterId]: options
      }));
    };

    return (
      <ServerFilterCard
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onSearch={setSearchValue}
        onFilter={handleFilterChange}
        onRefresh={() => console.log('Refresh clicked')}
        selectedFilters={selectedFilters}
        filterOptions={filterOptions}
      />
    );
  },
};

// Grid view story
export const GridView: Story = {
  args: {
    viewMode: 'grid',
    onViewModeChange: () => {},
    onSearch: () => {},
    onFilter: () => {},
    onRefresh: () => {},
    selectedFilters: {},
  },
};

// List view story
export const ListView: Story = {
  args: {
    viewMode: 'list',
    onViewModeChange: () => {},
    onSearch: () => {},
    onFilter: () => {},
    onRefresh: () => {},
    selectedFilters: {},
  },
};

// Custom placeholder story
export const CustomPlaceholder: Story = {
  args: {
    searchPlaceholder: "Search by server name...",
    viewMode: 'grid',
    onViewModeChange: () => {},
    onSearch: () => {},
    onFilter: () => {},
    onRefresh: () => {},
    selectedFilters: {},
  },
}; 