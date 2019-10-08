import {
  Container,
  Text,
  Header,
  Content,
  View,
  Image,
  Button,
  Icon,
  CardItem,
  Body,
  Card
} from "native-base";
import { StoreProps, connection } from "../store";
import MapView, { PROVIDER_GOOGLE, Polyline } from "react-native-maps";
import {
  AvialableBikesComponent,
  useAvialableBikesQuery
} from "../generated/graphql";
import BikeMarkers from "./sub-components/bike-markers";
import NavigationService from "../NavigationService";
import React from "react";
import moment from "moment";
import { FlatList } from "react-native";
const LNG_PADDING = 0.005;
const LAT_PADDING = 0.0025;
class RentalsScreenState {}
class RentalsScreen extends React.Component<StoreProps, RentalsScreenState> {
  constructor(props) {
    super(props);
    this.state = new RentalsScreenState();
  }
  oldBikes = [];
  key = 0;
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "My Rentals 🚲",
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
  };
  componentDidMount() {
    this._refresh();
    //setInterval(this._refresh(), 300000);
  }
  _refresh = () => {
    console.log("refreshing...");
    this.props.fetchAllRentals();
  };
  render() {
    console.log(
      "List should update:",
      this.oldBikes !== this.props.bike.rentedBikes
    );
    this.oldBikes = this.props.bike.rentedBikes;
    this.key++;

    let loading =
      this.props.bike.loadingRentalHistory || this.props.bike.loadingRented;
    return (
      <FlatList
        extraData={this.key}
        onRefresh={this._refresh}
        keyExtractor={item => item.id}
        data={[
          ...this.props.bike.rentedBikes,
          ...this.props.bike.rentalHistory
        ]}
        refreshing={loading}
        ListEmptyComponent={
          <>
            {!loading && (
              <Text>
                You don't have any rentals in your history- if you want to rent
                a bike go to the map!
              </Text>
            )}
          </>
        }
        renderItem={rentalData => {
          let rental = rentalData.item;
          let minLat = Infinity,
            minLng = Infinity,
            maxLat = 0,
            maxLng = 0;
          let polyline = rental.locations.map(location => {
            if (location.lat < minLat) minLat = location.lat;
            if (location.lat > maxLat) maxLat = location.lat;
            if (location.lng < minLng) minLng = location.lng;
            if (location.lng > maxLng) maxLng = location.lng;
            return {
              latitude: location.lat,
              longitude: location.lng
            };
          });
          minLng -= LNG_PADDING;
          maxLng += LNG_PADDING;
          minLat -= LAT_PADDING;
          maxLat += LAT_PADDING;
          console.log(rental.finishedAt);
          return (
            <Card>
              <CardItem header bordered>
                <Text>Rental ID: {rental.id}</Text>
              </CardItem>
              <CardItem bordered>
                <Body>
                  <Text>Name: {rental.bike.name}</Text>
                  <Text>Type: {rental.bike.type}</Text>

                  <View
                    style={{
                      width: 350,
                      height: 200
                    }}
                  >
                    <MapView
                      style={{
                        flex: 1
                      }}
                      provider={PROVIDER_GOOGLE}
                      region={{
                        latitude: (minLat + maxLat) / 2,
                        longitude: (maxLng + minLng) / 2,
                        latitudeDelta: Math.abs(minLat - maxLat),
                        longitudeDelta: Math.abs(minLng - maxLng)
                      }}
                    >
                      <Polyline
                        coordinates={polyline}
                        strokeWidth={5}
                        strokeColor={"blue"}
                        lineCap="round"
                      ></Polyline>
                    </MapView>
                  </View>

                  {!rental.finished && (
                    <Button
                      iconLeft
                      light
                      onPress={() => this.props.returnBike(rental.id)}
                    >
                      <Icon name="log-out" />
                      <Text>Return Bike</Text>
                    </Button>
                  )}
                </Body>
              </CardItem>
              <CardItem footer bordered>
                {rental.finished ? (
                  <Text>
                    Rental finished{" "}
                    {moment(new Date(parseInt(rental.finishedAt))).fromNow()}
                  </Text>
                ) : (
                  <>
                    <Text>
                      Bike activated{" "}
                      {moment(new Date(parseInt(rental.startedAt))).fromNow()}
                      {"/"}
                      Your PIN is: {rental.bike.pin}
                    </Text>
                  </>
                )}
              </CardItem>
            </Card>
          );
        }}
      />
    );
  }
}
export default connection(RentalsScreen);
