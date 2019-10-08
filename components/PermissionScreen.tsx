import React from "react";
import {
  Container,
  Text,
  Header,
  Content,
  View,
  Image,
  Button,
  Icon
} from "native-base";
import { StoreProps, connection } from "../store";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import {
  AvialableBikesComponent,
  useAvialableBikesQuery,
  Bike
} from "../generated/graphql";
import BikeMarkers from "./sub-components/bike-markers";
import NavigationService from "../NavigationService";
class  PermissionScreenState {}

class PermissionScreen extends React.Component<StoreProps, PermissionScreenState> {
  constructor(props) {
    super(props);
    this.state = new PermissionScreenState();
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Text>Please enable Location for this App to use it!</Text>
        <Text>We need it to track the bikes location!</Text>
        <Button onPress={this.props.requestPermission}>
          <Text>💩🚲 Locate me!</Text>
        </Button>
      </View>
    );
  }
}
export default connection(PermissionScreen);
