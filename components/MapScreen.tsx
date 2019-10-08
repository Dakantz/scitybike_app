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
  useAvialableBikesQuery
} from "../generated/graphql";
import BikeMarkers from "./sub-components/bike-markers";
import NavigationService from "../NavigationService";
class MapScreenState {}
class MapScreen extends React.Component<StoreProps, MapScreenState> {
  constructor(props) {
    super(props);
    this.state = new MapScreenState();
  }
  componentDidMount() {
    this.props.fetchOpenRentals();
  }
  static navigationOptions = {
    headerTitle: "Scity Bikes",
    headerLeft: (
      <Button
        onPress={() => NavigationService.openDrawer()}
        icon={true}
        transparent
      >
        <Icon name="menu" />
      </Button>
    )
  };
  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <View
          style={{
            width: 400,
            height: 400,
            flex: 1
          }}
        >
          <MapView
            style={{
              flex: 1
            }}
            provider={PROVIDER_GOOGLE}
            followsUserLocation={true}
            showsUserLocation={true}
            showsMyLocationButton={true}
            region={{
              latitude: 47.0576,
              longitude: 15.4669,
              latitudeDelta: 0.1,
              longitudeDelta: 0.2
            }}
          >
            <BikeMarkers></BikeMarkers>
          </MapView>
        </View>
      </View>
    );
  }
}
export default connection(MapScreen);
