import React, { Component } from "react"
import FormInput from "../FormInput/FormInput"
import Button from '@mui/material/Button';
import "./Login.css"

class Login extends Component{
    constructor(props){
        super(props)
        this.state={
            useremail:"",
            userpassword:""
        }
    }
    onInputChange=(e)=>{
        const {name, value}=e.target
        
        this.setState({[name]:value})
        console.log(this.state)
    }
    loginHandler=()=>{
        const userInput={
            useremail:this.state.useremail,
            userpassword:this.state.userpassword
        }
        this.props.onLogin(userInput)
        this.setState({
            useremail:"",
            userpassword:""
        })
    }
    render(){
        const formFields=[
            {name:"useremail",type:"email", value:this.state.useremail, label:"Email", placeholder:"Enter your email", onInputChange:this.onInputChange},
            {name:"userpassword",type:"password", value:this.state.userpassword, label:"Password", placeholder:"Enter your password", onInputChange:this.onInputChange},
        ]
        return(
            <>
            <div className="auth-container">
            <div className="auth-header">
                <h2>Login</h2>
            </div>
            <div className="auth-form-section">
                {
                    formFields.map((data, index)=>(
                        <div key={index}>
                            {/* <TextField 
                                    name={name}
                                    value={value} 
                                    label={label} 
                                    type={type}
                                    variant="standard" 
                                    onChange={(e)=>this.onInputChange(e)}
                                    placeholder={placeholder}
                                    /> */}
                                <FormInput {...data}/>
                        </div>
                    ))
                }
            </div>
            <div className="auth-button-container">
                <Button variant="contained" onClick={this.loginHandler}>Login</Button>
                <Button variant="contained" onClick={(e)=>this.props.loginOrSignupRequest()} >Sign up</Button>
            </div>
            </div>
            </>
        )
    }
}

export default Login