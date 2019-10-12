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
  Icon,
  Spinner,
  Row
} from "native-base";
import { StoreProps, connection } from "../store";
import { NavigationInjectedProps } from "react-navigation";
import { HeaderTitle } from "react-navigation-stack";
class LoginState {
  signup? = true;
  username?: string = "";
  email?: string = "";
  first_name?: string = "";

  last_name?: string = "";
  password?: string = " ";
  internal_error? = "";
  constructor() {}
}
type LoginStateErrors = {
  [P in keyof LoginState]: boolean;
};

class LoginSignupScreen extends React.Component<
  StoreProps & NavigationInjectedProps,
  LoginState & { errors: LoginStateErrors }
> {
  constructor(props) {
    super(props);
    this.state = { errors: {} };
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
  private checkField(field: keyof LoginState, errors: LoginStateErrors) {
    let error =
      this.state[field] &&
      typeof this.state[field] === "string" &&
      (this.state[field] as string).length > 0;
    errors[field] = !error;
    return errors;
  }
  public submit = () => {
    let errors = this.checkField("email", this.state.errors);
    this.checkField("password", errors);

    if (this.state.signup) {
      this.checkField("username", errors);
      this.checkField("first_name", errors);
      this.checkField("last_name", errors);
    }

    let oneError = false;
    for (const key in errors) {
      if (errors.hasOwnProperty(key)) {
        if (errors[key]) {
          oneError = true;
        }
      }
    }

    this.setState({ errors });
    console.log(errors);
    if (!oneError) {
      this.setState({ internal_error: null });
      if (this.state.signup) {
        this.props.createUser(
          this.state.username,
          this.state.email,
          this.state.first_name,
          this.state.last_name,
          this.state.password
        );
      } else {
        this.props.login(this.state.email, this.state.password);
      }
    } else {
      this.setState({ internal_error: "Please check the marked fields!" });
    }
  };
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: navigation.getParam("signup") ? "Sign Up!" : "Login"
    };
  };
  render() {
    return (
      <>
        <View
          style={{
            flex: 1,
            alignItems: "stretch",
            justifyContent: "flex-start",
            paddingTop: 50
          }}
        >
          <Text style={{ textAlign: "center", paddingBottom: 30 }}>
            Sign up for some scity bikes!
          </Text>
          <Form>
            <Item error={this.state.errors.email}>
              <Input
                onChangeText={this.onChangeEmail}
                autoCompleteType="email"
                autoCapitalize="none"
                placeholder="E-Mail"
              ></Input>
            </Item>
            {this.state.signup && (
              <React.Fragment>
                <Item error={this.state.errors.username}>
                  <Input
                    onChangeText={this.onChangeUserName}
                    autoCompleteType="username"
                    autoCapitalize="none"
                    placeholder="Username"
                  ></Input>
                </Item>
                <Item error={this.state.errors.first_name}>
                  <Input
                    onChangeText={this.onChangeFirstName}
                    autoCompleteType="name"
                    placeholder="First Name"
                  ></Input>
                </Item>
                <Item error={this.state.errors.last_name}>
                  <Input
                    onChangeText={this.onChangeLastName}
                    placeholder="Last Name"
                  ></Input>
                </Item>
              </React.Fragment>
            )}
            <Item error={this.state.errors.password}>
              <Input
                onChangeText={this.onChangePassword}
                autoCompleteType="password"
                secureTextEntry={true}
                autoCapitalize="none"
                placeholder="Password"
              ></Input>
            </Item>
            <Grid style={{ padding: 10 }}>
              <Col>
                <Button primary onPress={this.submit}>
                  <Text> {this.state.signup ? "Sign Up!" : "Login"} </Text>
                </Button>
              </Col>
              <Col>
                <Button transparent onPress={this.toggleSignup}>
                  <Text>
                    {this.state.signup ? "Login" : "Sign up"} instead...
                  </Text>
                </Button>
              </Col>
            </Grid>
            <Grid style={{ paddingTop: 50 }}>
              {(this.props.user.signingUp || this.props.user.loggingIn) && (
                <Row
                  style={{
                    justifyContent: "center"
                  }}
                >
                  <Spinner color="blue" />
                </Row>
              )}

              <Row
                style={{
                  justifyContent: "flex-start", 
                  flex: 1,
                  flexBasis: 50,
                  alignItems: "stretch"
                }}
              >
                <Text style={{ color: "darkred", textAlign:"center" }}>
                  Hi123
                  {this.state.internal_error
                    ? this.state.internal_error
                    : this.props.user.lastError}
                </Text>
              </Row>
            </Grid>
          </Form>
        </View>
      </>
    );
  }
}
export default connection(LoginSignupScreen);
