import React, { Component } from 'react'
import { Navigate } from 'react-router-dom'

class NotFound extends Component {
    constructor(props){
        super(props)
        this.state={
            redirect:false
        }
    }
    componentDidMount(){
        this.setState({redirect:true})
    }
  render() {
    return (
        <h1>Page not found</h1>
    )
  }
}

export default NotFound
