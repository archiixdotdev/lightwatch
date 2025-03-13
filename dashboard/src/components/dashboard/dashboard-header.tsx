import { Shield, Bell, Circle, ChevronDown, Wifi, WifiOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface DashboardHeaderProps {
    notificationCount?: number;
    connectionStatus?: 'connected' | 'connecting' | 'disconnected';
}

export function DashboardHeader({
    notificationCount = 15,
    connectionStatus = 'connected'
}: DashboardHeaderProps) {
    return (
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 px-4 py-3">
            {/* Logo and Title Section */}
            <div className="flex items-center">
                <Shield className="h-8 w-8 text-primary mr-3" />
                <div>
                    <h1 className="text-2xl font-bold text-foreground">LightWatch</h1>
                    <p className="text-muted-foreground">Open Source Infrastructure Monitoring</p>
                </div>
            </div>

            {/* Actions Section */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
                {/* Notifications */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="bg-secondary">
                            <Bell className="h-4 w-4 text-destructive mr-2" />
                            {notificationCount > 0 && (
                                <Badge variant="destructive" className="mr-1">
                                    {notificationCount > 99 ? '99+' : notificationCount}
                                </Badge>
                            )}
                            <span className="sr-only">Notifications</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>View all notifications</DropdownMenuItem>
                        <DropdownMenuItem>Mark all as read</DropdownMenuItem>
                        <DropdownMenuItem>Notification settings</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Connection Status */}
                <Button variant="outline" size="sm" className="bg-secondary">
                    {connectionStatus === 'connected' ? (
                        <>
                            <Wifi className="h-4 w-4 text-green-500 mr-2" />
                            <span className="text-green-500">Connected</span>
                        </>
                    ) : connectionStatus === 'connecting' ? (
                        <>
                            <Wifi className="h-4 w-4 text-yellow-500 mr-2 animate-pulse" />
                            <span className="text-yellow-500">Connecting...</span>
                        </>
                    ) : (
                        <>
                            <WifiOff className="h-4 w-4 text-destructive mr-2" />
                            <span className="text-destructive">Disconnected</span>
                        </>
                    )}
                </Button>
            </div>
        </header>
    );
}