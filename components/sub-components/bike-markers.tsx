import * as React from "react";
import {
  AvialableBikesQuery,
  useAvialableBikesQuery,
  Bike
} from "../../generated/graphql";
import { Marker } from "react-native-maps";
import NavigationService from "../../NavigationService";

interface Props {}

const className = "BikeMarkers";

const BikeMarkers: React.FC<Props> = ({}) => {
  const { data, error, loading } = useAvialableBikesQuery({
    pollInterval: 100
  });
  function pressButton(bike: Bike) {
    NavigationService.navigate("RentBike", null, bike);
  }
  return (
    <>
      {data &&
        data.availableBikes.map((bike, i) => {
          return (
            <Marker
              key={i}
              coordinate={{
                latitude: bike.location.lat,
                longitude: bike.location.lng
              }}
              title={bike.name}
              description={"Typ:" + bike.type}
              onCalloutPress={() => {
                pressButton(bike);
              }}
            ></Marker>
          );
        })}
    </>
  );
};
export default BikeMarkers;
