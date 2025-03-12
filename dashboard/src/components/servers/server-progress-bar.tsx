
interface ServerProgressBarProps {
    name: string;
    value: number;
    max: number;
    threshold: number;
    color: string;
}

{/* <div>
    <div className="flex justify-between text-xs mb-1">
        <span>Memory</span>
        <span
            className={
                server.memory > 90
                    ? "text-red-500"
                    : server.memory > 70
                        ? "text-yellow-500"
                        : "text-green-500"
            }
        >
            {server.memory}%
        </span>
    </div>
    <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
        <div
            className={`h-full rounded-full ${server.memory > 90
                    ? "bg-red-500"
                    : server.memory > 70
                        ? "bg-yellow-500"
                        : "bg-green-500"
                }`}
            style={{ width: `${server.memory}%` }}
        />
    </div>
</div> */}

export function ServerProgressBar({ name, value, max, threshold, color }: ServerProgressBarProps) {
    const percentage = (value / max) * 100;
    return (
        <div>
            <div className="flex justify-between text-xs mb-1">
                <span>{name}</span>
                <span
                    className={
                        value > threshold
                            ? "text-red-500"
                            : value > threshold
                                ? "text-yellow-500"
                                : "text-green-500"
                    }
                >
                    {value}%
                </span>
            </div>
            <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                <div
                    className={`h-full rounded-full ${value > threshold
                        ? "bg-red-500"
                        : value > threshold
                            ? "bg-yellow-500"
                            : "bg-green-500"
                        }`}
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    )
}