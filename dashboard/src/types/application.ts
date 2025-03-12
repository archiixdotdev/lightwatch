export enum ApplicationStatus {
    HEALTHY = "healthy",
    WARNING = "warning",
    CRITICAL = "critical"
}

export interface ApplicationType {
    name: string;
    responseTime: number;
    errorRate: number;
    throughput: number;
    status: ApplicationStatus;
    last_checkin: number;
}
