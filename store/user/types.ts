// Describing the shape of the system's slice of state
import {ApolloClient} from "apollo-client";
import { InMemoryCache } from 'apollo-cache-inmemory';
export class UserState {
  loggedIn: boolean = false;
  loggingIn: boolean = false;
  signingUp: boolean = false;
  loginFailed: boolean = false;
  signupFailed: boolean = false;
  token: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  client: ApolloClient<InMemoryCache>;
  constructor(){
      
  }
}
export enum UserActions {
  LOGIN,
  SIGNUP
}
interface LoginAction {
  type: UserActions;
  payload: {
    username: string;
    password: string;
  };
}

interface SignupAction {
  type: UserActions;
  payload: {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    password: string;
  };
}
export type UserActionTypes = LoginAction | SignupAction;
