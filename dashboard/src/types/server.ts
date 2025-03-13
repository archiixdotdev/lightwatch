export enum ServerStatus {
    ONLINE = "online",
    WARNING = "warning",
    ERROR = "error"
}

export interface CpuMetrics {
    usage: number;
    model: string;
    cores: number;
    threads: number;
}

export interface MemoryMetrics {
    total: string;
    used: string;
    usage: number;
}

export interface DiskMetrics {
    total: string;
    used: string;
    usage: number;
}

export interface NetworkMetrics {
    in: number;
    out: number;
}

export interface Alert {
    id: number;
    type: 'critical' | 'warning' | 'info';
    message: string;
    time: string;
}

export interface Process {
    pid: number;
    name: string;
    cpu: number;
    memory: number;
    user: string;
    status: string;
}

export interface SystemInfo {
    os: string;
    kernel: string;
    ip: string;
    uptime: string;
}

// Base server type with minimal required fields
export interface BaseServer {
    id: number;
    name: string;
    type: string;
    location: string;
    status: ServerStatus;
    warnings: number;
    errors: number;
    last_checkin: number;
}

// Extended server type with all metrics
export interface DetailedServer extends BaseServer {
    cpu: CpuMetrics;
    memory: MemoryMetrics;
    disk: DiskMetrics;
    network: NetworkMetrics;
    system: SystemInfo;
    alerts: Alert[];
    processes: Process[];
}

// Legacy server type for backward compatibility
export interface LegacyServer extends BaseServer {
    cpu: number;
    memory: number;
    disk: number;
    network: number;
}

// Type guard to check if a server is detailed
export function isDetailedServer(server: BaseServer | DetailedServer | LegacyServer): server is DetailedServer {
    return 'system' in server && 'alerts' in server && 'processes' in server;
}

// Type guard to check if a server is legacy
export function isLegacyServer(server: BaseServer | DetailedServer | LegacyServer): server is LegacyServer {
    return 'cpu' in server && 
           'memory' in server && 
           'disk' in server && 
           'network' in server && 
           typeof server.cpu === 'number' && 
           typeof server.memory === 'number' &&
           typeof server.disk === 'number' &&
           typeof server.network === 'number';
}

// For backward compatibility
export type ServerType = DetailedServer | LegacyServer;