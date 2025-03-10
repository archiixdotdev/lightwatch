'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Server, Database, Monitor, Cpu, Activity, Info, Shield, LineChart } from 'lucide-react';

type ComponentInfo = {
    title: string;
    description: string;
};

const componentInfo: Record<string, ComponentInfo> = {
    agent: {
        title: "Agent Components",
        description: "Collects system metrics and securely transmits them to the central server."
    },
    collector: {
        title: "Metric Collector",
        description: "Gathers performance data and metrics from your systems."
    },
    tunnel: {
        title: "Secure Tunnel",
        description: "Encrypts and securely transmits data using mTLS."
    },
    server: {
        title: "Central Server",
        description: "Processes and manages incoming metric data."
    },
    storage: {
        title: "Time Series DB",
        description: "Efficiently stores and indexes time-series metric data."
    },
    authenticator: {
        title: "Authentication Service",
        description: "Handles mTLS authentication and validates agent connections."
    },
    processor: {
        title: "Metric Processor",
        description: "Processes and analyzes incoming metric data in real-time."
    }
};

export function SystemArchitecture() {
    const [hoveredComponent, setHoveredComponent] = useState<string | null>(null);

    return (
        <div className="space-y-4">
            <div className="relative h-[400px] w-full overflow-hidden rounded-lg border bg-background p-6">
                {/* Connection Lines with Animated Dots */}
                <div className="absolute inset-0 pointer-events-none z-0">
                    {/* Agent to Server Connection */}
                    {/* <div className="absolute left-[28%] right-[48%] top-[35%] border-t-2 border-dashed border-muted-foreground/30" />
                    <motion.div
                        className="absolute w-2 h-2 rounded-full bg-primary"
                        style={{ top: 'calc(35% - 4px)', left: '28%' }}
                        animate={{
                            x: ['0%', '200%'],
                            opacity: [0, 1, 0]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    /> */}

                    {/* Server to Storage Connection */}
                    {/* <div className="absolute left-[52%] right-[28%] top-[35%] border-t-2 border-dashed border-muted-foreground/30" />
                    <motion.div
                        className="absolute w-2 h-2 rounded-full bg-primary"
                        style={{ top: 'calc(35% - 4px)', left: '52%' }}
                        animate={{
                            x: ['0%', '200%'],
                            opacity: [0, 1, 0]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear",
                            delay: 0.5
                        }}
                    /> */}
                </div>

                <div className="relative flex justify-between items-start pt-0 px-4 gap-4 z-10 pb-4">
                    {/* Agent Component */}
                    <motion.div
                        className={`w-[200px] transition-colors ${hoveredComponent === 'agent' ? 'bg-primary/5' : 'bg-background'
                            }`}
                        onMouseEnter={() => setHoveredComponent('agent')}
                        onMouseLeave={() => setHoveredComponent(null)}
                    >
                        <div className="rounded-lg border p-4 space-y-4 bg-card">
                            <div className="flex flex-col items-center gap-2">
                                <div className="p-3 bg-primary/10 rounded-lg">
                                    <Monitor className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="font-medium text-sm">Agent</h3>
                            </div>
                            <div className="space-y-2">
                                <div
                                    className={`p-2 rounded border text-xs ${hoveredComponent === 'collector' ? 'bg-primary/5' : 'bg-background'
                                        }`}
                                    onMouseEnter={() => setHoveredComponent('collector')}
                                >
                                    <Cpu className="w-4 h-4 mb-1" />
                                    Metric Collector
                                </div>
                                <div
                                    className={`p-2 rounded border text-xs ${hoveredComponent === 'tunnel' ? 'bg-primary/5' : 'bg-background'
                                        }`}
                                    onMouseEnter={() => setHoveredComponent('tunnel')}
                                >
                                    <Activity className="w-4 h-4 mb-1" />
                                    Secure Tunnel
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Server Component */}
                    <motion.div
                        className={`w-[200px] transition-colors ${hoveredComponent === 'server' ? 'bg-primary/5' : 'bg-background'
                            }`}
                        onMouseEnter={() => setHoveredComponent('server')}
                        onMouseLeave={() => setHoveredComponent(null)}
                    >
                        <div className="rounded-lg border p-4 bg-card">
                            <div className="flex flex-col items-center gap-2">
                                <div className="p-4 bg-primary/10 rounded-lg">
                                    <Server className="w-8 h-8 text-primary" />
                                </div>
                                <h3 className="font-medium text-sm">Central Server</h3>
                            </div>
                            <div className="space-y-2 mt-4">
                                <div 
                                    className={`p-2 rounded border text-xs ${
                                        hoveredComponent === 'authenticator' ? 'bg-primary/5' : 'bg-background'
                                    }`}
                                    onMouseEnter={() => setHoveredComponent('authenticator')}
                                >
                                    <Shield className="w-4 h-4 mb-1" />
                                    Authentication Service
                                </div>
                                <div 
                                    className={`p-2 rounded border text-xs ${
                                        hoveredComponent === 'processor' ? 'bg-primary/5' : 'bg-background'
                                    }`}
                                    onMouseEnter={() => setHoveredComponent('processor')}
                                >
                                    <LineChart className="w-4 h-4 mb-1" />
                                    Metric Processor
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Storage Component */}
                    <motion.div
                        className={`w-[200px] transition-colors ${hoveredComponent === 'storage' ? 'bg-primary/5' : 'bg-background'
                            }`}
                        onMouseEnter={() => setHoveredComponent('storage')}
                        onMouseLeave={() => setHoveredComponent(null)}
                    >
                        <div className="rounded-lg border p-4 bg-card">
                            <div className="flex flex-col items-center gap-2">
                                <div className="p-3 bg-primary/10 rounded-lg">
                                    <Database className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="font-medium text-sm">Time Series DB</h3>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Connection Labels */}
                {/* <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute left-[32%] top-[28%] text-xs text-muted-foreground bg-background/80 px-2 rounded">
            Secure Data Transfer
          </div>
          <div className="absolute left-[58%] top-[28%] text-xs text-muted-foreground bg-background/80 px-2 rounded">
            Store Metrics
          </div>
        </div> */}
                <div className="rounded-lg border p-2 bg-muted/30">
                    <div className="flex items-center gap-2">
                        <Info className="h-4 w-4 text-muted-foreground" />
                        <h3 className="font-medium">
                            {hoveredComponent ? componentInfo[hoveredComponent]?.title : "System Overview"}
                        </h3>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                        {hoveredComponent
                            ? componentInfo[hoveredComponent]?.description
                            : "Hover over any component to see more details. The animated dots represent data flowing through your system."}
                    </p>
                </div>
            </div>

            {/* Info Panel */}
        </div>
    );
} 