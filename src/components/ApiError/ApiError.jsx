import React, { Component } from "react";
import errorImage from "../../assets/errorImage.png";
import "./ApiError.css";
import { Button } from "@mui/material";

class ApiError extends Component {
  constructor(props) {
    super(props);
  }
  handleReload = () => {
    window.location.reload();
  };
  render() {
    return (
      <div className="api-error-container">
        <div className="api-error-internal-container">
          <img className="api-error-image" src={errorImage}></img>
          <h4 className="api-error-text">
            Something Went wrong!.. Please refresh the page
          </h4>
          <Button variant="contained" onClick={this.handleReload}>
            Refresh
          </Button>
        </div>
      </div>
    );
  }
}

export default ApiError;
