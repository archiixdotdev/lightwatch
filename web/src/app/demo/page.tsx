'use client';

import { useState, useEffect, useCallback } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Database, Play, Pause, RefreshCw, Settings, AlertTriangle } from "lucide-react";
import { MetricCards } from "@/components/dashboard/MetricCards";
import { MetricCharts } from "@/components/dashboard/MetricCharts";
import { InsightsSection } from "@/components/dashboard/InsightsSection";
import { TimeSeriesDataPoint, SystemHealthDataPoint, Anomaly, Prediction } from "@/types/metrics";

// Initial time series data
const initialTimeSeriesData: TimeSeriesDataPoint[] = Array(24).fill(0).map((_, i) => ({
  time: `${String(i).padStart(2, '0')}:00`,
  cpu: 35 + Math.random() * 30,
  ram: 40 + Math.random() * 25,
  network: 20 + Math.random() * 60,
  diskIO: 25 + Math.random() * 50
}));

// Initial system health data
const initialSystemHealth: SystemHealthDataPoint[] = [
  { name: 'Healthy', value: 85, color: '#10B981' },
  { name: 'Warning', value: 10, color: '#F59E0B' },
  { name: 'Critical', value: 5, color: '#EF4444' }
];

export default function DemoPage() {
  const [selectedProject, setSelectedProject] = useState('All Projects');
  const [isSimulating, setIsSimulating] = useState(true);
  const [timeSeriesData, setTimeSeriesData] = useState<TimeSeriesDataPoint[]>(initialTimeSeriesData);
  const [systemHealth, setSystemHealth] = useState<SystemHealthDataPoint[]>(initialSystemHealth);
  const [timeRange, setTimeRange] = useState('24h');
  const [anomalies, setAnomalies] = useState<Anomaly[]>([]);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  // Simulate real-time data updates
  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      setTimeSeriesData(prev => {
        const newData = [...prev.slice(1)];
        const lastTime = prev[prev.length - 1].time;
        const [hours, minutes] = lastTime.split(':').map(Number);
        const nextTime = new Date(2025, 0, 1, hours, minutes);
        nextTime.setMinutes(nextTime.getMinutes() + 30);
        
        newData.push({
          time: `${String(nextTime.getHours()).padStart(2, '0')}:${String(nextTime.getMinutes()).padStart(2, '0')}`,
          cpu: Math.min(95, Math.max(5, prev[prev.length - 1].cpu + (Math.random() - 0.5) * 15)),
          ram: Math.min(95, Math.max(5, prev[prev.length - 1].ram + (Math.random() - 0.5) * 10)),
          network: Math.min(95, Math.max(5, prev[prev.length - 1].network + (Math.random() - 0.5) * 20)),
          diskIO: Math.min(95, Math.max(5, prev[prev.length - 1].diskIO + (Math.random() - 0.5) * 15))
        });
        return newData;
      });

      // Update system health occasionally
      if (Math.random() < 0.3) {
        setSystemHealth(prev => {
          const newHealth = [...prev];
          const idx = Math.floor(Math.random() * newHealth.length);
          const change = Math.random() < 0.5 ? -5 : 5;
          newHealth[idx] = {
            ...newHealth[idx],
            value: Math.min(100, Math.max(0, newHealth[idx].value + change))
          };
          return newHealth;
        });
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [isSimulating]);

  // Detect anomalies in the data
  useEffect(() => {
    const lastDataPoint = timeSeriesData[timeSeriesData.length - 1];
    const thresholds = {
      cpu: 80,
      ram: 85,
      network: 90,
      diskIO: 75
    };

    const newAnomalies: Anomaly[] = [];
    Object.entries(lastDataPoint).forEach(([metric, value]) => {
      if (metric === 'time') return;
      const threshold = thresholds[metric as keyof typeof thresholds];
      if (value > threshold) {
        const severity = value > threshold + 10 ? 'critical' : 'warning';
        newAnomalies.push({
          metric,
          timestamp: lastDataPoint.time,
          value,
          threshold,
          severity
        });
      }
    });

    if (newAnomalies.length > 0) {
      setAnomalies(prev => [...prev.slice(-5), ...newAnomalies]);
      const criticalAnomalies = newAnomalies.filter(a => a.severity === 'critical');
      if (criticalAnomalies.length > 0) {
        setNotificationMessage(`Critical: ${criticalAnomalies[0].metric} exceeded threshold`);
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
      }
    }
  }, [timeSeriesData]);

  // Generate predictive insights
  useEffect(() => {
    if (timeSeriesData.length < 2) return;
    
    const generatePrediction = (metric: keyof TimeSeriesDataPoint) => {
      if (metric === 'time') return null;
      const values = timeSeriesData.slice(-3).map(d => d[metric]);
      const trend = values[2] - values[0];
      const predictedValue = Math.min(100, Math.max(0, values[2] + trend));
      const confidence = Math.max(0, 100 - Math.abs(trend) * 5);
      
      return {
        metric: metric as 'cpu' | 'ram' | 'network' | 'diskIO',
        value: predictedValue,
        confidence,
        timestamp: '30m'
      };
    };

    const newPredictions = ['cpu', 'ram', 'network', 'diskIO']
      .map(metric => generatePrediction(metric as keyof TimeSeriesDataPoint))
      .filter((p): p is Prediction => p !== null);

    setPredictions(newPredictions);
  }, [timeSeriesData]);

  const handleRefresh = useCallback(() => {
    setTimeSeriesData(initialTimeSeriesData);
    setSystemHealth(initialSystemHealth);
  }, []);

  // Calculate trends based on recent data
  const calculateTrend = (metric: keyof TimeSeriesDataPoint) => {
    if (timeSeriesData.length < 2) return 'stable';
    const current = timeSeriesData[timeSeriesData.length - 1][metric];
    const previous = timeSeriesData[timeSeriesData.length - 2][metric];
    if (typeof current !== 'number' || typeof previous !== 'number') return 'stable';
    const diff = current - previous;
    return Math.abs(diff) < 1 ? 'stable' : diff > 0 ? 'up' : 'down';
  };

  // Format value with appropriate units
  const formatValue = (value: number, type: 'cpu' | 'ram' | 'network' | 'diskIO') => {
    switch (type) {
      case 'cpu':
      case 'ram':
        return `${value.toFixed(1)}%`;
      case 'network':
        return `${(value * 0.1).toFixed(1)} MB/s`;
      case 'diskIO':
        return `${(value * 1.5).toFixed(1)} MB/s`;
      default:
        return `${value.toFixed(1)}`;
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">System Monitor</h1>
          <p className="text-muted-foreground">
            Monitor your system metrics and configure alerts
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <Database className="h-5 w-5 text-blue-600 mr-2" />
            <select 
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className="pl-3 pr-10 py-2 text-sm border rounded-md focus:ring-2 focus:ring-blue-500"
            >
              <option>All Projects</option>
              <option>Project A</option>
              <option>Project B</option>
            </select>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setIsSimulating(!isSimulating)}
          >
            {isSimulating ? (
              <><Pause className="mr-2 h-4 w-4" /> Pause</>
            ) : (
              <><Play className="mr-2 h-4 w-4" /> Resume</>
            )}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Reset
          </Button>
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>

      {/* Notification Alert */}
      {showNotification && (
        <Alert 
          variant="destructive" 
          className="fixed bottom-4 right-4 w-[400px] animate-in fade-in slide-in-from-bottom-4 shadow-lg bg-destructive text-destructive-foreground"
        >
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Critical Alert</AlertTitle>
          <AlertDescription>
            {notificationMessage}
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="metrics" className="space-y-4">
        <TabsList>
          <TabsTrigger value="metrics">System Metrics</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="config">Configuration</TabsTrigger>
        </TabsList>

        <TabsContent value="metrics" className="space-y-4">
          {/* Time Range Selector */}
          <div className="flex justify-end space-x-2">
            {['1h', '6h', '24h', '7d'].map(range => (
              <Button
                key={range}
                variant={timeRange === range ? "default" : "outline"}
                size="sm"
                onClick={() => setTimeRange(range)}
              >
                {range}
              </Button>
            ))}
          </div>

          <MetricCards
            latestData={timeSeriesData[timeSeriesData.length - 1]}
            calculateTrend={calculateTrend}
            formatValue={formatValue}
          />

          <MetricCharts
            timeSeriesData={timeSeriesData}
            systemHealth={systemHealth}
            anomalies={anomalies}
            predictions={predictions}
          />

          <InsightsSection
            anomalies={anomalies}
            predictions={predictions}
          />
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Alert Configuration</CardTitle>
              <CardDescription>
                Set up alerts for various system metrics
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">CPU Threshold (%)</label>
                  <Input type="number" placeholder="80" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Memory Threshold (%)</label>
                  <Input type="number" placeholder="90" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Disk Usage (%)</label>
                  <Input type="number" placeholder="85" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Network Latency (ms)</label>
                  <Input type="number" placeholder="100" />
                </div>
              </div>
              <Button className="w-full">Save Alert Settings</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Alerts</CardTitle>
              <CardDescription>System alerts and notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[
                  { type: 'ERROR', message: 'Server CPU usage exceeded 80%', time: '2m ago', icon: AlertTriangle },
                  { type: 'WARNING', message: 'Memory usage approaching threshold', time: '5m ago', icon: AlertTriangle },
                  { type: 'SUCCESS', message: 'System performance restored', time: '10m ago', icon: RefreshCw },
                  { type: 'ERROR', message: 'High disk I/O detected', time: '15m ago', icon: AlertTriangle }
                ].map((alert, index) => (
                  <Alert
                    key={index}
                    variant={alert.type === 'ERROR' ? 'destructive' : 'default'}
                    className="bg-background border"
                  >
                    <alert.icon className="h-4 w-4" />
                    <AlertTitle className="flex items-center justify-between">
                      <span>{alert.message}</span>
                      <span className="text-xs text-muted-foreground">{alert.time}</span>
                    </AlertTitle>
                    <AlertDescription>
                      {alert.type === 'ERROR' && 'Action required: Check system resources'}
                      {alert.type === 'WARNING' && 'Monitor the situation closely'}
                      {alert.type === 'SUCCESS' && 'No action needed'}
                    </AlertDescription>
                  </Alert>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="config" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Monitoring Settings</CardTitle>
              <CardDescription>
                Configure system monitoring parameters
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Monitoring Interval (seconds)</label>
                  <Input type="number" placeholder="60" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Data Retention (days)</label>
                  <Input type="number" placeholder="30" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Log Level</label>
                <select className="w-full rounded-md border p-2">
                  <option>Info</option>
                  <option>Debug</option>
                  <option>Warning</option>
                  <option>Error</option>
                </select>
              </div>
              <Button className="w-full">Save Configuration</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
              <CardDescription>
                Additional configuration options
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="enableMetrics" className="rounded border-gray-300" />
                  <label htmlFor="enableMetrics" className="text-sm font-medium">
                    Enable detailed metrics collection
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="enableAlerts" className="rounded border-gray-300" />
                  <label htmlFor="enableAlerts" className="text-sm font-medium">
                    Enable email notifications
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="enableAggregation" className="rounded border-gray-300" />
                  <label htmlFor="enableAggregation" className="text-sm font-medium">
                    Enable metric aggregation
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
