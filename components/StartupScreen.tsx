import React from "react";
import { Container, Text, Header, Content, Spinner } from "native-base";
import { connection, StoreProps } from "../store";
class StartupScreenState {}
export default class Startupscreen extends React.Component<
  StoreProps,
  StartupScreenState
> {
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
      <Container>
        <Header />
        <Content>
          <Spinner color="blue" />
          <Text>Trying to log you in from a previous session...</Text>
        </Content>
      </Container>
    );
  }
}
