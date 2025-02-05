// Describing the shape of the system's slice of state
import { ApolloClient } from "apollo-boost";
import { apolloClient, auth0, setToken } from "../../helpers";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import * as SecureStore from "expo-secure-store";
import { AnyAction } from "redux";
import jwt_decode from "jwt-decode";
import { NavigationActions } from "react-navigation";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import {
  CreateUserDocument,
  UserCreateResult,
  CreateUserInput,
  UserCreateError,
  User,
  MeDocument,
  UserResult,
  CreateUserMutation,
  MeQuery,
  CreateUserMutationVariables,
  UserCreateErrorCodes
} from "../../generated/graphql";
import NavigationService from "../../NavigationService";

export enum PermissionStates {
  NONE,
  REQUESTED,
  GRANTED,
  DENIED
}
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
  email_verified: string;
  first_name: string;
  last_name: string;
  client: ApolloClient<unknown>;
  permissionState = PermissionStates.NONE;
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
      console.log("JWT data: ", data);
      let userdata: Partial<UserState> = {
        email: data.email,
        first_name: data.given_name,
        email_verified: data.email_verified,
        username: data.nickname,
        token: token
      };
      dispatch(setProps(userdata));
    } catch (e) {
      console.log("Error parsing token: ", e);
    }
  };
};
export const doneLogin = function(): ThunkAction<
  Promise<void>,
  {},
  {},
  AnyAction
> {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    try {
      let permission = await Permissions.getAsync(Permissions.LOCATION);
      if (permission.status !== "granted") {
        NavigationService.navigate("Permissions");
      } else {
        NavigationService.navigate("Map");
      }
    } catch (e) {
      console.log("Error going to next screen:", e);
    }
  };
};
export const loginAuth0 = function(
  email: string,
  password: string
): ThunkAction<Promise<void>, {}, {}, AnyAction> {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    try {
      dispatch(
        setProps({
          loggingIn: true
        })
      );
      let loginData = {
        username: email,
        password,
        realm: auth0.connection
      };
      console.log(loginData);
      let loginResult = await auth0.client.auth.passwordRealm(loginData);
      console.log(loginResult);
      dispatch(setTokenState(loginResult.idToken));

      dispatch(
        setProps({
          loggedIn: true,
          loginFailed: false,
          signupFailed: false
        })
      );
      dispatch(doneLogin());
    } catch (e) {
      console.log("Error Logging into Auth0", e);

      NavigationService.navigate("Signin");
      dispatch(
        setProps({
          lastError: "Error logging in, wrong password/username!"
        })
      );
    }
    dispatch(
      setProps({
        loggingIn: false
      })
    );
  };
};
export const login = function(
  email: string,
  password: string
): ThunkAction<Promise<void>, {}, {}, AnyAction> {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    try {
      console.log("Login!");
      dispatch(setProps({ loggingIn: true }));
      await SecureStore.setItemAsync("email", email);
      await SecureStore.setItemAsync("password", password);
      dispatch(loginAuth0(email, password));
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
      await SecureStore.setItemAsync("email", email);
      await SecureStore.setItemAsync("password", password);

      console.log(CreateUserDocument);
      let createResult = await apolloClient.mutate<
        CreateUserMutation,
        CreateUserMutationVariables
      >({
        mutation: CreateUserDocument,
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

      console.log("Backend resp:", createResult.data);
      switch (createResult.data.createUser.__typename) {
        case "User":
          let fetched_user = createResult.data.createUser as User;

          dispatch(loginAuth0(email, password));
          break;
        case "UserCreateError":
          let readableError = "Unknown error";
          switch (createResult.data.createUser.code) {
            case UserCreateErrorCodes.PasswordToWeak:
              readableError =
                "Password too weak- please enter a passowrd containing lower case, upper case and numbers with at least 8 characters!";
              break;

            case UserCreateErrorCodes.UserExists:
              readableError =
                "The user you are trying to create exists already!";
              break;
            case UserCreateErrorCodes.Other:
              readableError =
                "There was an error in the backend: " +
                createResult.data.createUser.error;
              break;
          }
          dispatch(
            setProps({
              signingUp: false,
              signupFailed: true,
              lastError: readableError
            })
          );
          break;
      }
    } catch (e) {
      dispatch(
        setProps({
          signingUp: false,
          signupFailed: true,
          lastError: "Failed to register, reason: " + e.message
        })
      );
      console.log("Error creating user: ", e);
    }

    dispatch(setProps({ signingUp: false }));
  };
};

export const logOut = function(): ThunkAction<
  Promise<void>,
  {},
  {},
  AnyAction
> {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    console.log("Log Out!");
    try {
      await SecureStore.deleteItemAsync("username");
      await SecureStore.deleteItemAsync("password");
      await SecureStore.deleteItemAsync("token");
      dispatch(setProps({ signingUp: false }));
      NavigationService.navigate("Signin");
    } catch (e) {
      console.error("Error logging out!", e);
      dispatch(
        setProps({
          loggedIn: false,
          loginFailed: true,
          lastError: "Failed to Log Out, reason: " + e.message
        })
      );
    }

    console.log("Logged Out!");
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
        let fetchResult = await apolloClient.query<MeQuery>({
          query: MeDocument
        });
        if (fetchResult.data.me.__typename == "User") {
          dispatch(setTokenState(token));
          dispatch(
            setProps({
              loggedIn: true
            })
          );
          dispatch(doneLogin());
        } else {
          let email = await SecureStore.getItemAsync("email");
          let password = await SecureStore.getItemAsync("password");
          if (!(email && password)) {
            NavigationService.navigate("Signin");
          } else {
            dispatch(loginAuth0(email, password));
          }
        }
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
      console.error("Error loggin in!", e);
    }

    dispatch(
      setProps({
        loggedIn: false,
        loggingIn: false
      })
    );
  };
};

export const requestPermissions = function(): ThunkAction<
  Promise<void>,
  {},
  {},
  AnyAction
> {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    try {
      await Location.requestPermissionsAsync();
      setProps({ permissionState: PermissionStates.GRANTED });

      NavigationService.navigate("Map");
    } catch (e) {
      setProps({ permissionState: PermissionStates.DENIED });
      console.log(
        "User denied, permissions, just leave him hanging hahahahhaha "
      );
    }
  };
};
export type UserActionDefs = { type: UserActions; props: Partial<UserState> };
