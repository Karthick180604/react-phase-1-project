import React, { Component } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import "./WebLayout.css";

export class WebLayout extends Component {
  render() {
    return (
      <div className="weblayout-container">
        <div className="navbar-web-container">
          <Navbar />
        </div>
        <div className="content-container">
          <Outlet />
        </div>
      </div>
    );
  }
}

export default WebLayout;
