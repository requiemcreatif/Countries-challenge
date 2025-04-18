import React from "react";
import { render, screen } from "@testing-library/react";
import CountryTooltip from "@/components/CountryTooltip";
import { Country } from "@/types/country";

// Mock tooltip components to avoid portal issues in tests
jest.mock("@/components/ui/tooltip", () => ({
  Tooltip: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="tooltip">{children}</div>
  ),
  TooltipContent: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="tooltip-content">{children}</div>
  ),
  TooltipProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="tooltip-provider">{children}</div>
  ),
  TooltipTrigger: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="tooltip-trigger">{children}</div>
  ),
}));

describe("CountryTooltip", () => {
  const mockCountry: Country = {
    code: "FR",
    name: "France",
    capital: "Paris",
    currency: "EUR",
    emoji: "🇫🇷",
  };

  test("renders the tooltip trigger with children", () => {
    render(
      <CountryTooltip country={mockCountry}>
        <div>Trigger Content</div>
      </CountryTooltip>
    );

    const trigger = screen.getByTestId("tooltip-trigger");
    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveTextContent("Trigger Content");
  });

  test("renders tooltip content with country information", () => {
    render(
      <CountryTooltip country={mockCountry}>
        <div>Trigger Content</div>
      </CountryTooltip>
    );

    const content = screen.getByTestId("tooltip-content");
    expect(content).toBeInTheDocument();
    expect(content).toHaveTextContent("France");
    expect(content).toHaveTextContent("FR");
    expect(content).toHaveTextContent("Paris");
    expect(content).toHaveTextContent("EUR");
  });

  test("handles missing optional country data", () => {
    const incompleteCountry: Country = {
      code: "XX",
      name: "Test Country",
    };

    render(
      <CountryTooltip country={incompleteCountry}>
        <div>Trigger Content</div>
      </CountryTooltip>
    );

    const content = screen.getByTestId("tooltip-content");
    expect(content).toBeInTheDocument();
    expect(content).toHaveTextContent("Test Country");
    expect(content).toHaveTextContent("XX");
    expect(content).not.toHaveTextContent("undefined");
  });
});
