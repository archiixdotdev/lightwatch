'use client'
import { MetricCard } from "@/components/dashboard/metric-card";
import { AlertTriangle, Shield, Bot } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ServerCard } from "@/components/servers/server-card";
import { ServerStatus, ServerType } from "@/types/server";
import { useRouter } from "next/navigation";
import { AreaChart, lightColorScheme, darkColorScheme, formatBytes } from "@/components/charts/area-chart";
import { useTheme } from "next-themes";

// Sample data - you would typically fetch this from an API
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

interface SystemLog {
    id: number;
    type: 'error' | 'warning' | 'success';
    message: string;
    source: string;
    time: string;
}

const systemLogs: SystemLog[] = [
    {
        id: 1,
        type: 'error',
        message: 'Database connection failed',
        source: 'Database Server',
        time: '2 min ago'
    },
    {
        id: 2,
        type: 'warning',
        message: 'High memory usage detected',
        source: 'Web Server 01',
        time: '15 min ago'
    },
    {
        id: 3,
        type: 'success',
        message: 'System backup completed',
        source: 'All servers',
        time: '45 min ago'
    },
    {
        id: 4,
        type: 'warning',
        message: 'SSL certificate expiring soon',
        source: 'Web Server 01',
        time: '1 hour ago'
    }
];

const data = [
    {
        cpu: 36,
        disk: 54,
        memory: 60,
        network: 54,
        time: '0:00'
    },
    {
        cpu: 54,
        disk: 54,
        memory: 40,
        network: 40,
        time: '1:00'
    },
    {
        cpu: 38,
        disk: 69,
        memory: 63,
        network: 69,
        time: '2:00'
    },
    {
        cpu: 62,
        disk: 55,
        memory: 52,
        network: 55,
        time: '3:00'
    },
    {
        cpu: 45,
        disk: 60,
        memory: 55,
        network: 60,
        time: '4:00'
    },
    {
        cpu: 44,
        disk: 57,
        memory: 69,
        network: 57,
        time: '5:00'
    },
    {
        cpu: 44,
        disk: 65,
        memory: 63,
        network: 65,
        time: '6:00'
    },
    {
        cpu: 35,
        disk: 65,
        memory: 66,
        network: 65,
        time: '7:00'
    },
    {
        cpu: 59,
        disk: 59,
        memory: 44,
        network: 59,
        time: '8:00'
    },
    {
        cpu: 52,
        disk: 63,
        memory: 43,
        network: 63,
        time: '9:00'
    },
    {
        cpu: 59,
        disk: 51,
        memory: 49,
        network: 51,
        time: '10:00'
    },
    {
        cpu: 44,
        disk: 50,
        memory: 51,
        network: 50,
        time: '11:00'
    },
    {
        cpu: 39,
        disk: 61,
        memory: 41,
        network: 61,
        time: '12:00'
    },
    {
        cpu: 63,
        disk: 65,
        memory: 45,
        network: 65,
        time: '13:00'
    },
    {
        cpu: 32,
        disk: 53,
        memory: 52,
        network: 53,
        time: '14:00'
    },
    {
        cpu: 47,
        disk: 64,
        memory: 59,
        network: 64,
        time: '15:00'
    },
    {
        cpu: 67,
        disk: 65,
        memory: 67,
        network: 65,
        time: '16:00'
    },
    {
        cpu: 53,
        disk: 53,
        memory: 55,
        network: 53,
        time: '17:00'
    },
    {
        cpu: 36,
        disk: 57,
        memory: 65,
        network: 57,
        time: '18:00'
    },
    {
        cpu: 62,
        disk: 65,
        memory: 47,
        network: 65,
        time: '19:00'
    },
    {
        cpu: 66,
        disk: 53,
        memory: 65,
        network: 53,
        time: '20:00'
    },
    {
        cpu: 48,
        disk: 55,
        memory: 66,
        network: 55,
        time: '21:00'
    },
    {
        cpu: 42,
        disk: 51,
        memory: 63,
        network: 51,
        time: '22:00'
    },
    {
        cpu: 67,
        disk: 51,
        memory: 66,
        network: 51,
        time: '23:00'
    }
]

export default function DashboardPage() {

    const { theme, setTheme } = useTheme();
    const router = useRouter();

    const handleViewDetails = (id: number) => {
        router.push(`/dashboard/servers/${id}`);
    };

    const handleViewConsole = (id: number) => {
        router.push(`/dashboard/servers/${id}/console`);
    };

    const handleRestart = (id: number) => {
        console.log(`Restarting server ${id}`);
    };

    return (
        <div className="space-y-6">
            {/* Metrics Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <MetricCard
                    title="Alerts"
                    value="10"
                    icon={AlertTriangle}
                    changeDirection="up"
                    changeLabel="10% up from last hour"
                    iconColor="text-red-500"
                    changeColor="text-red-500"
                />
                <MetricCard
                    title="Health Score"
                    value="829"
                    icon={Shield}
                    changeDirection="up"
                    changeLabel="10% up from last hour"
                    iconColor="text-green-500"
                    changeColor="text-green-500"
                />
                <MetricCard
                    title="Agents"
                    value="30"
                    icon={Bot}
                    changeDirection="neutral"
                    changeLabel="0% up from last hour"
                    iconColor="text-green-500"
                    changeColor="text-green-500"
                />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Infrastructure Overview - Takes up 2 columns */}
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Infrastructure Overview</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {servers.map((server) => (
                                    <ServerCard
                                        key={server.id}
                                        server={server}
                                        onViewDetails={handleViewDetails}
                                        onViewConsole={handleViewConsole}
                                        onRestart={handleRestart}
                                    />
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Side Cards - Takes up 1 column */}
                <div className="space-y-4">
                    {/* Server Status Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm font-medium">Server Status</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-center">
                                <div className="relative h-32 w-32">
                                    <svg className="h-full w-full" viewBox="0 0 100 100">
                                        <circle
                                            className="text-gray-700"
                                            strokeWidth="8"
                                            stroke="currentColor"
                                            fill="transparent"
                                            r="40"
                                            cx="50"
                                            cy="50"
                                        />
                                        <circle
                                            className="text-green-500"
                                            strokeWidth="8"
                                            strokeLinecap="round"
                                            stroke="currentColor"
                                            fill="transparent"
                                            r="40"
                                            cx="50"
                                            cy="50"
                                            strokeDasharray={2 * Math.PI * 40}
                                            strokeDashoffset={2 * Math.PI * 40 * (1 - 0.75)}
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className="text-2xl font-bold">75%</span>
                                        <span className="text-xs text-gray-400">Uptime</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 grid grid-cols-2 gap-2 text-center">
                                <div className="bg-secondary rounded-md p-2">
                                    <p className="text-xs text-gray-400">Total Servers</p>
                                    <p className="text-lg font-bold">12</p>
                                </div>
                                <div className="bg-secondary rounded-md p-2">
                                    <p className="text-xs text-gray-400">Active Servers</p>
                                    <p className="text-lg font-bold">9</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* System Logs/Alerts Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm font-medium">System Logs/Alerts</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                {systemLogs.length > 0 ? (
                                    systemLogs.map((log, index) => (
                                        <div className="flex items-start gap-2 pb-2 border-b border-gray-800" key={index}>
                                            <div className="h-2 w-2 rounded-full bg-red-500 mt-1.5" />
                                            <div>
                                                <p className="text-xs font-medium">{log.message}</p>
                                                <p className="text-xs text-gray-400">{log.source} - {log.time}</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="flex items-start gap-2 pb-2 border-b border-gray-800">
                                        <div className="h-2 w-2 mt-1.5" />
                                        <div>
                                            <p className="text-xs font-medium">No logs or alerts</p>
                                        </div>
                                    </div>
                                )}


                            </div>
                        </CardContent>
                    </Card>


                </div>
            </div>
            {/* 3 graphs for aggregated data (cpu, memory, network) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* CPU Usage */}
                <Card>
                    <CardHeader>
                        <CardTitle>Aggregated CPU Usage</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <AreaChart
                            colorScheme={theme === 'dark' ? darkColorScheme : lightColorScheme}
                            data={data}
                            height={300}
                            showLegend={false}
                            series={[
                                {
                                    color: '#3b82f6',
                                    dataKey: 'cpu',
                                    gradientId: 'cpuGradient',
                                    gradientStops: [
                                        {
                                            color: '#3b82f6',
                                            offset: '0%',
                                            opacity: 0.4
                                        },
                                        {
                                            color: '#3b82f6',
                                            offset: '100%',
                                            opacity: 0.1
                                        }
                                    ],
                                    name: 'CPU Usage',
                                    unit: '%'
                                }
                            ]}
                            xAxisKey="time"
                            yAxisDomain={[0, 100]}
                        />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Aggregated Memory Usage</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <AreaChart
                            colorScheme={theme === 'dark' ? darkColorScheme : lightColorScheme}
                            data={data}
                            height={300}
                            showLegend={false}
                            series={[
                                {
                                    color: '#8b5cf6',
                                    dataKey: 'memory',
                                    gradientId: 'memoryGradient',
                                    gradientStops: [
                                        {
                                            color: '#8b5cf6',
                                            offset: '0%',
                                            opacity: 0.4
                                        },
                                        {
                                            color: '#8b5cf6',
                                            offset: '100%',
                                            opacity: 0.1
                                        }
                                    ],
                                    name: 'Memory Usage',
                                    unit: 'GB'
                                }
                            ]}
                            xAxisKey="time"
                            yAxisDomain={[0, 100]}
                        />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Aggregated Network Usage</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <AreaChart
                            colorScheme={theme === 'dark' ? darkColorScheme : lightColorScheme}
                            data={data}
                            height={300}
                            showLegend={false}
                            series={[
                                {
                                    color: 'green',
                                    dataKey: 'network',
                                    gradientId: 'networkGradient',
                                    gradientStops: [
                                        {
                                            color: 'green',
                                            offset: '0%',
                                            opacity: 0.4
                                        },
                                        {
                                            color: 'green',
                                            offset: '100%',
                                            opacity: 0.1
                                        }
                                    ],
                                    name: 'Network Usage',
                                    formatter: (value: number) => formatBytes(value * 1024 * 1024) // Convert percentage to MB for Mock Data
                                }
                            ]}
                            xAxisKey="time"
                            yAxisDomain={[0, 100]}
                        />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
