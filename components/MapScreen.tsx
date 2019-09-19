import React from "react";
import {
  Container,
  Text,
  Header,
  Content,
  Form,
  Item,
  Label,
  Input,
  Button,
  Grid,
  Col
} from "native-base";
import {  StoreProps } from "../store";
class MapScreenState {}
export default class MapScreen extends React.Component<
  StoreProps,
  MapScreenState
> {
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
