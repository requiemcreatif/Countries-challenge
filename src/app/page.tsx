"use client";

import { gql, useQuery } from "@apollo/client";
import { Search, Moon, Sun } from "lucide-react";
import clsx from "clsx";
import { useState } from "react";
import { useTheme } from "@/providers/ThemeProvider";

const COUNTRIES = gql`
  query Countries {
    countries {
      code
      name
    }
  }
`;

export default function CountriesPage() {
  const { data, loading, error } = useQuery(COUNTRIES);
  const [codeFilter, setCodeFilter] = useState("");
  const { theme, toggle } = useTheme();

  if (loading) return <p className="p-8">Loading…</p>;
  if (error) return <p className="p-8 text-red-600">Error: {error.message}</p>;

  const rows = data.countries.filter((c: { code: string }) =>
    c.code.toLowerCase().includes(codeFilter.toLowerCase())
  );

  return (
    <main className="container mx-auto max-w-5xl px-4 py-10 animate-fadeIn">
      {/* header */}
      <header className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-semibold tracking-tight">Countries</h1>
        <button
          onClick={toggle}
          className="rounded-full p-2 hover:bg-muted hover:dark:bg-muted/20"
          aria-label="toggle theme"
        >
          {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
        </button>
      </header>

      {/* filter */}
      <div className="relative mb-8 max-w-xs">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Filter by ISO code…"
          value={codeFilter}
          onChange={(e) => setCodeFilter(e.target.value)}
          className={clsx(
            "w-full rounded-lg border bg-background py-2 pl-10 pr-3 text-sm shadow-sm",
            "border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/30"
          )}
        />
      </div>

      {/* table */}
      <div className="overflow-x-auto rounded-xl shadow">
        <table className="min-w-full divide-y divide-border bg-card">
          <thead className="bg-muted/50 text-left text-sm font-semibold text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Country</th>
              <th className="px-4 py-3">Code</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border text-sm">
            {rows.map((c: { code: string; name: string }) => (
              <tr key={c.code} className="hover:bg-muted/30">
                <td className="px-4 py-2">{c.name}</td>
                <td className="px-4 py-2 font-mono">{c.code}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
