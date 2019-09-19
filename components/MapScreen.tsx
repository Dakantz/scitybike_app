import React from "react";
import {
  Container,
  Text,
  Header,
  Content,
} from "native-base";
import { StoreProps, connection } from "../store";
class MapScreenState {}
class MapScreen extends React.Component<StoreProps, MapScreenState> {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = new MapScreenState();
  }
  render() {
    return (
      <Container>
        <Header />
        <Content>
          <Text>
            Hi! you are logged in as:
            {this.props.user.username}
            with token:
            {this.props.user.token}
          </Text>
        </Content>
      </Container>
    );
  }
}
export default connection(MapScreen);
