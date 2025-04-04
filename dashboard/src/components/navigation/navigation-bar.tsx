'use client'

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, FileCode, LineChart, Settings, Server, Bot } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

interface NavigationBarProps {
    defaultTab?: string;
    tabs?: {
        label: string;
        icon: React.ElementType;
        href: string;
        value: string;
    }[];
}

// default navigation bar for dashboard
const defaultTabs = [
    {
        label: "Overview",
        icon: LineChart,
        href: "/dashboard",
        value: "overview"
    },
    {
        label: "Servers",
        icon: Server,
        href: "/dashboard/servers",
        value: "servers"
    },
    {
        label: "Applications",
        icon: FileCode,
        href: "/dashboard/applications",
        value: "applications"
    },
    {
        label: "Agents",
        icon: Bot,
        href: "/dashboard/agents",
        value: "agents"
    },
    {
        label: "Alerts",
        icon: AlertTriangle,
        href: "/dashboard/alerts",
        value: "alerts"
    },
    {
        label: "Settings",
        icon: Settings,
        href: "/dashboard/settings",
        value: "settings"
    }
]

export function NavigationBar({ defaultTab = "overview", tabs = defaultTabs }: NavigationBarProps) {
    const router = useRouter();
    const pathname = usePathname();

    // Get active tab based on current URL
    const activeTab = tabs.find(tab => {
        if (pathname === '/dashboard' && tab.value === 'overview') return true;
        return pathname.startsWith(`/dashboard/${tab.value}`);
    })?.value || defaultTab;

    const handleTabChange = (value: string) => {
        const route = value === 'overview' ? '/dashboard' : `/dashboard/${value}`;
        router.push(route);
    };

    return (
        <Tabs value={activeTab} className="mb-6 px-4" onValueChange={handleTabChange}>
            <TabsList className="bg-sidebar">
                {tabs.map((tab) => (
                    <TabsTrigger
                        key={tab.value}
                        value={tab.value}
                        className="data-[state=active]:bg-sidebar-primary data-[state=active]:text-sidebar-primary-foreground text-sidebar-foreground hover:text-sidebar-accent-foreground px-4 md:px-3"
                    >
                        {/* Cast tab.icon as a React component */}
                        {React.createElement(tab.icon as React.ElementType, {
                            className: "h-4 w-4 md:mr-2 m-1"
                        })}
                        <span className="hidden md:inline">{tab.label}</span>
                    </TabsTrigger>
                ))}
                {/* <TabsTrigger value="overview" className="data-[state=active]:bg-blue-600">
                    <LineChart className="h-4 w-4 mr-2" />
                    Overview
                </TabsTrigger>
                <TabsTrigger value="servers" className="data-[state=active]:bg-blue-600">
                    <Server className="h-4 w-4 mr-2" />
                    Servers
                </TabsTrigger>
                <TabsTrigger value="applications" className="data-[state=active]:bg-blue-600">
                    <FileCode className="h-4 w-4 mr-2" />
                    Applications
                </TabsTrigger>
                <TabsTrigger value="alerts" className="data-[state=active]:bg-blue-600">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Alerts
                </TabsTrigger>
                <TabsTrigger value="settings" className="data-[state=active]:bg-blue-600">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                </TabsTrigger> */}
            </TabsList>
        </Tabs>
    );
}