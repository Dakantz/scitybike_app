import { BikeActionDefs, BikeActions, BikesState } from "./types";
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
    default:
      return state;
  }
}
