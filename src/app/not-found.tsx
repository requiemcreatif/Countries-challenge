"use client";

import { useRouter } from "next/navigation";
import { MapPin, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
//import { useTheme } from "@/providers/ThemeProvider";
import Footer from "@/components/Footer";

export default function NotFound() {
  const router = useRouter();
  //const { theme } = useTheme();

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-16 animate-fadeIn">
        <Card className="max-w-md w-full p-8 text-center space-y-6">
          <div className="relative mx-auto w-24 h-24">
            <div className="absolute inset-0 rounded-full bg-muted/50 flex items-center justify-center">
              <MapPin size={48} className="text-muted-foreground/70" />
            </div>
            <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-destructive flex items-center justify-center animate-pulse">
              <span className="text-destructive-foreground font-medium text-xs">
                404
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">
              Country Not Found
            </h1>
            <p className="text-muted-foreground">
              Sorry, we couldn't locate the country you're looking for. It seems
              to have disappeared from our map.
            </p>
          </div>

          <div className="pt-4">
            <Button
              variant="default"
              className="gap-2"
              onClick={() => router.push("/")}
            >
              <ArrowLeft size={16} />
              Back to Countries
            </Button>
          </div>

          <div className="text-xs text-muted-foreground pt-2">
            Try searching for a different country or check your URL
          </div>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
