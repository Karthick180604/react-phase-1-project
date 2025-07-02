import React, { Component } from "react"
import welcomeImage from "../../assets/shutter-speed-BQ9usyzHx_w-unsplash.jpg"
import "./Home.css"

class Home extends Component{
    render(){
        return(
            <div className="home-container">
                <div className="home-content-section">
                    <p className="home-welcome-text">Welcome to <span className="brand-name">Shopora</span>! where style meets tech, elegance meets performance. 
                    <br/>
                    Discover the best in fashion, gadgets, jewelry, and more all in one place, just for you.</p>
                </div>
                <div className="home-image-section">
                    <div className="home-image-container">
                        <img src={welcomeImage}></img>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home