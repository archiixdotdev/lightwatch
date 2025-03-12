import { ArrowDown, ArrowUp, Circle, Icon, LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MetricCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    change: number;
    changeLabel: string;
    iconColor: string;
    changeDirection: "up" | "down" | "neutral";
    changeColor: string;
}

export function MetricCard({ title, value, icon, change, changeLabel, iconColor, changeDirection, changeColor }: MetricCardProps) {
    return (
        <Card>
            <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                    <Icon className={`h-4 w-4 text-${iconColor}`} iconNode={[]} />
                    <CardTitle className="text-sm font-medium">{title}</CardTitle>
                </div>
            </CardHeader>

            <CardContent>
                <div className="flex flex-col">
                    <span className="text-4xl font-bold">{value}</span>
                    <div className={`flex items-center text-xs text-${changeColor}-500`}>
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