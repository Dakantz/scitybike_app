import React from "react";
import { Container, Text, Header, Content, Spinner, View } from "native-base";
import { connection, StoreProps } from "../store";
import NavigationService from "../NavigationService";
class AGBScreenScreenState {}
class AGBScreen extends React.Component<StoreProps, AGBScreenScreenState> {
  constructor(props) {
    super(props);
    this.state = new AGBScreenScreenState();
  }

  return() {
    NavigationService.navigate("Startup")
  }
  render() {
    return (
      <View style={{ flex: 1, alignItems: "stretch", justifyContent: "flex-start" }}>
      </View>
    );
  }
}
export default connection(AGBScreen);
