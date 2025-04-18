import "./globals.css";
import { ReactNode } from "react";
import { Providers } from "@/providers/Providers";

export const metadata = {
  title: "Countries Challenge",
  description:
    "Explore countries from around the world with our interactive interface.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
