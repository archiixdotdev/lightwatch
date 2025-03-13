'use client'

import { Button } from "@/components/ui/button";
import { MonitorX, Home, RotateCcw } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center space-y-6 max-w-md">
        {/* Fun Server Icon */}
        <div className="relative mx-auto w-24 h-24 mb-8">
          <div className="absolute inset-0 animate-pulse">
            <MonitorX className="w-24 h-24 text-destructive opacity-50" />
          </div>
          <MonitorX className="w-24 h-24 text-destructive relative z-10" />
        </div>

        {/* Error Message */}
        <h1 className="text-4xl font-bold text-foreground">404 - Server Not Found</h1>
        
        {/* Fun Technical Message */}
        <div className="font-mono text-sm text-muted-foreground bg-secondary p-4 rounded-lg">
          <p>ERROR: SERVER_NOT_RESPONDING</p>
          <p>STATUS: OFFLINE</p>
          <p>PING: timeout</p>
          <p>LAST_SEEN: ¯\_(ツ)_/¯</p>
        </div>

        {/* Humorous Message */}
        <p className="text-muted-foreground">
          Looks like this server went on an unplanned vacation. 
          Our monitoring systems show it's somewhere in the Bermuda Triangle.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button asChild variant="default">
            <Link href="/dashboard">
              <Home className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
          <Button 
            variant="outline"
            onClick={() => router.back()}
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Try Previous Page
          </Button>
        </div>
      </div>
    </div>
  );
} 