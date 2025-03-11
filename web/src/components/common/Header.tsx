import Link from 'next/link';
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          LightWatch
        </Link>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/">Home</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/demo">Demo</Link>
          </Button>
          <Button variant="outline" asChild>
            <a 
              href="https://github.com/archixx/lightwatch" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </Button>
        </div>
      </nav>
    </header>
  );
} 