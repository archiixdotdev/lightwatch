import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} LightWatch. All rights reserved.
          </div>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <Button variant="ghost" size="sm" asChild>
              <a 
                href="https://github.com/archixxdotdev/lightwatch"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </Button>
            {/* <Button variant="ghost" size="sm" asChild>
              <a href="/docs">
                Documentation
              </a>
            </Button> */}
          </div>
        </div>
      </div>
    </footer>
  );
} 