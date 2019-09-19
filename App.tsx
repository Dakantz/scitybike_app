import React from "react";
import { AppLoading } from "expo";
import { Container, Text } from "native-base";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import LoginSignupScreen from "./components/MapScreen";
import MapScreen from "./components/MapScreen";
import { configureStore } from "./store";
import { Provider } from "react-redux";
import Startupscreen from "./components/StartupScreen";
class AppState {
  isReady = false;
}
const AuthenticationNavigator = createStackNavigator(
  {
    Signin: LoginSignupScreen,
    Startup: Startupscreen
    //TODO ForgotPassword: ForgotPasswordScreen,
  },
  {
    initialRouteName: "Startup"
  }
);

const AppNavigator = createSwitchNavigator(
  {
    /*
     * Rather than being rendered by a screen component, the
     * AuthenticationNavigator is a screen component
     */
    Auth: AuthenticationNavigator,
    Map: MapScreen
  },
  {
    initialRouteName: "Auth"
  }
);

const AppContainer = createAppContainer(AppNavigator);
const store = configureStore();
export default class App extends React.Component<{}, AppState> {
  constructor(props) {
    super(props);
    this.state = new AppState();
  }

  async componentDidMount() {
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
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}
