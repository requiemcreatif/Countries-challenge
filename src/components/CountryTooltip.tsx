import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Country } from "@/types/country";

interface CountryTooltipProps {
  country: Country;
  children: React.ReactNode;
}

export default function CountryTooltip({
  country,
  children,
}: CountryTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={200}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          side="top"
          align="center"
          className="bg-card border-blue-600/20 dark:border-blue-400/20 p-0 shadow-lg animate-in fade-in-50 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 duration-200"
          sideOffset={5}
          forceMount
        >
          <div className="p-3 min-w-[220px]">
            <div className="flex items-start gap-2">
              <div className="text-2xl mt-0.5 animate-in slide-in-from-left-3 duration-300">
                {country.emoji || "🌍"}
              </div>
              <div className="space-y-1 animate-in slide-in-from-right-3 duration-300">
                <h3 className="font-bold text-base">{country.name}</h3>
                <div className="font-mono text-xs py-0.5 px-2 bg-blue-50 dark:bg-blue-950/30 rounded-sm inline-block text-blue-700 dark:text-blue-300">
                  {country.code}
                </div>
              </div>
            </div>

            <div className="mt-3 text-sm space-y-1 text-muted-foreground animate-in fade-in-50 duration-500">
              {country.capital && (
                <div className="flex justify-between border-b border-border/40 pb-1">
                  <span className="font-medium">Capital:</span>
                  <span>{country.capital}</span>
                </div>
              )}

              {country.currency && (
                <div className="flex justify-between pt-1">
                  <span className="font-medium">Currency:</span>
                  <span>{country.currency}</span>
                </div>
              )}
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
