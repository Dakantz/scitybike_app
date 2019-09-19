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
import { StoreProps, connection } from "../store";
class LoginState {
  signup? = true;
  username?: string;
  email?: string;
  first_name?: string;

  last_name?: string;
  password?: string;
  constructor() {}
}

class LoginSignupScreen extends React.Component<StoreProps, LoginState> {
  constructor(props) {
    super(props);
    this.state = {};
  }
  public componentDidMount() {}
  public onChangeUserName = username => {
    this.setState({ username });
  };
  public onChangeFirstName = first_name => {
    this.setState({ first_name });
  };
  public onChangeLastName = last_name => {
    this.setState({ last_name });
  };
  public onChangeEmail = email => {
    this.setState({ email });
  };
  public onChangePassword = password => {
    this.setState({ password });
  };
  public toggleSignup = () => {
    this.setState({ signup: !this.state.signup });
  };
  public submit = () => {
    if (this.state.signup) {
      this.props.createUser(
        this.state.username,
        this.state.email,
        this.state.first_name,
        this.state.last_name,
        this.state.password
      );
    } else {
      this.props.login(this.state.username, this.state.password);
    }
  };
  render() {
    return (
      <Container>
        <Header />
        <Content>
          <Form>
            <Item fixedLabel>
              <Label>Username</Label>
              <Input onChangeText={this.onChangeUserName} />
            </Item>
            {this.state.signup && (
              <React.Fragment>
                <Item fixedLabel>
                  <Label>E-Mail</Label>
                  <Input onChangeText={this.onChangeEmail} />
                </Item>
                <Item fixedLabel>
                  <Label>First Name</Label>
                  <Input onChangeText={this.onChangeFirstName} />
                </Item>
                <Item fixedLabel>
                  <Label>Last Name</Label>
                  <Input onChangeText={this.onChangeLastName} />
                </Item>
              </React.Fragment>
            )}
            <Item fixedLabel last>
              <Label>Password</Label>
              <Input onChangeText={this.onChangePassword} />
            </Item>
            <Grid>
              <Col style={{ height: 100 }}>
                <Button primary onPress={this.submit}>
                  <Text> {this.state.signup ? "Sign Up!" : "Login"} </Text>
                </Button>
              </Col>
              <Col style={{ height: 100 }}>
                <Button transparent onPress={this.toggleSignup}>
                  <Text>
                    {this.state.signup ? "Login" : "Sign up"} instead...
                  </Text>
                </Button>
              </Col>
            </Grid>
          </Form>
        </Content>
      </Container>
    );
  }
}
export default connection(LoginSignupScreen);
