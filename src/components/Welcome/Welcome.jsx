import React, { Component } from 'react'
import "./Welcome.css";

class Welcome extends Component {
  render() {
    return (
      <div className='welcome-container'>
        <div className="auth-section">
            {this.props.children}
        </div>
        <div className="welcome-section">

        </div>
      </div>
    )
  }
}

export default Welcome
