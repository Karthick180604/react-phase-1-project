import React, { Component } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const Wrapper = (props) => {
  const navigate = useNavigate();
  return <AuthProtectedRoutes {...props} navigate={navigate} />;
};

class AuthProtectedRoutes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      authenticated: false,
    };
  }
  componentDidMount() {
    this.autheticationHandler();
  }
  autheticationHandler = () => {
    this.setState({ loading: true });
    const user = localStorage.getItem("user");
    const isUserExist = !!user;
    this.setState({ authenticated: isUserExist, loading: false });
  };

  render() {
    const user = localStorage.getItem("user");
    if (this.state.loading) {
      return <h1>loading</h1>;
    }
    if (this.state.authenticated) {
      return <Navigate to={`/${user}`} />;
    } else {
      return this.props.children;
    }
  }
}

export default Wrapper;
