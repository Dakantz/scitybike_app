import { UserActionDefs, UserActions, UserState } from "./types";
import { setToken } from "../../helpers";

const initialState = new UserState();

export function userReducer(
  state = initialState,
  action: UserActionDefs
): UserState {
  switch (action.type) {
    case UserActions.SET_PROPS: {
      return { ...state, ...action.props };
    }
    default:
      return state;
  }
}
