export interface TimeSeriesDataPoint {
  time: string;
  cpu: number;
  ram: number;
  network: number;
  diskIO: number;
}

export interface SystemHealthDataPoint {
  name: string;
  value: number;
  color: string;
}

export interface Anomaly {
  metric: string;
  timestamp: string;
  value: number;
  threshold: number;
  severity: 'warning' | 'critical';
}

export interface Prediction {
  metric: 'cpu' | 'ram' | 'network' | 'diskIO';
  value: number;
  confidence: number;
  timestamp: string;
} 