import React, { Component } from "react";
import Login from "../../components/Login/Login";
import Signup from "../../components/Signup/Signup";
import "./Authentication.css";
import { useNavigate } from "react-router-dom";
import Welcome from "../../components/Welcome/Welcome";
import { Snackbar } from "@mui/material";

const FunctionalWrapper = (Authentication) => {
  const Wrapper = (props) => {
    const navigate = useNavigate();
    return <Authentication {...props} navigate={navigate} />;
  };
  return Wrapper;
};

class Authentication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      loginOrSignup: false,
      isUserLogin: false,
      open: false,
    };
  }
  onSignup = (newUser) => {
    this.setState((prevState) => {
      return { users: [...prevState.users, newUser] };
    });
  };
  onLogin = (userInput) => {
    const validUser = this.state.users.find((user) => {
      return (
        userInput.useremail === user.useremail &&
        userInput.userpassword === user.userpassword
      );
    });
    const isUserExist = !!validUser;
    if (isUserExist) {
      this.setState({ isUserLogin: true });
      this.props.navigate(`/user${userInput.userid}`);
      localStorage.setItem("user", `user${userInput.userid}`);
    } else {
      this.setState({ open: true });
    }
  };
  loginOrSignupRequest = () => {
    this.setState((prevState) => {
      return { loginOrSignup: !prevState.loginOrSignup };
    });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  render() {
    return (
      <div className="authentication-container">
        {this.state.loginOrSignup ? (
          <Welcome>
            <Login
              onLogin={this.onLogin}
              loginOrSignupRequest={this.loginOrSignupRequest}
            />
          </Welcome>
        ) : (
          <Welcome>
            <Signup
              onSignup={this.onSignup}
              loginOrSignupRequest={this.loginOrSignupRequest}
            />
          </Welcome>
        )}
        <Snackbar
          open={this.state.open}
          autoHideDuration={2000}
          onClose={this.handleClose}
          message="User does not exist"
        />
      </div>
    );
  }
}

export default FunctionalWrapper(Authentication);
