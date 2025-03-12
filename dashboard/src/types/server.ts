
export enum ServerStatus {
    ONLINE = "online",
    OFFLINE = "offline",
    WARNING = "warning",
    ERROR = "error"
}

export interface ServerType {
    id: number;
    name: string;
    cpu: number;
    memory: number,
    disk: number,
    network: number,
    status: ServerStatus,
    errors?: number,
    type?: string,
    location?: string,
    ip?: string,
    os?: string,
    version?: string,
    last_checkin: number,
}