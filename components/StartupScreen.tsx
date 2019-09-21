import React from "react";
import { Container, Text, Header, Content, Spinner, View } from "native-base";
import { connection, StoreProps } from "../store";
class StartupScreenState {}
class Startupscreen extends React.Component<StoreProps, StartupScreenState> {
  constructor(props) {
    super(props);
    this.state = new StartupScreenState();
  }

  submit() {}
  componentDidMount() {
    this.props.relogin();
  }
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Spinner color="blue" />
        <Text>Trying to log you in from a previous session...</Text>
        <Text>{this.props.user.lastError}</Text>
      </View>
    );
  }
}
export default connection(Startupscreen);
