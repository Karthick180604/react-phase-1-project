import React, { Component } from "react";
import { Navigate, useParams } from "react-router-dom";

const Wrapper = (props) => {
  const params = useParams();
  return <ProtectedRoute {...props} params={params} />;
};

class ProtectedRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticate: false,
      loading: true,
    };
  }
  checkAuthentication = () => {
    const loginUser = localStorage.getItem("user");
    const urlEmail = this.props.params.email;
    if (loginUser === null || loginUser !== urlEmail) {
      this.setState({ authenticate: false });
    } else {
      this.setState({ authenticate: true });
    }
    this.setState({ loading: false });
  };
  componentDidMount() {
    this.checkAuthentication();
  }

  render() {
    if (this.state.loading) {
      return <h1>Loading..</h1>;
    }
    if (this.state.authenticate) {
      return this.props.children;
    } else {
      return <Navigate to="/auth" />;
    }
  }
}

export default Wrapper;
