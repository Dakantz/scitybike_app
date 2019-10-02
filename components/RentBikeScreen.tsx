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
class RentBikeScreenState {}

class RentBikeScree extends React.Component<StoreProps, RentBikeScreenState> {
  constructor(props) {
    super(props);
    this.state = new RentBikeScreenState();
  }
  static navigationOptions = {
    headerTitle: "Rent..."
  };
  render() {
    let navigation = this.props.navigation;
    let bike: Bike = {
      id: navigation.getParam("id"),
      name: navigation.getParam("name"),
      type: navigation.getParam("type")
    };
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Text>Rent bike: {bike.name}</Text>
        <Text>Type: {bike.type}</Text>{" "}
        <Button iconLeft light onPress={this.props.logOut}>
          <Icon name="log-out" />
          <Text>🚲 Rent me!</Text>
        </Button>
      </View>
    );
  }
}
export default connection(RentBikeScree);
