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
  Card,
  Grid,
  Row
} from "native-base";
import { StoreProps, connection } from "../store";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import {
  AvialableBikesComponent,
  useAvialableBikesQuery
} from "../generated/graphql";
import BikeMarkers from "./sub-components/bike-markers";
import NavigationService from "../NavigationService";
import React from "react";
class UserScreenState {}
class UserScreen extends React.Component<StoreProps, UserScreenState> {
  constructor(props) {
    super(props);
    this.state = new UserScreenState();
  }
  static navigationOptions = {
    headerTitle: "User Info",
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
          alignItems: "stretch",
          justifyContent: "flex-start",
          width: "100%"
        }}
      >
        <Card>
          <CardItem header bordered>
            <Text>You are logged in as: {this.props.user.username}</Text>
          </CardItem>
          <CardItem>
            <Text>
              Full name: {this.props.user.first_name}{" "}
              {this.props.user.last_name}
            </Text>
          </CardItem>
          <CardItem>
            <Text>
              E-Mail: {this.props.user.email}{" "}
              {this.props.user.email_verified ? (
                <Icon name="checkmark"></Icon>
              ) : (
                <Text style={{ color: "darkred" }}>
                  Please check your email!
                </Text>
              )}
            </Text>
          </CardItem>
          <CardItem>
            <Button iconLeft light onPress={this.props.logOut}>
              <Icon name="log-out" />
              <Text>Log Out</Text>
            </Button>
          </CardItem>
          <CardItem footer bordered>
            <Text></Text>
          </CardItem>
        </Card>
      </View>
    );
  }
}
export default connection(UserScreen);
