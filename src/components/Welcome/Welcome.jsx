import React, { Component } from "react";
import "./Welcome.css";
import welcomePng from "../../assets/E-Commerce-Logo-Background-PNG-Image.png";

class Welcome extends Component {
  render() {
    return (
      <div className="welcome-container">
        <div className="auth-section">{this.props.children}</div>
        <div className="welcome-section">
          <img src={welcomePng}></img>
        </div>
      </div>
    );
  }
}

export default Welcome;
