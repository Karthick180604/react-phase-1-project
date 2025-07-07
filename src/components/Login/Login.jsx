import React, { Component } from "react";
import FormInput from "../FormInput/FormInput";
import Button from "@mui/material/Button";
import "./Login.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      useremail: "",
      userpassword: "",
      userid: 1,
      emailError: false,
      passwordError: false,
      disable: true,
    };
  }
  onInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
    if (name === "useremail") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const test = emailRegex.test(value);
      this.setState((prevState) => {
        return {
          emailError: !test,
          disable:
            !test ||
            this.state.passwordError ||
            this.state.userpassword.length === 0,
        };
      });
    }
    if (name === "userpassword") {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;
      const test = passwordRegex.test(value);
      this.setState((prevState) => {
        return {
          passwordError: !test,
          disable:
            !test || this.state.emailError || this.state.useremail.length === 0,
        };
      });
    }
  };
  loginHandler = () => {
    const userInput = {
      useremail: this.state.useremail,
      userpassword: this.state.userpassword,
      userid: this.state.userid,
    };
    this.props.onLogin(userInput);
    this.setState((prevState) => {
      return {
        useremail: "",
        userpassword: "",
        userid: prevState.userid + 1,
      };
    });
  };

  resetState = (e) => {
    const { name } = e.target;
    if (name === "username") {
      this.setState((prevState) => ({ nameError: false }));
    } else if (name === "useremail") {
      this.setState((prevState) => ({ emailError: false }));
    } else if (name === "userpassword") {
      this.setState((prevState) => ({ passwordError: false }));
    }
  };

  render() {
    const formFields = [
      {
        name: "useremail",
        type: "email",
        value: this.state.useremail,
        label: "Email",
        placeholder: "Enter your email",
        onInputChange: this.onInputChange,
        error: this.state.emailError,
        errorMessage: "Enter valid email",
        resetState: this.resetState,
      },
      {
        name: "userpassword",
        type: "password",
        value: this.state.userpassword,
        label: "Password",
        placeholder: "Enter your password",
        onInputChange: this.onInputChange,
        error: this.state.passwordError,
        errorMessage: "Enter Strong Password",
        resetState: this.resetState,
      },
    ];
    return (
      <>
        <div className="auth-container">
          <div className="auth-header">
            <h2>Login</h2>
          </div>
          <div className="auth-form-section">
            {formFields.map((data, index) => (
              <div key={index}>
                <FormInput {...data} />
              </div>
            ))}
          </div>
          <div className="auth-button-container">
            <Button
              variant="contained"
              sx={{ width: 150, height: 35 }}
              onClick={this.loginHandler}
              disabled={this.state.disable}
            >
              Login
            </Button>
            <Button
              variant="contained"
              sx={{ width: 150, height: 35 }}
              onClick={(e) => this.props.loginOrSignupRequest()}
            >
              Sign up
            </Button>
          </div>
        </div>
      </>
    );
  }
}

export default Login;
