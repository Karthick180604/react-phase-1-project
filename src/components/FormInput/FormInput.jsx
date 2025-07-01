import React, { Component } from 'react'
import TextField from '@mui/material/TextField';

export class FormInput extends Component {
    constructor(props){
        super(props)
    }
  render() {
    return (
      <div>
        <TextField 
        color='secondary'
        name={this.props.name}
        value={this.props.value} 
        label={this.props.label} 
        type={this.props.type}
        variant="standard" 
        onChange={(e)=>this.props.onInputChange(e)}
        placeholder={this.props.placeholder}
        />
      </div>
    )
  }
}

export default FormInput
