import * as TaskManager from "expo-task-manager";
import {
  Bike,
  LocationInput,
  UpdateRentalMutation,
  UpdateRentalMutationVariables,
  RentBikeDocument
} from "../generated/graphql";
const BIKE_TASK_NAME = "bike_location_update";
import * as Location from "expo-location";
import { asyncForeach, apolloClient } from "../helpers";
export class BikeUpdater {
  private watchedRentals: number[] = [];
  private startedLocationWatch = false;
  constructor() {
    TaskManager.defineTask(BIKE_TASK_NAME, ({ data, error }) => {
      if (error) {
        console.log("Task Error: ", error);
        // check `error.message` for more details.
        return;
      }
      let locations = (data as any).locations;
      let input_loc = locations.map(
        (loc: Location.LocationData): LocationInput => {
          return {
            lat: loc.coords.latitude,
            lng: loc.coords.longitude
          };
        }
      );
      asyncForeach(this.watchedRentals, async rental => {
        let result = await apolloClient.mutate<
          UpdateRentalMutation,
          UpdateRentalMutationVariables
        >({
          mutation: RentBikeDocument,
          variables: {
            info: {
              locations: input_loc,
              rentalId: rental
            }
          }
        });
        switch (result.data.updateBikeRental.__typename) {
          case "BikeUpdateFailure":
            console.log("Failed to update bike, will be done on next update");
            break;
          case "BikeUpdateOk":
            console.log("Bike Update succeeded", rental);
        }
      })
        .then(() => {
          console.log("Updated all watched bikes!");
        })
        .catch(e => {
          console.log("Error on updating all watched bikes", e);
        });
      console.log("Received new locations", locations);
    });
  }
  async addBikeToWatch(...bikes: number[]) {
    this.watchedRentals.push(...bikes);
    if (!this.startedLocationWatch) {
      await Location.startLocationUpdatesAsync(BIKE_TASK_NAME, {
        activityType: Location.ActivityType.OtherNavigation,
        foregroundService: {
          notificationTitle: "Scity Bikes location tracking",
          notificationBody:
            "Scity Bikes is recording your location to enable us to track the bikes location (we are sorry, but trust us- we won't do anything bad with that data)!"
        }
      });
      this.startedLocationWatch = true;
    }
  }
  async removeBikeToWatch(...bikes: number[]) {
    bikes.forEach(bike => {
      this.watchedRentals.splice(
        this.watchedRentals.findIndex(bikeWatched => bike == bikeWatched),
        1
      );
    });
    if (this.watchedRentals.length == 0) {
      await Location.stopLocationUpdatesAsync(BIKE_TASK_NAME);
    }
  }
}
