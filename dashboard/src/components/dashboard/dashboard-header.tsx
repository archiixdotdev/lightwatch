'use client'
import { Shield, Bell, Circle, ChevronDown, Wifi, WifiOff, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "next-themes";

interface DashboardHeaderProps {
    notificationCount?: number;
    connectionStatus?: 'connected' | 'connecting' | 'disconnected';
}

export function DashboardHeader({
    notificationCount = 15,
    connectionStatus = 'connected'
}: DashboardHeaderProps) {
    const { theme, setTheme } = useTheme()

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

                {/* Theme Toggle */}
                <DropdownMenu>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                            setTheme(theme === "dark" ? "light" : "dark");
                        }}
                    >
                        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span className="sr-only">Toggle theme</span>
                    </Button>
                </DropdownMenu>

                {/* Notifications */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
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
                <Button variant="outline" size="sm">
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