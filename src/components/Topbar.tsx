import React from "react";
import { Moon, Sun, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/providers/ThemeProvider";

export default function Topbar() {
  const { theme, toggle } = useTheme();

  return (
    <div className="sticky top-1 z-50 w-full border-b border-blue-600/10 dark:border-blue-400/10 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto max-w-5xl">
        <div className="flex h-14 items-center justify-between px-4">
          <div className="flex items-center space-x-2">
            <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <span className="font-semibold text-lg text-primary">
              Countries
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggle}
            aria-label="Toggle theme"
            className="h-8 w-8 hover:bg-blue-100 dark:hover:bg-blue-950"
          >
            {theme === "light" ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
