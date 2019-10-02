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
export const RENT_BIKE = gql`mutation RentBike($rentalInfo:StartRentBikeInput!){
    rentBike(info:$rentalInfo) {
      ... on BikeRentFailure {
        code
        message
      }
      ... on BikeRentOk {
        id
        message
        bike {
          id
          name
          type
          pin
        }
      }
    }
  }
  `;
export const UPDATE_RENTAL = gql`
  mutation UpdateBike($updateData: BikeRentUpdateInput!) {
    updateBikeRental(info: $updateData) {
      ... on BikeUpdateFailure {
        message
      }
      ... on BikeUpdateOk {
        message
        bike {
          id
        }
      }
    }
  }
`;
export const MY_RENTALS = gql`
  query MyRentals($showAll: Boolean!) {
    rentals(showAll: $showAll) {
      id
      startedAt
      finishedAt
      bike {
        id
        name
        type
        pin
      }
      locations {
        lat
        lng
      }
      finished
    }
  }
`;
export const RETURN_BIKE = gql`
  mutation ReturnBike($endInfo: BikeRentUpdateInput!) {
    endBikeRental(info: $endInfo) {
      ... on BikeUpdateFailure {
        message
      }
      ... on BikeUpdateOk {
        message
        bike {
          id
        }
      }
    }
  }
`;
