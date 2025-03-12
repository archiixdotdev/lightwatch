import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Github, Layers, Shield, Zap, Server, Bell, Database } from "lucide-react";
import { SystemArchitecture } from "@/components/diagrams/SystemArchitecture";
import { CommunicationFlow } from "@/components/diagrams/CommunicationFlow";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.02]" />
        <div className="container px-4 mx-auto relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 text-sm 
              border rounded-full text-muted-foreground border-muted-foreground/20 gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Now in Development
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent 
              bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:to-gray-200">
              Open Source Lightweight Infrastructure Monitoring
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Monitor your servers, applications, and infrastructure with minimal resource overhead and maximum security.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" variant="default" className="h-12 px-6 font-medium" asChild>
                <a href="https://github.com/archiixdotdev/lightwatch"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center">
                  <Github className="mr-2 h-5 w-5" />
                  View on GitHub
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 px-6 font-medium group transition-colors"
                asChild
              >
                <Link href="#features" className="inline-flex items-center">
                  Learn More
                  <svg
                    className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </Button>
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted/50 text-sm text-muted-foreground">
                <Shield className="h-4 w-4" />
                MIT License
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted/50 text-sm text-muted-foreground">
                <Github className="h-4 w-4" />
                Open Source
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted/50 text-sm text-muted-foreground">
                <Server className="h-4 w-4" />
                Self-hosted
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-muted/30">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose LightWatch?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Designed to solve common challenges in infrastructure monitoring with a focus on efficiency and security
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Zap className="h-6 w-6" />}
              title="Lightweight Operation"
              description="Minimal resource consumption with optimized data collection and transmission, reducing system overhead by up to 80%."
            />
            <FeatureCard
              icon={<Shield className="h-6 w-6" />}
              title="Secure Communication"
              description="Tunnel-based communication with mTLS ensures data integrity and security, preventing unauthorized access."
            />
            <FeatureCard
              icon={<Server className="h-6 w-6" />}
              title="Easy Deployment"
              description="Simple setup process with minimal configuration required, allowing you to get up and running in minutes."
            />
            <FeatureCard
              icon={<Bell className="h-6 w-6" />}
              title="Real-time Alerts"
              description="Configurable alert thresholds with multiple notification channels including email, Slack, and webhooks."
            />
            <FeatureCard
              icon={<Database className="h-6 w-6" />}
              title="Embedded Database"
              description="No external database dependencies, with built-in time-series storage optimized for monitoring data."
            />
            <FeatureCard
              icon={<Layers className="h-6 w-6" />}
              title="Open Source"
              description="Fully open source under the MIT license, allowing for community contributions and customizations."
            />
          </div>
        </div>
      </section>

      {/* Architecture Section */}
      <section id="architecture" className="py-24">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">System Architecture</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Designed with efficiency and security in mind
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">System Components</CardTitle>
              </CardHeader>
              <CardContent className="h-[400px]">
                <SystemArchitecture />
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">Communication Flow</CardTitle>
              </CardHeader>
              <CardContent className="h-[400px]">
                <CommunicationFlow />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.02]" />
        <div className="container px-4 mx-auto text-center relative">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Join Us on the Development Journey
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              LightWatch is currently in development. Contribute to the project, share your ideas, and help shape the future of lightweight infrastructure monitoring.
            </p>
            <Button size="lg" className="h-12 px-6 font-medium" asChild>
              <a
                href="https://github.com/archiixdotdev/lightwatch"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center"
              >
                <Github className="mr-2 h-5 w-5" />
                Star on GitHub
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <Card className="group relative overflow-hidden border-none shadow-lg transition-all hover:shadow-xl">
      <CardHeader>
        <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4 
          group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all">
          {icon}
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
