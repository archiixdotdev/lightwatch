'use client'
import { ServerType, ServerStatus, DetailedServer, LegacyServer, isDetailedServer, isLegacyServer } from "@/types/server";
import { ServerProgressBar } from "@/components/servers/server-progress-bar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Server, Terminal, RefreshCw, ArrowLeft, Cpu, HardDrive, Database, AlertTriangle, Clock } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Mock data - replace with actual API call
const getServer = (id: string): ServerType | undefined => {
    const servers: ServerType[] = [
        {
            id: 1,
            name: "Web Server 01",
            type: "Web Server",
            location: "US East",
            status: ServerStatus.ONLINE,
            cpu: {
                usage: 45,
                model: "Intel Xeon E5-2680 v4",
                cores: 14,
                threads: 28
            },
            memory: {
                total: "64 GB",
                used: "32 GB",
                usage: 60
            },
            disk: {
                total: "2 TB",
                used: "1.2 TB",
                usage: 35
            },
            network: {
                in: 25,
                out: 15
            },
            system: {
                os: "Ubuntu 22.04 LTS",
                kernel: "5.15.0-56-generic",
                ip: "192.168.1.101",
                uptime: "12d 4h 32m"
            },
            warnings: 0,
            errors: 0,
            last_checkin: Date.now(),
            alerts: [
                { id: 1, type: 'warning', message: 'High memory usage', time: '5 minutes ago' }
            ],
            processes: [
                { pid: 1234, name: 'nginx', cpu: 2.5, memory: 1.2, user: 'www-data', status: 'running' },
                { pid: 2345, name: 'node', cpu: 15.3, memory: 2.8, user: 'node', status: 'running' }
            ]
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
            network: 0,
            warnings: 2,
            errors: 0,
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
            network: 0,
            warnings: 0,
            errors: 3,
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
            network: 0,
            warnings: 0,
            errors: 0,
            last_checkin: 0
        }
    ];
    return servers.find(server => server.id === parseInt(id));
};

// Mock data for charts
const cpuData = [
    { time: '12:00', usage: 65 },
    { time: '12:10', usage: 68 },
    { time: '12:20', usage: 75 },
    { time: '12:30', usage: 80 },
    { time: '12:40', usage: 85 },
    { time: '12:50', usage: 88 },
    { time: '13:00', usage: 92 },
    { time: '13:10', usage: 95 },
];

const memoryData = [
    { time: '12:00', usage: 62 },
    { time: '12:10', usage: 64 },
    { time: '12:20', usage: 67 },
    { time: '12:30', usage: 70 },
    { time: '12:40', usage: 74 },
    { time: '12:50', usage: 78 },
    { time: '13:00', usage: 80 },
    { time: '13:10', usage: 82 },
];

const networkData = [
    { time: '12:00', in: 15, out: 10 },
    { time: '12:10', in: 20, out: 15 },
    { time: '12:20', in: 25, out: 20 },
    { time: '12:30', in: 30, out: 25 },
    { time: '12:40', in: 35, out: 30 },
    { time: '12:50', in: 40, out: 35 },
    { time: '13:00', in: 45, out: 40 },
    { time: '13:10', in: 50, out: 45 },
];

export default function ServerDetails() {
    const params = useParams();
    const router = useRouter();
    const server = getServer(params.id as string);

    if (!server) {
        return <div>Server not found</div>;
    }

    const getStatusClass = (status: ServerStatus) => {
        return status === ServerStatus.ERROR
            ? "border-red-500/30 bg-red-500/10"
            : status === ServerStatus.WARNING
                ? "border-yellow-500/30 bg-yellow-500/10"
                : "border-green-500/30 bg-green-500/10";
    };

    const getBadgeClass = (status: ServerStatus) => {
        return status === ServerStatus.ERROR
            ? "bg-red-500/20 text-red-500 border-red-500/30"
            : status === ServerStatus.WARNING
                ? "bg-yellow-500/20 text-yellow-500 border-yellow-500/30"
                : "bg-green-500/20 text-green-500 border-green-500/30";
    };

    const renderMetrics = () => {
        if (isDetailedServer(server)) {
            return (
                <>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Cpu className="h-4 w-4" />
                                CPU Usage
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Model</span>
                                    <span>{server.cpu.model}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Cores/Threads</span>
                                    <span>{server.cpu.cores}/{server.cpu.threads}</span>
                                </div>
                                <ServerProgressBar
                                    name="CPU"
                                    value={server.cpu.usage}
                                    max={100}
                                    threshold={90}
                                    color="blue"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <HardDrive className="h-4 w-4" />
                                Memory Usage
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Used/Total</span>
                                    <span>{server.memory.used}/{server.memory.total}</span>
                                </div>
                                <ServerProgressBar
                                    name="Memory"
                                    value={server.memory.usage}
                                    max={100}
                                    threshold={90}
                                    color="purple"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Database className="h-4 w-4" />
                                Disk Usage
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Used/Total</span>
                                    <span>{server.disk.used}/{server.disk.total}</span>
                                </div>
                                <ServerProgressBar
                                    name="Disk"
                                    value={server.disk.usage}
                                    max={100}
                                    threshold={90}
                                    color="green"
                                />
                            </div>
                        </CardContent>
                    </Card>
                </>
            );
        }

        return (
            <>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Cpu className="h-4 w-4" />
                            CPU Usage
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ServerProgressBar
                            name="CPU"
                            value={server.cpu}
                            max={100}
                            threshold={90}
                            color="blue"
                        />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <HardDrive className="h-4 w-4" />
                            Memory Usage
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ServerProgressBar
                            name="Memory"
                            value={server.memory}
                            max={100}
                            threshold={90}
                            color="purple"
                        />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Database className="h-4 w-4" />
                            Disk Usage
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ServerProgressBar
                            name="Disk"
                            value={server.disk}
                            max={100}
                            threshold={90}
                            color="green"
                        />
                    </CardContent>
                </Card>
            </>
        );
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => router.back()}>
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold">{server.name}</h1>
                        <p className="text-muted-foreground">{server.type}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Badge variant="outline" className={getBadgeClass(server.status)}>
                        {server.status === ServerStatus.ERROR ? "Error" :
                            server.status === ServerStatus.WARNING ? "Warning" : "Online"}
                    </Badge>
                    <Button variant="outline" size="icon">
                        <Terminal className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                        <RefreshCw className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {renderMetrics()}
            </div>

            {isDetailedServer(server) && (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>CPU History</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[300px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={cpuData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="time" />
                                            <YAxis domain={[0, 100]} />
                                            <Tooltip />
                                            <Area type="monotone" dataKey="usage" stroke="#3b82f6" fill="#93c5fd" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Memory History</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[300px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={memoryData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="time" />
                                            <YAxis domain={[0, 100]} />
                                            <Tooltip />
                                            <Area type="monotone" dataKey="usage" stroke="#8b5cf6" fill="#c4b5fd" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Network Traffic</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[300px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={networkData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="time" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Line type="monotone" dataKey="in" stroke="#3b82f6" name="Inbound (MB/s)" />
                                            <Line type="monotone" dataKey="out" stroke="#ef4444" name="Outbound (MB/s)" />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <AlertTriangle className="h-4 w-4" />
                                    Active Alerts
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {server.alerts.map((alert) => (
                                        <div key={alert.id} className="flex items-start gap-3">
                                            <AlertTriangle className={`h-5 w-5 mt-0.5 ${
                                                alert.type === 'critical' ? 'text-red-500' : 
                                                alert.type === 'warning' ? 'text-yellow-500' : 'text-blue-500'
                                            }`} />
                                            <div>
                                                <p className="text-sm font-medium">{alert.message}</p>
                                                <p className="text-sm text-muted-foreground">{alert.time}</p>
                                            </div>
                                        </div>
                                    ))}
                                    {server.alerts.length === 0 && (
                                        <p className="text-sm text-muted-foreground">No active alerts</p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Processes</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>PID</TableHead>
                                        <TableHead>Process</TableHead>
                                        <TableHead>User</TableHead>
                                        <TableHead>CPU %</TableHead>
                                        <TableHead>Memory %</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {server.processes.map((process) => (
                                        <TableRow key={process.pid}>
                                            <TableCell>{process.pid}</TableCell>
                                            <TableCell>{process.name}</TableCell>
                                            <TableCell>{process.user}</TableCell>
                                            <TableCell>{process.cpu.toFixed(1)}%</TableCell>
                                            <TableCell>{process.memory.toFixed(1)}%</TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className="bg-green-500/20 text-green-500 border-green-500/30">
                                                    {process.status}
                                                </Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </>
            )}
        </div>
    );
} 