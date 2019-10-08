import React from "react";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createStackNavigator } from "react-navigation-stack";
import LoginSignupScreen from "./components/LoginSignupScreen";
import MapScreen from "./components/MapScreen";
import { configureStore } from "./store";
import { Provider } from "react-redux";
import Startupscreen from "./components/StartupScreen";
import NavigationService from "./NavigationService";
import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks";
import { apolloClient } from "./helpers";
import UserScreen from "./components/UserScreen";
import RentBikeScreen from "./components/RentBikeScreen";
import PermissionScreen from "./components/PermissionScreen";
class AppState {
  isReady = false;
}
const MapStack = createStackNavigator(
  {
    Main: MapScreen,
    RentBike: RentBikeScreen
  },
  {
    initialRouteName: "Main"
  }
);

const UserStack = createStackNavigator(
    {
      Main: UserScreen
    },
    {
      initialRouteName: "Main"
    }
  );
const AppNavigator = createDrawerNavigator(
  {
    /*
     * Rather than being rendered by a screen component, the
     * AuthenticationNavigator is a screen component
     */
    Map: MapStack,
    User: UserStack
  },
  {
    initialRouteName: "Map",

  }
);
const AuthenticationNavigator = createSwitchNavigator(
  {
    Signin: LoginSignupScreen,
    Startup: Startupscreen,
    Permissions: PermissionScreen,
    Home: AppNavigator
    //TODO ForgotPassword: ForgotPasswordScreen,
  },
  {
    initialRouteName: "Startup"
  }
);

const AppContainer = createAppContainer(AuthenticationNavigator);
const store = configureStore();
export default class App extends React.Component<{}, AppState> {
  constructor(props) {
    super(props);
    this.state = new AppState();
  }

  async componentDidMount() {
    console.log("Starting Scity.Bike App!");

    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }
    return (
      <ApolloProvider client={apolloClient}>
        <ApolloHooksProvider client={apolloClient}>
          <Provider store={store} con>
            <AppContainer
              ref={navigatorRef => {
                NavigationService.setTopLevelNavigator(navigatorRef);
              }}
            />
          </Provider>
        </ApolloHooksProvider>
      </ApolloProvider>
    );
  }
}
