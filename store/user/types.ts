// Describing the shape of the system's slice of state
import { ApolloClient } from "apollo-boost";
import { apolloClient, auth0, setToken } from "../../helpers";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import * as SecureStore from "expo-secure-store";
import { AnyAction } from "redux";
import jwt_decode from "jwt-decode";
import { NavigationActions } from "react-navigation";
import {
  CreateUserDocument,
  UserCreateResult,
  CreateUserInput,
  UserCreateError,
  User,
  MeDocument,
  UserResult
} from "../../generated/graphql";
import NavigationService from "../../NavigationService";
export class UserState {
  loggedIn: boolean = false;
  loggingIn: boolean = false;
  signingUp: boolean = false;
  loginFailed: boolean = false;
  signupFailed: boolean = false;
  lastError: string;
  token: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  client: ApolloClient<unknown>;
  constructor() {
    this.client = apolloClient;
  }
}
export enum UserActions {
  SET_PROPS
}

export const setProps = (
  props: Partial<UserState>
): { type: UserActions; props: Partial<UserState> } => {
  return { type: UserActions.SET_PROPS, props };
};
export const setTokenState = function(
  token: string
): ThunkAction<Promise<void>, {}, {}, AnyAction> {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    try {
      await SecureStore.setItemAsync("token", token);
      setToken(token);
      let data = jwt_decode(token);
      dispatch(
        setProps({
          ...data
        })
      );
    } catch (e) {}
  };
};

export const login = function(
  username: string,
  password: string
): ThunkAction<Promise<void>, {}, {}, AnyAction> {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    try {
      console.log("Login!");
      dispatch(setProps({ loggingIn: true }));
      await SecureStore.setItemAsync("username", username);
      await SecureStore.setItemAsync("password", password);
      let result = await auth0.client.auth.passwordRealm({
        username,
        password,
        realm: auth0.connection
      });
      dispatch(setTokenState(result.token));
      dispatch(
        setProps({
          token: result.token,
          loggedIn: true,
          signupFailed: false,
          loginFailed: false
        })
      );
      NavigationService.navigate("Map");
    } catch (e) {
      dispatch(
        setProps({
          loggingIn: false,
          loginFailed: true,
          lastError: "Failed to Login, reason: " + e.message
        })
      );
      console.error(e);
    }
  };
};

export const createUser = function(
  username: string,
  email: string,
  first_name: string,
  last_name: string,
  password: string
): ThunkAction<Promise<void>, {}, {}, AnyAction> {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    try {
      console.log("Creating user");
      dispatch(setProps({ signingUp: true }));
      await SecureStore.setItemAsync("username", username);
      await SecureStore.setItemAsync("password", password);
      let createResult = await apolloClient.query<
        UserCreateResult,
        { userInput: CreateUserInput }
      >({
        query: CreateUserDocument,
        variables: {
          userInput: {
            username,
            email,
            first_name,
            last_name,
            password
          }
        }
      });
      if (createResult.data.__typename == "UserCreateError") {
        throw new Error(
          "Error on Scity.Bike Backend: " +
            (createResult.data as UserCreateError).error
        );
      } else {
        let fetched_user = createResult.data as User;
        let loginResult = await auth0.client.auth.passwordRealm({
          username,
          password,
          realm: auth0.connection
        });
        dispatch(setTokenState(loginResult.token));
        dispatch(
          setProps({
            loggedIn: true,
            signupFailed: false,
            loginFailed: false
          })
        );

        NavigationService.navigate("Map");
      }
    } catch (e) {
      dispatch(
        setProps({
          signingUp: false,
          signupFailed: true,
          lastError: "Failed to Login, reason: " + e.message
        })
      );
      console.error(e);
    }
  };
};

export const relogin = function(): ThunkAction<
  Promise<void>,
  {},
  {},
  AnyAction
> {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    console.log("Relogin!");
    try {
      dispatch(setProps({ loggingIn: true }));
      let token = await SecureStore.getItemAsync("token");
      if (token) {
        setToken(token);
        let fetchResult = await apolloClient.query<UserResult>({
          query: MeDocument
        });
        if (fetchResult.data.__typename == "User") {
          dispatch(setTokenState(token));
          dispatch(
            setProps({
              loggedIn: true
            })
          );
        } else {
          let username = await SecureStore.getItemAsync("username");
          let password = await SecureStore.getItemAsync("password");
          if (!(username && password)) {
            NavigationService.navigate("Signin");
          }
          let loginResult = await auth0.client.auth.passwordRealm({
            username,
            password,
            realm: auth0.connection
          });
          dispatch(setTokenState(loginResult.token));
        }
        //If both succeeded, got to map
        NavigationService.navigate("Map");
      } else {
        console.log("Going to signin!", NavigationActions);
        NavigationService.navigate("Signin");
      }
    } catch (e) {
      NavigationService.navigate("Sigin");
      dispatch(
        setProps({
          loggedIn: false,
          loginFailed: true,
          loggingIn: false,
          lastError: "Failed to Login, reason: " + e.message
        })
      );
      console.error(e);
    }
  };
};
export type UserActionDefs = { type: UserActions; props: Partial<UserState> };
