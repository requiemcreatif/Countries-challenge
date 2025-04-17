# Countries Challenge

This project consumes the GraphQL API available at https://countries.trevorblades.com/ to display a list of countries with filtering capability.

## Features

- Displays a table with country names and codes
- Provides a filter to search by country code
- Includes pagination for better user experience
- Responsive, accessible UI components with shadcn/ui
- Includes dark mode/light mode toggle
- Built with Next.js, Apollo Client, and TypeScript

## Getting Started

### Prerequisites

- Node.js 18.0.0 or later
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/countries-challenge.git
cd countries-challenge
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Start the development server

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application

## Technical Implementation

- Built with Next.js App Router
- Uses Apollo Client to fetch data from the GraphQL API
- Implements client-side filtering for country codes
- Implements pagination for better data browsing
- UI components from shadcn/ui for a polished, accessible interface
- Styled with Tailwind CSS
- Includes light/dark theme support
- Written in TypeScript for type safety

## GraphQL Query Used

```graphql
query Countries {
  countries {
    code
    name
  }
}
```
# Countries-challenge
