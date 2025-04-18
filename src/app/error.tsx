"use client";

import { useEffect } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Footer from "@/components/Footer";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2 text-destructive mb-2">
              <AlertCircle className="h-5 w-5" />
              <span className="text-sm font-medium">Something went wrong</span>
            </div>
            <CardTitle className="text-2xl">Error Loading Countries</CardTitle>
          </CardHeader>

          <CardContent className="text-muted-foreground">
            <p className="mb-4">
              We encountered an issue while trying to load the country data.
              This could be due to:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Connection issues with the API</li>
              <li>Temporary server problems</li>
              <li>Unexpected data format</li>
            </ul>
            {error.message && (
              <div className="mt-4 p-3 text-xs font-mono bg-muted/50 rounded overflow-auto">
                {error.message}
              </div>
            )}
          </CardContent>

          <CardFooter className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={() => (window.location.href = "/")}
            >
              Go Home
            </Button>
            <Button onClick={reset} className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Button>
          </CardFooter>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
