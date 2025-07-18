import React, { Component } from "react"
import "../Login/Login.css"
import Button from '@mui/material/Button';
import FormInput from "../FormInput/FormInput";


class Signup extends Component{
    constructor(props){
        super(props)
        this.state={
            username:"",
            useremail:"",
            userpassword:""
        }
        this.onInputChange=this.onInputChange.bind(this)
    }
    onInputChange=(e)=>{
        const {name, value}=e.target;
        this.setState({
            [name]:value
        })
    }
    signupHandler=()=>{
        const newUser={
            username:this.state.username,
            useremail:this.state.useremail,
            userpassword:this.state.userpassword
        }
        this.props.onSignup(newUser)
        this.setState({
            username:"",
            useremail:"",
            userpassword:"",
        })
        this.props.loginOrSignupRequest()

    }
    
    render(){
        const formFields=[
            {name:"username", label:"Name", type:"text", placeholder:"Enter your name", value:this.state.username, onInputChange:this.onInputChange},
            {name:"useremail", label:"Email", type:"email", placeholder:"Enter your email", value:this.state.useremail, onInputChange:this.onInputChange},
            {name:"userpassword", label:"Password", type:"password", placeholder:"Enter your password", value:this.state.userpassword, onInputChange:this.onInputChange},
        ]
        return(
            <>
            <div className="auth-container">
                        <div className="auth-header">
                            <h2>Sign up</h2>
                        </div>
                        <div className="auth-form-section">
                            {
                                formFields.map((data, index)=>(
                                    <div key={index}>
                                        <FormInput {...data}/>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="auth-button-container">
                            <Button variant="contained" onClick={this.signupHandler}>Sign up</Button>
                            <Button variant="contained" onClick={(e)=>this.props.loginOrSignupRequest()} >Login</Button>
                        </div>
                        </div>
            </>
        )
    }
}

export default Signup