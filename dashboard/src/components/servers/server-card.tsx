import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Server } from "lucide-react";
import { ServerProgressBar } from "@/components/servers/server-progress-bar";
import { ServerType, ServerStatus, isDetailedServer, isLegacyServer } from "@/types/server";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ServerCardProps {
  server: ServerType;
  onViewDetails: (id: number) => void;
  onViewConsole: (id: number) => void;
  onRestart: (id: number) => void;
}

export function ServerCard({ server, onViewDetails, onViewConsole, onRestart }: ServerCardProps) {
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

  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent navigation if clicking on buttons
    if ((e.target as HTMLElement).closest('button')) return;
    onViewDetails(server.id);
  };

  const getMetricValue = (metric: number | { usage: number }) => {
    return typeof metric === 'number' ? metric : metric.usage;
  };

  return (
    <Card 
      className={cn(
        getStatusClass(server.status),
        "cursor-pointer transition-colors hover:bg-accent/50"
      )}
      onClick={handleCardClick}
    >
      <CardHeader>
        <CardTitle>
          <div className="flex items-center gap-2">
            <Server className="h-5 w-5" />
            <span className="font-medium">{server.name}</span>
            <Badge variant="outline" className={getBadgeClass(server.status)}>
              {server.status === ServerStatus.ERROR ? "Error" :
                server.status === ServerStatus.WARNING ? "Warning" : "Online"}
            </Badge>
          </div>
        </CardTitle>
        <CardDescription>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              {/* Server details */}
              <div className="grid grid-cols-3 gap-4 mb-3">
                <div>
                  <p className="text-xs text-gray-400">IP Address</p>
                  <p className="text-sm">
                    {isDetailedServer(server) ? server.system.ip : `192.168.1.${10 + server.id}`}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Type</p>
                  <p className="text-sm">{server.type || "Unknown"}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Location</p>
                  <p className="text-sm">{server.location || "Unknown"}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-3 md:mt-0">
              {/* <Button size="sm" variant="outline" className="h-8 px-3"
                onClick={() => onViewDetails(server.id)}>
                Details
              </Button> */}
              <Button size="sm" variant="outline" className="h-8 px-3"
                onClick={() => onViewConsole(server.id)}>
                Console
              </Button>
              <Button size="sm" variant="outline" className="h-8 px-3"
                onClick={() => onRestart(server.id)}>
                Restart
              </Button>
            </div>
          </div>
        </CardDescription>
      </CardHeader>


      <CardContent>
        {/* Server metrics */}
        <div className="space-y-2">
          <ServerProgressBar
            name="CPU"
            value={getMetricValue(server.cpu)}
            max={100}
            threshold={90}
            color="blue"
          />
          <ServerProgressBar
            name="Memory"
            value={getMetricValue(server.memory)}
            max={100}
            threshold={90}
            color="blue"
          />
          <ServerProgressBar
            name="Disk"
            value={getMetricValue(server.disk)}
            max={100}
            threshold={90}
            color="blue"
          />
        </div>
      </CardContent>
    </Card>
  );
}
