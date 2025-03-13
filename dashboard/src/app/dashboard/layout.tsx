import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { NavigationBar } from "@/components/navigation/navigation-bar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-background flex-1 container mx-auto px-4 py-6">
      <div className="flex flex-col">
        {/* Header */}
        <DashboardHeader />
        
        {/* Navigation */}
        <NavigationBar />
        
        {/* Main Content */}
        <main className="flex-1 container mx-auto px-4 py-6">
          {children}
        </main>
      </div>
    </div>
  );
}