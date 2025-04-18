"use client";

import React from "react";
import Link from "next/link";
import { Github, Globe, ExternalLink } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";

export default function Footer() {
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={`mt-auto py-6 px-4 border-t ${
        theme === "dark" ? "border-blue-900/30" : "border-blue-200"
      }`}
    >
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <span className="font-medium">Countries Explorer</span>
          </div>

          <div className="text-sm text-muted-foreground text-center md:text-right">
            <p>
              Data provided by{" "}
              <a
                href="https://countries.trevorblades.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
              >
                countries.trevorblades.com
                <ExternalLink className="h-3 w-3" />
              </a>
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-col md:flex-row justify-between items-center gap-2 text-sm text-muted-foreground">
          <div className="order-2 md:order-1">
            © {currentYear} Countries Challenge
          </div>

          <div className="flex items-center gap-4 order-1 md:order-2">
            <Link
              href="/"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Home
            </Link>
            <a
              href="https://github.com/requiemcreatif/Countries-challenge.git"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-600 dark:hover:text-red-400 transition-colors inline-flex items-center gap-1"
            >
              <Github className="h-4 w-4" />
              Repository
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
