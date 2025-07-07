import React, { Component } from "react";
import "../Login/Login.css";
import Button from "@mui/material/Button";
import FormInput from "../FormInput/FormInput";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      useremail: "",
      userpassword: "",
      nameError: false,
      emailError: false,
      passwordError: false,
      disable: true,
    };
    this.onInputChange = this.onInputChange.bind(this);
  }
  onInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
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
  signupHandler = () => {
    const newUser = {
      username: this.state.username,
      useremail: this.state.useremail,
      userpassword: this.state.userpassword,
    };
    this.props.onSignup(newUser);
    this.setState({
      username: "",
      useremail: "",
      userpassword: "",
    });
    this.props.loginOrSignupRequest();
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
        name: "username",
        label: "Name",
        type: "text",
        placeholder: "Enter your name",
        value: this.state.username,
        onInputChange: this.onInputChange,
        error: this.state.nameError,
        errorMessage: "Enter valid name",
        resetState: this.resetState,
      },
      {
        name: "useremail",
        label: "Email",
        type: "email",
        placeholder: "Enter your email",
        value: this.state.useremail,
        onInputChange: this.onInputChange,
        error: this.state.emailError,
        errorMessage: "Enter valid email",
        resetState: this.resetState,
      },
      {
        name: "userpassword",
        label: "Password",
        type: "password",
        placeholder: "Enter your password",
        value: this.state.userpassword,
        onInputChange: this.onInputChange,
        error: this.state.passwordError,
        errorMessage: "Enter strong password",
        resetState: this.resetState,
      },
    ];
    return (
      <>
        <div className="auth-container">
          <div className="auth-header">
            <h2>Sign up</h2>
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
              onClick={this.signupHandler}
              disabled={this.state.disable}
            >
              Sign up
            </Button>
            <Button
              variant="contained"
              sx={{ width: 150, height: 35 }}
              onClick={(e) => this.props.loginOrSignupRequest()}
            >
              Login
            </Button>
          </div>
        </div>
      </>
    );
  }
}

export default Signup;
