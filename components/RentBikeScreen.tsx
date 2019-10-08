import React from "react";
import {
  Container,
  Text,
  Header,
  Content,
  View,
  Image,
  Button,
  Icon,
  Spinner
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
import { RentState } from "../store/bike/types";
class RentBikeScreenState {}

class RentBikeScree extends React.Component<StoreProps, RentBikeScreenState> {
  constructor(props) {
    super(props);
    this.state = new RentBikeScreenState();
  }
  static navigationOptions = {
    headerTitle: "Rent..."
  };
  rentBike() {}
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
        <Text>Type: {bike.type}</Text>
        <Button onPress={() => this.props.rentBike(parseInt(bike.id))}>
          <Text>🚲 Rent me!</Text>
        </Button>
        {this.props.bike.rentState == RentState.LOADING && (
          <Spinner color="blue"></Spinner>
        )}
        {this.props.bike.rentState == RentState.ERROR && (
          <Text
            style={{
              color: "darkred"
            }}
          >
            {this.props.bike.lastError}
          </Text>
        )}
        {this.props.bike.rentState == RentState.SUCCESS && (
          <Text
          >
            Successful!
            Your 
          </Text>
        )}
      </View>
    );
  }
}
export default connection(RentBikeScree);
