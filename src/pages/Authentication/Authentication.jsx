import React, { Component } from "react"
import Login from "../../components/Login/Login"
import Signup from "../../components/Signup/Signup"
import "./Authentication.css"
import { useNavigate } from "react-router-dom"

const FunctionalWrapper=(Authentication)=>{
    const Wrapper=(props)=>{
        const navigate=useNavigate()
        return <Authentication {...props} navigate={navigate} />
    }
    return Wrapper
}

class Authentication extends Component{
    constructor(props){
        super(props)
        this.state={
            users:[],
            loginOrSignup:false,
            isUserLogin:false,
        }
    }
    onSignup=(newUser)=>{
        console.log(newUser)
        this.setState((prevState)=>{
            return {users:[...prevState.users, newUser]}
        },()=>{
            console.log(this.state.users)
        })
    }
    onLogin=(userInput)=>{
        const validUser=this.state.users.find((user)=>{
            return userInput.useremail===user.useremail && userInput.userpassword===user.userpassword
        })
        const isUserExist=!!validUser
        if(isUserExist)
        {
            console.log("userExist")
            this.setState({isUserLogin:true})
            this.props.navigate("/")
        }
        else
        {
            console.log("cannot login")
        }
    }
    loginOrSignupRequest=()=>{
        this.setState((prevState)=>{
            return {loginOrSignup:!prevState.loginOrSignup}
        })
    }
    render(){
        return(
            <div className="authentication-container">
                {
                    this.state.loginOrSignup ? 
                    <Login onLogin={this.onLogin} loginOrSignupRequest={this.loginOrSignupRequest}/>
                    :
                    <Signup onSignup={this.onSignup} loginOrSignupRequest={this.loginOrSignupRequest}/>
                }
            </div>
        )
    }
}

export default FunctionalWrapper(Authentication);