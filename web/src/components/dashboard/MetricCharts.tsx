import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TimeSeriesDataPoint, SystemHealthDataPoint, Anomaly } from "@/types/metrics";

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background/95 border rounded-lg p-2 shadow-lg">
        <p className="text-sm font-medium">{label}</p>
        {payload.map((pld: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: pld.color }}>
            {pld.name}: {pld.value.toFixed(2)}%
          </p>
        ))}
      </div>
    );
  }
  return null;
};

interface MetricChartsProps {
  timeSeriesData: TimeSeriesDataPoint[];
  systemHealth: SystemHealthDataPoint[];
  anomalies: Anomaly[];
  predictions: {
    metric: 'cpu' | 'ram' | 'network' | 'diskIO';
    value: number;
    confidence: number;
  }[];
}

export function MetricCharts({ timeSeriesData, systemHealth, anomalies, predictions }: MetricChartsProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>CPU Utilization</CardTitle>
          <CardDescription className="flex items-center justify-between">
            <span>Average CPU usage over time</span>
            {predictions.find(p => p.metric === 'cpu') && (
              <span className="text-sm text-muted-foreground">
                Predicted: {predictions.find(p => p.metric === 'cpu')?.value.toFixed(1)}%
                <span className="ml-2 text-xs">
                  ({predictions.find(p => p.metric === 'cpu')?.confidence.toFixed(0)}% confidence)
                </span>
              </span>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={timeSeriesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
              <XAxis 
                dataKey="time" 
                stroke="#6B7280" 
                fontSize={12}
                tickLine={false}
              />
              <YAxis 
                stroke="#6B7280" 
                fontSize={12}
                tickLine={false}
                domain={[0, 100]}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="cpu" 
                stroke="#3B82F6" 
                strokeWidth={2}
                dot={false}
                animationDuration={300}
              />
              {anomalies
                .filter(a => a.metric === 'cpu')
                .map((anomaly, index) => (
                  <Line
                    key={index}
                    type="monotone"
                    data={[{ time: anomaly.timestamp, cpu: anomaly.value }]}
                    stroke={anomaly.severity === 'critical' ? '#EF4444' : '#F59E0B'}
                    strokeWidth={0}
                    dot={{
                      r: 4,
                      fill: anomaly.severity === 'critical' ? '#EF4444' : '#F59E0B',
                      stroke: 'white',
                      strokeWidth: 2
                    }}
                  />
                ))}
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Memory Usage</CardTitle>
          <CardDescription>RAM utilization over time</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={timeSeriesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
              <XAxis 
                dataKey="time" 
                stroke="#6B7280" 
                fontSize={12}
                tickLine={false}
              />
              <YAxis 
                stroke="#6B7280" 
                fontSize={12}
                tickLine={false}
                domain={[0, 100]}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="ram" 
                stroke="#10B981" 
                strokeWidth={2}
                dot={false}
                animationDuration={300}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Network Traffic</CardTitle>
          <CardDescription>Network I/O operations per second</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={timeSeriesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
              <XAxis 
                dataKey="time" 
                stroke="#6B7280" 
                fontSize={12}
                tickLine={false}
              />
              <YAxis 
                stroke="#6B7280" 
                fontSize={12}
                tickLine={false}
                domain={[0, 100]}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="network" 
                stroke="#6366F1" 
                strokeWidth={2}
                dot={false}
                animationDuration={300}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>System Health</CardTitle>
          <CardDescription>Overall system health status</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={systemHealth}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {systemHealth.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
        <CardFooter>
          <div className="flex justify-center mt-4 space-x-4">
            {systemHealth.map((entry, index) => (
              <div key={index} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-1" 
                  style={{ backgroundColor: entry.color }} 
                />
                <span className="text-sm text-gray-600">
                  {entry.name} ({entry.value}%)
                </span>
              </div>
            ))}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
} 