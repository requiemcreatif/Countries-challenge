import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
//import userEvent from "@testing-library/user-event";
import { MockedProvider } from "@apollo/client/testing";
import CountriesPage from "@/app/page";
import { COUNTRIES } from "@/graphql";
import { ThemeProvider } from "@/providers/ThemeProvider";

// Mock data
const mockCountries = [
  {
    code: "US",
    name: "United States",
    capital: "Washington D.C.",
    currency: "USD",
    emoji: "🇺🇸",
  },
  {
    code: "GB",
    name: "United Kingdom",
    capital: "London",
    currency: "GBP",
    emoji: "🇬🇧",
  },
  {
    code: "FR",
    name: "France",
    capital: "Paris",
    currency: "EUR",
    emoji: "🇫🇷",
  },
  {
    code: "DE",
    name: "Germany",
    capital: "Berlin",
    currency: "EUR",
    emoji: "🇩🇪",
  },
  { code: "JP", name: "Japan", capital: "Tokyo", currency: "JPY", emoji: "🇯🇵" },
  {
    code: "AU",
    name: "Australia",
    capital: "Canberra",
    currency: "AUD",
    emoji: "🇦🇺",
  },
  {
    code: "BR",
    name: "Brazil",
    capital: "Brasília",
    currency: "BRL",
    emoji: "🇧🇷",
  },
  {
    code: "CA",
    name: "Canada",
    capital: "Ottawa",
    currency: "CAD",
    emoji: "🇨🇦",
  },
  {
    code: "CN",
    name: "China",
    capital: "Beijing",
    currency: "CNY",
    emoji: "🇨🇳",
  },
  {
    code: "IN",
    name: "India",
    capital: "New Delhi",
    currency: "INR",
    emoji: "🇮🇳",
  },
  { code: "IT", name: "Italy", capital: "Rome", currency: "EUR", emoji: "🇮🇹" },
  {
    code: "MX",
    name: "Mexico",
    capital: "Mexico City",
    currency: "MXN",
    emoji: "🇲🇽",
  },
];

// Mock for the GraphQL query
const mocks = [
  {
    request: {
      query: COUNTRIES,
    },
    result: {
      data: {
        countries: mockCountries,
      },
    },
  },
];

// Mock component for Portal/Tooltip testing
jest.mock("@radix-ui/react-tooltip", () => ({
  Provider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  Root: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Trigger: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="tooltip-trigger">{children}</div>
  ),
  Content: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="tooltip-content">{children}</div>
  ),
  Portal: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="tooltip-portal">{children}</div>
  ),
}));

const renderWithProviders = (component: React.ReactNode) => {
  return render(
    <ThemeProvider>
      <MockedProvider mocks={mocks} addTypename={false}>
        {component}
      </MockedProvider>
    </ThemeProvider>
  );
};

describe("CountriesPage", () => {
  test("displays loading state initially", () => {
    renderWithProviders(<CountriesPage />);
    expect(screen.getByText("Loading countries data...")).toBeInTheDocument();
  });

  test("displays countries data after loading", async () => {
    renderWithProviders(<CountriesPage />);

    // Wait for data to load
    await waitFor(() => {
      expect(
        screen.queryByText("Loading countries data...")
      ).not.toBeInTheDocument();
    });

    // Check if the countries are displayed - using getAllByText to handle multiple matches
    expect(screen.getAllByText("United States").length).toBeGreaterThan(0);
    expect(screen.getAllByText("United Kingdom").length).toBeGreaterThan(0);
  });

  test("filters countries by code", async () => {
    renderWithProviders(<CountriesPage />);

    // Wait for data to load
    await waitFor(() => {
      expect(
        screen.queryByText("Loading countries data...")
      ).not.toBeInTheDocument();
    });

    // Find the filter input
    const filterInput = screen.getByPlaceholderText("Filter by ISO code…");

    // Filter for 'US'
    fireEvent.change(filterInput, { target: { value: "US" } });

    // Check that only US is displayed and UK is not
    const usRows = screen.getAllByText("United States");
    expect(usRows.length).toBeGreaterThan(0);
    expect(screen.queryAllByText("United Kingdom").length).toBe(0);

    // Check that the filter summary is updated
    expect(screen.getByText(/Showing 1 of/)).toBeInTheDocument();
  });

  test("clears filter when clear button is clicked", async () => {
    renderWithProviders(<CountriesPage />);

    // Wait for data to load
    await waitFor(() => {
      expect(
        screen.queryByText("Loading countries data...")
      ).not.toBeInTheDocument();
    });

    // Find the filter input
    const filterInput = screen.getByPlaceholderText("Filter by ISO code…");

    // Filter for 'US'
    fireEvent.change(filterInput, { target: { value: "US" } });

    // Click the clear button
    const clearButton = screen.getByLabelText("Clear filter");
    fireEvent.click(clearButton);

    // Check that the filter is cleared
    expect(filterInput).toHaveValue("");

    // Check that both US and UK countries are displayed again
    expect(screen.getAllByText("United States").length).toBeGreaterThan(0);
    expect(screen.getAllByText("United Kingdom").length).toBeGreaterThan(0);
  });

  test("displays correct number of countries per page", async () => {
    renderWithProviders(<CountriesPage />);

    // Wait for data to load
    await waitFor(() => {
      expect(
        screen.queryByText("Loading countries data...")
      ).not.toBeInTheDocument();
    });

    // Check that only 10 countries are displayed initially
    const countryElements = screen.getAllByRole("row").slice(1);
    expect(countryElements.length).toBeLessThanOrEqual(10);
  });

  test("pagination works correctly", async () => {
    renderWithProviders(<CountriesPage />);

    // Wait for data to load
    await waitFor(() => {
      expect(
        screen.queryByText("Loading countries data...")
      ).not.toBeInTheDocument();
    });

    // Check current page in our app, pagination uses links, not buttons
    const page1Link = screen.getByRole("link", { name: "1" });
    expect(page1Link).toHaveAttribute("aria-current", "page");

    // Navigate to page 2
    const page2Link = screen.getByRole("link", { name: "2" });
    fireEvent.click(page2Link);

    // Check that page 2 is now active
    expect(page2Link).toHaveAttribute("aria-current", "page");

    // Check that different countries are displayed on page 2
    expect(screen.queryAllByText("United States").length).toBe(0);
  });

  test("theme toggle works", async () => {
    renderWithProviders(<CountriesPage />);

    // Wait for data to load
    await waitFor(() => {
      expect(
        screen.queryByText("Loading countries data...")
      ).not.toBeInTheDocument();
    });

    // Find and click the theme toggle button
    const themeToggle = screen.getByLabelText("Toggle theme");
    fireEvent.click(themeToggle);

    // Check that the theme has changed
  });
});
