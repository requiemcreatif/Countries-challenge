import { Info } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function HeroSection() {
  return (
    <div className="relative overflow-hidden py-8 md:py-10 mb-4">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-[10%] w-64 h-64 rounded-full bg-blue-600/5 dark:bg-blue-600/10 blur-3xl" />
        <div className="absolute bottom-0 right-[20%] w-64 h-64 rounded-full bg-red-600/5 dark:bg-red-600/10 blur-3xl" />
      </div>

      <div className="container mx-auto max-w-5xl px-4">
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              <span className="inline-block">Explore Our</span>{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-red-600 dark:from-blue-500 dark:to-red-500 inline-block">
                World
              </span>
            </h1>

            <p className="text-base md:text-lg text-muted-foreground">
              Discover countries from around the globe with our interactive
              country explorer.
            </p>

            {/* Instructions */}
            <Card className="mt-4 bg-card/50 border-blue-600/20">
              <CardContent className="p-4">
                <div className="flex items-start gap-2">
                  <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-left">
                    <p className="font-medium text-primary mb-2">How to use:</p>
                    <ul className="space-y-1 list-disc list-inside text-muted-foreground">
                      <li>Hover over any country name to see more details</li>
                      <li>
                        Use the pagination controls to view more countries
                      </li>
                      <li>Filter countries by typing in the search box</li>
                      <li>Countries are displayed in alphabetical order</li>
                      <li>
                        Toggle between light and dark mode using the icon in the
                        top right
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
