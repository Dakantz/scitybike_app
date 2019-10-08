// Describing the shape of the system's slice of state
import { ApolloClient } from "apollo-boost";
import { apolloClient } from "../../helpers";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import {
  Bike,
  RentBikeMutation,
  RentBikeDocument,
  RentBikeMutationVariables
} from "../../generated/graphql";
import NavigationService from "../../NavigationService";
import * as Location from "expo-location";
export enum RentState {
  NONE,
  SUCCESS,
  LOADING,
  ERROR
}
export class BikesState {
  loadingRented: boolean = false;
  loadingRentalHistory: boolean = false;
  rentState = RentState.NONE;
  lastError: string = "";
  didOpenBike: boolean = false;
  locationError = false;
  openedBike?: Bike = null;
  rentedBikes: Bike[] = [];
  rentalHistory: Bike[] = [];
  client: ApolloClient<unknown>;
  constructor() {
    this.client = apolloClient;
  }
}
export enum BikeActions {
  SET_PROPS
}

export const setProps = (props: Partial<BikesState>): BikeActionDefs => {
  return { type: BikeActions.SET_PROPS, props };
};
export const openBike = (bike: Bike): BikeActionDefs => {
  return setProps({
    openedBike: bike,
    didOpenBike: true
  });
};

export const rentBike = function(
  id: number
): ThunkAction<Promise<void>, {}, {}, AnyAction> {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    try {
      dispatch(
        setProps({
          rentState: RentState.LOADING
        })
      );
      let location = await Location.getCurrentPositionAsync({});
      let fetchResult = await apolloClient.mutate<
        RentBikeMutation,
        RentBikeMutationVariables
      >({
        mutation: RentBikeDocument,
        variables: {
          rentalInfo: {
            bike_id: id,
            start_lat: location.coords.latitude,
            start_lng: location.coords.longitude
          }
        }
      });
      console.log("Rental result:", fetchResult.data);
      switch (fetchResult.data.rentBike.__typename) {
        case "BikeRentOk":
          dispatch(
            setProps({
              rentState: RentState.SUCCESS
            })
          );
          break;
        case "BikeRentFailure":
          setProps({
            rentState: RentState.ERROR,
            lastError:
              "Error renting bike: " + fetchResult.data.rentBike.message
          });
          break;
      }
    } catch (e) {
      console.log("Error renting bike: ", e);

      setProps({
        rentState: RentState.ERROR,
        lastError: "Error renting bike: " + e.message
      });
    }
  };
};

export type BikeActionDefs = { type: BikeActions; props: Partial<BikesState> };


