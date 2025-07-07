import React, { Component } from "react";
import { Navigate } from "react-router-dom";

class HomeProtectedRoutes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticate: false,
      loading: false,
    };
  }
  componentDidMount() {
    this.handleAuthetication();
  }
  handleAuthetication = () => {
    this.setState({ loading: true });
    const user = localStorage.getItem("user");
    const isUserExist = !!user;
    this.setState({ authenticate: isUserExist, loading: false });
  };
  render() {
    const user = localStorage.getItem("user");
    if (this.state.loading) {
      return <h2>Loading...</h2>;
    }
    if (this.state.authenticate) {
      return <Navigate to={`/${user}`} />;
    } else {
      return this.props.children;
    }
  }
}

export default HomeProtectedRoutes;
