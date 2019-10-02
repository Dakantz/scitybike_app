import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { userReducer } from "./user";
import { connect } from "react-redux";
import {
  relogin as reloginD,
  createUser as createUserD,
  login as loginD,
  logOut as logOutD
} from "./user/types";
import { NavigationProp, NavigationParams, NavigationContainerProps } from "react-navigation";
const rootReducer = combineReducers({
  user: userReducer
});

export function configureStore() {
  const middlewares = [thunkMiddleware];
  const middleWareEnhancer = applyMiddleware(...middlewares);

  const store = createStore(
    rootReducer,
    composeWithDevTools(middleWareEnhancer)
  );

  return store;
}
class AllDispatch {
  constructor(
    public relogin = reloginD,
    public login = loginD,
    public createUser = createUserD,
    public logOut= logOutD
  ) {}
}
const allDispatchers = new AllDispatch();
const mapDispatchToProps = dispatch => {
  let obj: any = {};
  for (const key in allDispatchers) {
    if (allDispatchers.hasOwnProperty(key)) {
      const dispatcher = allDispatchers[key];
      obj[key] = (...args) => {
        if (args && args.length > 0) dispatch(dispatcher(...args));
        else dispatch(dispatcher());
      };
    }
  }
  return obj;
};
type AppState = ReturnType<typeof rootReducer>;
type StoreProps = AppState & AllDispatch & NavigationContainerProps;
let connection = connect(
  state => state,
  mapDispatchToProps
);

export { StoreProps, connection };
