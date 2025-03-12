import { ArrowDown, ArrowUp, Circle, Icon, LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

interface MetricCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    changeLabel: string;
    iconColor: string;
    changeDirection: "up" | "down" | "neutral";
    changeColor: string;
}

export function MetricCard({ title, value, icon, changeLabel, iconColor, changeDirection, changeColor }: MetricCardProps) {
    return (
        <Card>
            <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                    {icon && React.createElement(icon, { 
                        className: `h-4 w-4 ${iconColor}` 
                    })}
                    <CardTitle className="text-sm font-medium">{title}</CardTitle>
                </div>
            </CardHeader>

            <CardContent>
                <div className="flex flex-col">
                    <span className="text-4xl font-bold">{value}</span>
                    <div className={`flex items-center text-xs ${changeColor}`}>
                        {changeDirection == "up" && <ArrowUp className="h-3 w-3 mr-1" />}
                        {changeDirection == "down" && <ArrowDown className="h-3 w-3 mr-1" />}
                        {changeDirection == "neutral" && <Circle className="h-3 w-3 mr-1" />}
                        <span className="text-${changeColor}-500">{changeLabel}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}