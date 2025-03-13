'use client'
import { ServerCard } from "@/components/servers/server-card";
import { FilterOption, ServerFilterCard, ViewMode } from "@/components/servers/server-filter-card";
import { ServerStatus, ServerType } from "@/types/server";
import { Database, Activity, AlertTriangle, Server } from "lucide-react";
import { useState } from "react";

const servers: ServerType[] = [
    {
        id: 1,
        name: "Web Server 01",
        type: "Web Server",
        location: "US East",
        status: ServerStatus.ONLINE,
        cpu: 45,
        memory: 60,
        disk: 35,
        warnings: 0,
        errors: 0,
        network: 0,
        last_checkin: 0
    },
    {
        id: 2,
        name: "DB Server 01",
        type: "Database",
        location: "US West",
        status: ServerStatus.WARNING,
        cpu: 85,
        memory: 75,
        disk: 65,
        warnings: 2,
        errors: 0,
        network: 0,
        last_checkin: 0
    },
    {
        id: 3,
        name: "Cache Server 01",
        type: "Cache",
        location: "EU Central",
        status: ServerStatus.ERROR,
        cpu: 95,
        memory: 90,
        disk: 88,
        warnings: 0,
        errors: 3,
        network: 0,
        last_checkin: 0
    },
    {
        id: 4,
        name: "API Server 01",
        type: "API",
        location: "Asia Pacific",
        status: ServerStatus.ONLINE,
        cpu: 55,
        memory: 45,
        disk: 30,
        warnings: 0,
        errors: 0,
        network: 0,
        last_checkin: 0
    }
];

// const filterOptions: FilterOption[] = [
//     {
//         id: "cluster",
//         label: "Cluster",
//         icon: <Database className="h-4 w-4" />,
//         options: [
//             { id: "prod", label: "Production", description: "Production environment clusters" },
//             { id: "staging", label: "Staging", description: "Staging environment clusters" },
//             { id: "dev", label: "Development", description: "Development environment clusters" },
//         ],
//     },
//     {
//         id: "environment",
//         label: "Environment",
//         icon: <Server className="h-4 w-4" />,
//         options: [
//             { id: "aws", label: "AWS", description: "Amazon Web Services" },
//             { id: "gcp", label: "GCP", description: "Google Cloud Platform" },
//             { id: "azure", label: "Azure", description: "Microsoft Azure" },
//         ],
//     },
//     {
//         id: "utilization",
//         label: "Server Utilization",
//         icon: <Activity className="h-4 w-4" />,
//         options: [
//             { id: "high", label: "High (>80%)", description: "Servers with high utilization" },
//             { id: "medium", label: "Medium (40-80%)", description: "Servers with medium utilization" },
//             { id: "low", label: "Low (<40%)", description: "Servers with low utilization" },
//         ],
//     },
//     {
//         id: "alerts",
//         label: "Alerts & Warnings",
//         icon: <AlertTriangle className="h-4 w-4" />,
//         options: [
//             { id: "critical", label: "Critical", description: "Critical alerts" },
//             { id: "warning", label: "Warning", description: "Warning alerts" },
//             { id: "info", label: "Info", description: "Information alerts" },
//         ],
//     },
// ];

// dynamically generate the filter options based on the servers
const filterOptions: FilterOption[] = [
    {
        id: "cluster",
        label: "Cluster",
        icon: <Database className="h-4 w-4" />,
        options: servers.map((server) => ({
            id: server.location!,
            label: server.location!,
            description: server.location!,
        })),
    },
    {
        id: "environment",
        label: "Environment",
        icon: <Server className="h-4 w-4" />,
        options: servers.map((server) => ({
            id: server.type!,
            label: server.type!,
            description: server.type!,
        })),
    },
    {
        id: "status",
        label: "Status",
        icon: <Server className="h-4 w-4" />,
        options: servers.map((server) => ({
            id: server.status!,
            label: server.status!,
            description: server.status!,
        })),
    },
    

];
export default function Servers() {
    const [viewMode, setViewMode] = useState<ViewMode>("grid");
    const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});

    const handleFilterChange = (filterId: string, options: string[]) => {
        setSelectedFilters(prev => ({
            ...prev,
            [filterId]: options
        }));
    };

    return (
        <div>
            <ServerFilterCard 
                viewMode={viewMode} 
                onViewModeChange={setViewMode} 
                filterOptions={filterOptions} 
                selectedFilters={selectedFilters} 
                onFilter={handleFilterChange}
            />
            {viewMode === "grid" ? (
                <div className="grid grid-cols-1 gap-4">
                    {/* show the servers based on the filters */}
                    {servers.filter((server) => {
                        // Only filter if there are selected filters for that category
                        return Object.entries(selectedFilters).every(([filterId, values]) => {
                            // If no filters selected for this category, return true
                            if (!values.length) return true;
                            // Check if server value is included in selected filter values
                            return values.includes(server[filterId as keyof ServerType] as string);
                        });
                    }).map((server) => (
                        <ServerCard key={server.id} server={server} onViewDetails={() => {}} onViewConsole={() => {}} onRestart={() => {}} />
                    ))}
                </div>
            ) : (
                // <ServerList />
                <p>uhhh.. list view?</p>
            )}
        </div>
    )
}