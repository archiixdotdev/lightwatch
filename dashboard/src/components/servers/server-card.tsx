import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Server } from "lucide-react";
import { ServerProgressBar } from "@/components/servers/server-progress-bar";
import { ServerType } from "@/types/server";

interface ServerCardProps {
  server: ServerType;
  onViewDetails: (id: number) => void;
  onViewConsole: (id: number) => void;
  onRestart: (id: number) => void;
}

export function ServerCard({ server, onViewDetails, onViewConsole, onRestart }: ServerCardProps) {
  const getStatusClass = (status: string) => {
    return status === "error"
      ? "border-red-500/30 bg-red-500/10"
      : status === "warning"
        ? "border-yellow-500/30 bg-yellow-500/10"
        : "border-green-500/30 bg-green-500/10";
  };

  const getBadgeClass = (status: string) => {
    return status === "error"
      ? "bg-red-500/20 text-red-500 border-red-500/30"
      : status === "warning"
        ? "bg-yellow-500/20 text-yellow-500 border-yellow-500/30"
        : "bg-green-500/20 text-green-500 border-green-500/30";
  };

  return (
    <div className={`p-4 rounded-lg border ${getStatusClass(server.status)}`}>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Server className="h-5 w-5" />
            <span className="font-medium">{server.name}</span>
            <Badge variant="outline" className={getBadgeClass(server.status)}>
              {server.status === "error" ? "Error" : 
              server.status === "warning" ? "Warning" : "Online"}
            </Badge>
          </div>
          {/* Server details */}
          <div className="grid grid-cols-3 gap-4 mb-3">
            <div>
              <p className="text-xs text-gray-400">IP Address</p>
              <p className="text-sm">192.168.1.{10 + server.id}</p>
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
          <Button size="sm" variant="outline" className="h-8 px-3 border-[#2a2f3e]" 
            onClick={() => onViewDetails(server.id)}>
            Details
          </Button>
          <Button size="sm" variant="outline" className="h-8 px-3 border-[#2a2f3e]"
            onClick={() => onViewConsole(server.id)}>
            Console
          </Button>
          <Button size="sm" variant="outline" className="h-8 px-3 border-[#2a2f3e]"
            onClick={() => onRestart(server.id)}>
            Restart
          </Button>
        </div>
      </div>
      
      {/* Server metrics */}
      <div className="mt-3 space-y-2">
        <ServerProgressBar 
          name="CPU" 
          value={server.cpu} 
          max={100}
          threshold={90}
          color="blue"
        />
        <ServerProgressBar 
          name="Memory" 
          value={server.memory} 
          max={100}
          threshold={90}
          color="blue"
        />
        <ServerProgressBar 
          name="Disk" 
          value={server.disk} 
          max={100}
          threshold={90}
          color="blue"
        />
      </div>
    </div>
  );
}
