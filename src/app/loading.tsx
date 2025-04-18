import { Globe } from "lucide-react";
import Footer from "@/components/Footer";

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow flex flex-col items-center justify-center">
        <div className="relative animate-spin-slow">
          <Globe className="w-12 h-12 text-primary/70" strokeWidth={1.5} />
          <div className="absolute inset-0 animate-ping-slow">
            <Globe className="w-12 h-12 text-primary/30" strokeWidth={1.5} />
          </div>
        </div>
        <p className="mt-4 text-muted-foreground animate-pulse">
          Loading countries...
        </p>
      </main>

      <Footer />
    </div>
  );
}
