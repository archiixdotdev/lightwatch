export enum AlertSeverity {
    INFO = "info",
    WARNING = "warning",
    ERROR = "error",
    CRITICAL = "critical"
}

export interface AlertType {
    id: number,
    severity: AlertSeverity,
    timestamp: number,
    title: string,
    service: string,
    description: string
}