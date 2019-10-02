import gql from "graphql-tag";
export const AVAILABLE_BIKES = gql`
  query AvialableBikes {
    availableBikes {
      id
      name
      type
      location {
        lat
        lng
      }
    }
  }
`;
