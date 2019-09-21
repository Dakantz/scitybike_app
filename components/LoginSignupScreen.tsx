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
  Col,
  Left,
  Title,
  Body,
  Right,
  View,
  Icon
} from "native-base";
import { StoreProps, connection } from "../store";
import { NavigationInjectedProps } from "react-navigation";
class LoginState {
  signup? = true;
  username?: string = "benedikt3";
  email?: string = "bene.kantz3@gmail.com";
  first_name?: string = "Benedikt";

  last_name?: string = "Kantz";
  password?: string = "Bene220000";
  constructor() {}
}

class LoginSignupScreen extends React.Component<
  StoreProps & NavigationInjectedProps,
  LoginState
> {
  constructor(props) {
    super(props);
    this.state = {};
  }
  public componentDidMount = () => {
    console.log(this.state);
    this.setState({ ...new LoginState() });
  };
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
    let signup = !this.state.signup;
    this.props.navigation.setParams({ signup });
    this.setState({ signup });
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
      this.props.login(this.state.email , this.state.password);
    }
  };
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: navigation.getParam("signup") ? "Sign Up!" : "Login"
    };
  };
  render() {
    console.log(this.state);
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Form>
          <Item stackedLabel>
            <Label>E-Mail</Label>
            <Input
              onChangeText={this.onChangeEmail}
              autoCompleteType="email"
              autoCapitalize="none"
            />
          </Item>
          {this.state.signup && (
            <React.Fragment>
              <Item stackedLabel>
                <Label>Username</Label>
                <Input
                  onChangeText={this.onChangeUserName}
                  autoCompleteType="username"
                  autoCapitalize="none"
                />
              </Item>
              <Item stackedLabel>
                <Label>First Name</Label>
                <Input
                  onChangeText={this.onChangeFirstName}
                  autoCompleteType="name"
                />
              </Item>
              <Item stackedLabel>
                <Label>Last Name</Label>
                <Input onChangeText={this.onChangeLastName} />
              </Item>
            </React.Fragment>
          )}
          <Item stackedLabel>
            <Label>Password</Label>
            <Input
              onChangeText={this.onChangePassword}
              autoCompleteType="password"
              secureTextEntry={true}
              autoCapitalize="none"
            />
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
      </View>
    );
  }
}
export default connection(LoginSignupScreen);
