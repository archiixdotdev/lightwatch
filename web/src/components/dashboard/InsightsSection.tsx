import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Anomaly } from "@/types/metrics";

interface Prediction {
  metric: 'cpu' | 'ram' | 'network' | 'diskIO';
  value: number;
  confidence: number;
  timestamp: string;
}

interface InsightsSectionProps {
  anomalies: Anomaly[];
  predictions: Prediction[];
}

export function InsightsSection({ anomalies, predictions }: InsightsSectionProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Recent Anomalies</CardTitle>
          <CardDescription>Detected unusual patterns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {anomalies.map((anomaly, index) => (
              <div key={index} className="flex items-center justify-between p-2 rounded-md bg-muted/50">
                <div className="flex items-center">
                  <span className={`px-2 py-1 text-xs rounded ${
                    anomaly.severity === 'critical' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {anomaly.severity.toUpperCase()}
                  </span>
                  <span className="ml-2 text-sm">
                    {anomaly.metric.toUpperCase()}: {anomaly.value.toFixed(1)}%
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">{anomaly.timestamp}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Predictive Insights</CardTitle>
          <CardDescription>30-minute forecasts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {predictions.map((prediction, index) => (
              <div key={index} className="flex items-center justify-between p-2 rounded-md bg-muted/50">
                <div className="flex items-center">
                  <span className="text-sm">
                    {prediction.metric.toUpperCase()}: {prediction.value.toFixed(1)}%
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-16 h-2 rounded-full bg-muted overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${prediction.confidence}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground ml-2">
                    {prediction.confidence.toFixed(0)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 