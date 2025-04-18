"use client";

import { useQuery } from "@apollo/client";
import { Search, X } from "lucide-react";
import { useState, ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CountryPagination from "@/components/CountryPagination";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import CountryTooltip from "@/components/CountryTooltip";
import { Country } from "@/types/country";
import Topbar from "@/components/Topbar";
import { COUNTRIES } from "@/graphql";

import { cn } from "@/lib/utils";

export default function CountriesPage() {
  const { data, loading, error } = useQuery(COUNTRIES);
  const [codeFilter, setCodeFilter] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const clearFilter = () => {
    setCodeFilter("");
    setCurrentPage(1);
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading countries data...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <Card className="max-w-lg mx-auto mt-12 border-destructive/20">
        <CardHeader>
          <CardTitle className="text-destructive">Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{error.message}</p>
        </CardContent>
      </Card>
    );

  // Filter countries by code
  const filteredCountries = data.countries.filter((country: Country) =>
    country.code.toLowerCase().includes(codeFilter.toLowerCase())
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredCountries.length / itemsPerPage);
  const paginatedCountries = filteredCountries.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-background to-background/95">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600/80 via-primary to-red-600/80 z-50" />
      <Topbar />

      <main className="flex-grow">
        <div className="container mx-auto max-w-5xl">
          <HeroSection />

          <div className="px-4 space-y-4">
            <div className="w-full sm:max-w-xs">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Filter by ISO code…"
                  value={codeFilter}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setCodeFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="pl-9 pr-8 border-blue-600/20 focus-visible:ring-blue-600/20"
                />
                {codeFilter && (
                  <button
                    type="button"
                    onClick={clearFilter}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-red-500"
                    aria-label="Clear filter"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
              <div className="flex items-center justify-between mt-1 text-sm">
                <p className="text-muted-foreground">
                  Showing {paginatedCountries.length} of{" "}
                  {filteredCountries.length} countries
                </p>
                {codeFilter && (
                  <button
                    onClick={clearFilter}
                    className="text-blue-600 dark:text-blue-400 hover:underline text-xs"
                  >
                    Clear filter
                  </button>
                )}
              </div>
            </div>
            <Card className="overflow-hidden border-blue-600/10 dark:border-blue-400/10">
              <div className="overflow-x-auto">
                <Table className="table-fixed w-full">
                  <TableHeader className="bg-blue-50 dark:bg-blue-950/30">
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="text-blue-800 dark:text-blue-300 w-3/4">
                        Country
                      </TableHead>
                      <TableHead className="text-blue-800 dark:text-blue-300 w-1/4 text-center">
                        Code
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="min-h-[320px]">
                    {paginatedCountries.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={2}
                          className="text-center h-16 text-muted-foreground"
                        >
                          No countries found matching the filter criteria.
                        </TableCell>
                      </TableRow>
                    ) : (
                      <>
                        {paginatedCountries.map(
                          (country: Country, index: number) => (
                            <CountryTooltip
                              key={country.code}
                              country={country}
                            >
                              <TableRow
                                className={cn(
                                  "hover:bg-blue-100/50 dark:hover:bg-blue-950/30 cursor-pointer transition-colors",
                                  index % 2 === 0
                                    ? "bg-transparent"
                                    : "bg-blue-50/30 dark:bg-slate-800/40"
                                )}
                              >
                                <TableCell className="py-3">
                                  <div className="flex items-center space-x-2 w-full max-w-[350px]">
                                    <span className="text-xl">
                                      {country.emoji || ""}
                                    </span>
                                    <span className="truncate">
                                      {country.name}
                                    </span>
                                  </div>
                                </TableCell>
                                <TableCell className="text-center font-mono text-xs py-3 w-24">
                                  {country.code}
                                </TableCell>
                              </TableRow>
                            </CountryTooltip>
                          )
                        )}
                        {/* Add empty rows if we have less than itemsPerPage items to keep table height consistent */}
                        {paginatedCountries.length < itemsPerPage &&
                          codeFilter === "" &&
                          Array.from({
                            length: itemsPerPage - paginatedCountries.length,
                          }).map((_, i) => (
                            <TableRow
                              key={`empty-${i}`}
                              className={`h-10 ${
                                (paginatedCountries.length + i) % 2 === 0
                                  ? "bg-transparent"
                                  : "bg-blue-50/30 dark:bg-blue-950/10"
                              }`}
                            >
                              <TableCell colSpan={2}>&nbsp;</TableCell>
                            </TableRow>
                          ))}
                      </>
                    )}
                  </TableBody>
                </Table>
              </div>
            </Card>
            {filteredCountries.length > 0 && (
              <div className="py-2">
                <CountryPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  setCurrentPage={setCurrentPage}
                />
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
