import React, { Component } from "react";
import FormInput from "../FormInput/FormInput";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import "./ProductFilter.css"

export class ProductFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
    };
  }
  render() {
    return (
      <div className="product-filter-container">
        <FormInput
            name="product search"
            label="Search"
            value={this.props.value}
            type="text"
            onInputChange={this.props.onSearchChange}
            placeholder="Search products"
        />
        <FormControl  fullWidth>
          <InputLabel id="demo-simple-select-label">Categories</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={this.props.category}
            label="Categories"
            onChange={this.props.onCategoryChange}
          >
            {this.props.categories.map((data, index) => (
              <MenuItem key={index} value={data}>
                {data}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  }
}

export default ProductFilter;
