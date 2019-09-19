import Constants from "expo-constants";
import ApolloClient, { HttpLink } from "apollo-boost";
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
let apolloClient = new ApolloClient({
  uri: Constants.manifest.extra.api_host
});
let headers: any = {};
apolloClient.link = new HttpLink({
  headers
});
function setToken(token: string) {
  headers.Authorization = `Bearer ${token}`;
}
let auth0 = new Auth0Info();
export { apolloClient, setToken, auth0 };
