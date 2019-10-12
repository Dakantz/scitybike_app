import Constants from "expo-constants";
import ApolloClient, {
  HttpLink,
  IntrospectionFragmentMatcher,
  InMemoryCache
} from "apollo-boost";
import Auth0 from "react-native-auth0";

class Auth0Info {
  client: Auth0;
  connection: string;
  constructor() {
    this.client = new Auth0({
      domain: Constants.manifest.extra.auth0.domain,
      clientId: Constants.manifest.extra.auth0.clientId
    });
    this.connection = Constants.manifest.extra.auth0.connection;
  }
}
import introspectionResult from "../generated/graphql";

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: introspectionResult
});
const cache = new InMemoryCache({
  fragmentMatcher
});
let headers: any = {};
let apolloClient = new ApolloClient({
  uri: Constants.manifest.extra.api_host,
  cache,
  headers
});
function setToken(token: string) {
  console.log("Set token to:", token);
  headers.authorization = `Bearer ${token}`;
}

// async function askForLocationPermission() {
//   console.log("Asking 4 location permission:");
// }
let auth0 = new Auth0Info();
async function asyncForeach<T>(
  arr: T[],
  callback: (element: T, idx?: number, array?: T[]) => Promise<any>
) {
  for (var i = 0; i < arr.length; i++) {
    await callback(arr[i], i, arr);
  }
}
export { apolloClient, setToken, auth0,asyncForeach };
