import React from "react";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import LoginSignupScreen from "./components/LoginSignupScreen";
import MapScreen from "./components/MapScreen";
import { configureStore } from "./store";
import { Provider } from "react-redux";
import Startupscreen from "./components/StartupScreen";
import NavigationService from "./NavigationService";
class AppState {
  isReady = false;
}

const AuthenticationNavigator = createSwitchNavigator(
    {
      Signin: LoginSignupScreen,
      Startup: Startupscreen
      //TODO ForgotPassword: ForgotPasswordScreen,
    },
    {
      initialRouteName: "Startup"
    }
  );
const AppNavigator = createStackNavigator(
  {
    /*
     * Rather than being rendered by a screen component, the
     * AuthenticationNavigator is a screen component
     */
    Map: MapScreen,
    Auth:AuthenticationNavigator
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
      <Provider store={store} con>
        <AppContainer
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
      </Provider>
    );
  }
}
