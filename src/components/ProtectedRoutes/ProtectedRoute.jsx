import React, { Component } from 'react'

class ProtectedRoute extends Component {
    constructor(props){
        super(props)
        this.state={
            authenticate:false,
            loading:false
        }
    }
    
}

export default ProtectedRoute
