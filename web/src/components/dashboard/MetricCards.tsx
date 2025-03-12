import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cpu, HardDrive, Network, Activity } from "lucide-react";
import { TimeSeriesDataPoint } from "@/types/metrics";

interface MetricCardProps { 
  title: string; 
  value: string;
  /* eslint-disable @typescript-eslint/no-explicit-any */ // Lucide icons are not typed
  icon: any;
  trend: 'up' | 'down' | 'stable';
  detail?: string;
}

function MetricCard({ title, value, icon: Icon, trend, detail }: MetricCardProps) {
  const trendColor = {
    up: 'text-red-500',
    down: 'text-green-500',
    stable: 'text-yellow-500'
  }[trend];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className={`text-xs ${trendColor} mt-1`}>
          {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'} Compared to last hour
        </p>
        {detail && (
          <p className="text-xs text-muted-foreground mt-1">{detail}</p>
        )}
      </CardContent>
    </Card>
  );
}

interface MetricCardsProps {
  latestData: TimeSeriesDataPoint;
  calculateTrend: (metric: keyof TimeSeriesDataPoint) => 'up' | 'down' | 'stable';
  formatValue: (value: number, type: 'cpu' | 'ram' | 'network' | 'diskIO') => string;
}

export function MetricCards({ latestData, calculateTrend, formatValue }: MetricCardsProps) {
  const getMetricValue = (metric: keyof TimeSeriesDataPoint) => {
    const value = latestData[metric];
    return typeof value === 'number' ? value : 0;
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <MetricCard
        title="CPU Usage"
        value={formatValue(getMetricValue('cpu'), 'cpu')}
        icon={Cpu}
        trend={calculateTrend('cpu')}
        detail={`${(getMetricValue('cpu') * 0.16).toFixed(1)}/16 cores active`}
      />
      <MetricCard
        title="Memory Usage"
        value={formatValue(getMetricValue('ram'), 'ram')}
        icon={HardDrive}
        trend={calculateTrend('ram')}
        detail={`${(12.4 * (1 - getMetricValue('ram')/100)).toFixed(1)} GB available`}
      />
      <MetricCard
        title="Disk I/O"
        value={formatValue(getMetricValue('diskIO'), 'diskIO')}
        icon={Activity}
        trend={calculateTrend('diskIO')}
        detail={`Write: ${(getMetricValue('diskIO') * 0.8).toFixed(1)} MB/s`}
      />
      <MetricCard
        title="Network"
        value={formatValue(getMetricValue('network'), 'network')}
        icon={Network}
        trend={calculateTrend('network')}
        detail={`Latency: ${Math.round(45 + getMetricValue('network') * 0.2)}ms`}
      />
    </div>
  );
} 