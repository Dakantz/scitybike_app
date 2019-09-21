import React from "react";
import { Container, Text, Header, Content, View } from "native-base";
import { StoreProps, connection } from "../store";
class MapScreenState {}
class MapScreen extends React.Component<StoreProps, MapScreenState> {
  constructor(props) {
    super(props);
    this.state = new MapScreenState();
  }
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>
          Hi! you are logged in as:
          {this.props.user.username}
          with token:
          {this.props.user.token}
        </Text>
      </View>
    );
  }
}
export default connection(MapScreen);
