import { gql } from "@apollo/client";

export const COUNTRIES = gql`
  query Countries {
    countries {
      code
      name
      capital
      currency
      emoji
    }
  }
`;
