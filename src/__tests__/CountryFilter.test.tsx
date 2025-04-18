import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import CountriesPage from "@/app/page";
import { COUNTRIES } from "@/graphql";
import { ThemeProvider } from "@/providers/ThemeProvider";

// Mock data with a variety of country codes to test filtering
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

describe("Country Filtering", () => {
  const renderWithProviders = () => {
    return render(
      <ThemeProvider>
        <MockedProvider mocks={mocks} addTypename={false}>
          <CountriesPage />
        </MockedProvider>
      </ThemeProvider>
    );
  };

  test("filter works with case insensitivity", async () => {
    renderWithProviders();

    // Wait for data to load
    await screen.findByText("United States");

    // Get the filter input
    const filterInput = screen.getByPlaceholderText("Filter by ISO code…");

    // Test lowercase filtering
    fireEvent.change(filterInput, { target: { value: "us" } });
    expect(screen.getByText("United States")).toBeInTheDocument();
    expect(screen.queryByText("United Kingdom")).not.toBeInTheDocument();

    // Test uppercase filtering
    fireEvent.change(filterInput, { target: { value: "US" } });
    expect(screen.getByText("United States")).toBeInTheDocument();
    expect(screen.queryByText("United Kingdom")).not.toBeInTheDocument();

    // Test mixed case filtering
    fireEvent.change(filterInput, { target: { value: "Us" } });
    expect(screen.getByText("United States")).toBeInTheDocument();
    expect(screen.queryByText("United Kingdom")).not.toBeInTheDocument();
  });

  test("filter shows correct count of filtered results", async () => {
    renderWithProviders();

    // Wait for data to load
    await screen.findByText("United States");

    // Get the filter input
    const filterInput = screen.getByPlaceholderText("Filter by ISO code…");

    // Test with no results
    fireEvent.change(filterInput, { target: { value: "ZZ" } });
    expect(
      screen.getByText("No countries found matching the filter criteria.")
    ).toBeInTheDocument();

    expect(screen.getByText(/Showing 0 of/)).toBeInTheDocument();

    // Test with a single match to simplify test
    fireEvent.change(filterInput, { target: { value: "US" } });
    const usElements = screen.getAllByText(/United States/);
    expect(usElements.length).toBeGreaterThan(0);
    expect(screen.queryAllByText(/United Kingdom/).length).toBe(0);
    expect(screen.queryAllByText(/France/).length).toBe(0);
    // Check filter count shows at least 1 result
    expect(screen.getByText(/Showing 1 of/)).toBeInTheDocument();
  });

  test("clear filter button resets the filter", async () => {
    renderWithProviders();

    // Wait for data to load
    await screen.findByText("United States");

    // Get the filter input
    const filterInput = screen.getByPlaceholderText("Filter by ISO code…");

    // Apply a filter
    fireEvent.change(filterInput, { target: { value: "US" } });
    expect(screen.getByText("United States")).toBeInTheDocument();
    expect(screen.queryByText("United Kingdom")).not.toBeInTheDocument();

    // Clear using the button in the input field
    const clearInputButton = screen.getByLabelText("Clear filter");
    fireEvent.click(clearInputButton);

    // Check filter is cleared
    expect(filterInput).toHaveValue("");
    expect(screen.getByText("United States")).toBeInTheDocument();
    expect(screen.getByText("United Kingdom")).toBeInTheDocument();
    expect(screen.getByText("France")).toBeInTheDocument();
  });

  test("handles empty state when no matches are found", async () => {
    renderWithProviders();

    // Wait for data to load
    await screen.findByText("United States");

    // Get the filter input
    const filterInput = screen.getByPlaceholderText("Filter by ISO code…");

    // Apply a filter with no matches
    fireEvent.change(filterInput, { target: { value: "XYZ" } });

    // Check for empty state message
    expect(
      screen.getByText("No countries found matching the filter criteria.")
    ).toBeInTheDocument();
  });
});
