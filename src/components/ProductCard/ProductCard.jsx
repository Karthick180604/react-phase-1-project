import React, { Component } from 'react'
import Button from '@mui/material/Button';
import "./ProductCard.css"

class ProductCard extends Component {
    constructor(props){
        super(props)
    }
    
  render() {
    const {id, title, price, description, category, image}=this.props
    return (
      <div className='product-card-container'>
        <h2>{title}</h2>
        <p>{description}</p>
        <p>{price}</p>
        {
          this.props.cart===true ? (
            <div>
              <p>{this.props.quantity}</p>
              <Button onClick={()=>this.props.onQuantityChange(id, 1)}>+</Button>
              <Button onClick={()=>this.props.onQuantityChange(id, -1)}>-</Button>
              <Button onClick={()=>this.props.onRemoveCart(id)}>Remove from cart</Button>
            </div>
          ) : (
            <Button onClick={()=>this.props.onAddToCart(id)}>Add to cart</Button>
          )
        }
      </div>
    )
  }
}

export default ProductCard
