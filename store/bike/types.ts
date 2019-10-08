// Describing the shape of the system's slice of state
import { ApolloClient, FetchType, FetchPolicy } from "apollo-boost";
import { apolloClient } from "../../helpers";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import {
  Bike,
  RentBikeMutation,
  RentBikeDocument,
  RentBikeMutationVariables,
  MyRentalsQuery,
  MyRentalsQueryVariables,
  MyRentalsDocument,
  BikeRental,
  ReturnBikeMutation,
  ReturnBikeMutationVariables,
  ReturnBikeDocument
} from "../../generated/graphql";
import NavigationService from "../../NavigationService";
import * as Location from "expo-location";
import { BikeUpdater } from "../../tasks/bike-update";
export enum RentState {
  NONE,
  SUCCESS,
  LOADING,
  ERROR
}
export enum ReturnState {
  NONE,
  RETURNING,
  SUCCESS,
  ERROR
}
export const bikeUpdater = new BikeUpdater();
export class BikeRentalLocal implements BikeRental {
  __typename?: "BikeRental";
  id: string;
  startedAt: string;
  finishedAt?: string;
  bike: Bike;
  locations: import("../../generated/graphql").GeoPoint[];
  finished: boolean;
  returnError?: string;
  returnState = ReturnState.NONE;
  constructor(rental?: Partial<BikeRental>) {
    if (rental) this.applyRental(rental);
  }
  applyRental(rental: Partial<BikeRental>) {
    for (const key in rental) {
      if (rental.hasOwnProperty(key)) {
        const element = rental[key];
        this[key] = element;
      }
    }
  }
}
export class BikesState {
  loadingRented: boolean = false;
  loadingRentalHistory: boolean = false;
  rentState = RentState.NONE;
  lastError: string = "";
  didOpenBike: boolean = false;
  locationError = false;
  openedBike?: Bike = null;
  rentedBikes: BikeRentalLocal[] = [];
  rentalHistory: BikeRental[] = [];
  client: ApolloClient<unknown>;
  constructor() {
    this.client = apolloClient;
  }
}
export enum BikeActions {
  SET_PROPS,
  UPDATE_BIKES,
  UPDATE_RENTAL
}

export const setProps = (props: Partial<BikesState>): BikeActionDefs => {
  return { type: BikeActions.SET_PROPS, props };
};
export const addRentedBikes = (...bikes: BikeRental[]): BikeActionDefs => {
  return { type: BikeActions.UPDATE_BIKES, bikesToAdd: bikes };
};
export const removeRentedBikes = (
  ...bikes: RartialButIdRental[]
): BikeActionDefs => {
  return { type: BikeActions.UPDATE_BIKES, bikesToRemove: bikes };
};
export type RartialButIdRental = Partial<BikeRentalLocal> &
  Pick<BikeRentalLocal, "id">;
export const updateRental = (rental: RartialButIdRental): BikeActionDefs => {
  return { type: BikeActions.UPDATE_RENTAL, rentalToUpdate: rental };
};
export const openBike = (bike: Bike): BikeActionDefs => {
  return setProps({
    openedBike: bike,
    didOpenBike: true
  });
};
export const fetchAllRentals = function(): ThunkAction<
  Promise<void>,
  {},
  {},
  AnyAction
> {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    try {
      dispatch(fetchOpenRentals());
      dispatch(fetchRentalHistory());
    } catch (e) {
      console.log("Error dispatching:", e);
    }
  };
};
export const fetchOpenRentals = function(): ThunkAction<
  Promise<void>,
  {},
  {},
  AnyAction
> {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    try {
      dispatch(setProps({ loadingRented: true }));
      let rentals = await apolloClient.query<
        MyRentalsQuery,
        MyRentalsQueryVariables
      >({
        query: MyRentalsDocument,
        variables: {
          showAll: false
        },
        fetchPolicy: "no-cache"
      });
      await bikeUpdater.addBikeToWatch(
        ...rentals.data.rentals
          .filter(rentals => !rentals.finished)
          .map(rental => parseInt(rental.id))
      );
      console.log(
        "Fetched rented bikes: " + rentals.data.rentals.map(b => b.id).join(",")
      );
      dispatch(addRentedBikes(...rentals.data.rentals));
    } catch (e) {
      console.log("Error fetching bikes: " + e);
    }

    dispatch(setProps({ loadingRented: false }));
  };
};

export const fetchRentalHistory = function(): ThunkAction<
  Promise<void>,
  {},
  {},
  AnyAction
> {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch(setProps({ loadingRentalHistory: true }));
    try {
      let rentals = await apolloClient.query<
        MyRentalsQuery,
        MyRentalsQueryVariables
      >({
        query: MyRentalsDocument,
        variables: {
          showAll: true
        },
        fetchPolicy: "no-cache"
      });
      dispatch(
        setProps({
          rentalHistory: rentals.data.rentals.filter(r => r.finished)
        })
      );
    } catch (e) {
      console.log("Error fetching bikes: " + e);
    }
    dispatch(setProps({ loadingRentalHistory: false }));
  };
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
          await bikeUpdater.addBikeToWatch(
            parseInt(fetchResult.data.rentBike.id)
          );
          dispatch(fetchOpenRentals());
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

export const returnBike = function(
  id: string
): ThunkAction<Promise<void>, {}, {}, AnyAction> {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    try {
      dispatch(updateRental({ id, returnState: ReturnState.RETURNING }));
      let location = await Location.getCurrentPositionAsync({});
      let returnResult = await apolloClient.mutate<
        ReturnBikeMutation,
        ReturnBikeMutationVariables
      >({
        mutation: ReturnBikeDocument,
        variables: {
          endInfo: {
            rentalId: parseInt(id),
            lat: location.coords.latitude,
            lng: location.coords.longitude
          }
        }
      });
      console.log("Return result:", returnResult.data);
      switch (returnResult.data.endBikeRental.__typename) {
        case "BikeUpdateOk":
          await bikeUpdater.removeBikeToWatch(parseInt(id));
          dispatch(removeRentedBikes({ id }));
          dispatch(fetchRentalHistory());

          break;
        case "BikeUpdateFailure":
          dispatch(
            updateRental({
              id,
              returnState: ReturnState.ERROR,
              returnError:
                "Error returing bike: " +
                returnResult.data.endBikeRental.message
            })
          );
          break;
      }
    } catch (e) {
      console.log("Error returning bike: ", e);
      dispatch(
        updateRental({
          id,
          returnState: ReturnState.ERROR,
          returnError: "Error returing bike: " + e.message
        })
      );
    }
  };
};
export type BikeActionDefs = {
  type: BikeActions;
  props?: Partial<BikesState>;
  bikesToAdd?: RartialButIdRental[];
  bikesToRemove?: RartialButIdRental[];
  rentalToUpdate?: RartialButIdRental;
};
