import { UserActionTypes,UserActions ,UserState} from "./types";

const initialState = new UserState();

export function userReducer(
  state = initialState,
  action: UserActionTypes
): UserState {
  switch (action.type) {
    case UserActions.LOGIN: {

    }
    case UserActions.SIGNUP: {
        
    }
    default:
      return state;
  }
}
