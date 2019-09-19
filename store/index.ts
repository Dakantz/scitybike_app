import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { userReducer } from "./user";
import { connect } from "react-redux";
import {
  relogin as reloginD,
  createUser as createUserD,
  login as loginD
} from "./user/types";
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
    public login = login,
    public createUser = createUserD
  ) {}
}
const allDispatchers = new AllDispatch();
const mapDispatchToProps = dispatch => {
  let obj: any = {};
  for (const key in allDispatchers) {
    if (allDispatchers.hasOwnProperty(key)) {
      const dispatcher = AllDispatch[key];
      obj[key] = (...args) => dispatch(dispatcher(...args));
    }
  }
  return obj;
};
type AppState = ReturnType<typeof rootReducer>;
type StoreProps = AppState & AllDispatch;
let connection: StoreProps = connect(
  state => state,
  mapDispatchToProps
);
export { connection, StoreProps };
