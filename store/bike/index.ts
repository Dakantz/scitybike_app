import {
  BikeActionDefs,
  BikeActions,
  BikesState,
  BikeRentalLocal
} from "./types";
import { setToken } from "../../helpers";

const initialState = new BikesState();

export function bikeReducer(
  state = initialState,
  action: BikeActionDefs
): BikesState {
  switch (action.type) {
    case BikeActions.SET_PROPS: {
      return { ...state, ...action.props };
    }
    case BikeActions.UPDATE_BIKES:
      {
        if (action.bikesToAdd)
          action.bikesToAdd.forEach(addBike => {
            if (!state.rentedBikes.find(bike => bike.id == addBike.id)) {
              console.log("Adding bike: " + addBike);
              state.rentedBikes.push(new BikeRentalLocal(addBike));
            }
          });
        if (action.bikesToRemove)
          action.bikesToRemove.forEach(remBike =>
            state.rentedBikes.splice(
              state.rentedBikes.findIndex(bike => bike.id == remBike.id),
              1
            )
          );
      }

      state.rentedBikes = [...state.rentedBikes];
    case BikeActions.UPDATE_RENTAL: {
      if (action.rentalToUpdate)
        state.rentedBikes
          .find(rented => rented.id == action.rentalToUpdate.id)
          .applyRental(action.rentalToUpdate);
    }
    default:
      return { ...state };
  }
}
