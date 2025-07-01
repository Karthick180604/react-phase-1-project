import React, { Component } from 'react'
import Button from '@mui/material/Button';
import "./ProductCard.css"
import { NavLink, useNavigate } from 'react-router-dom';

const FunctionalWrapper=(ProductCard)=>{
  const Wrapper=(props)=>{
    const navigate=useNavigate()
    return <ProductCard {...props} navigate={navigate} />
  }
  return Wrapper
}

class ProductCard extends Component {
    constructor(props){
        super(props)
    }
    
  render() {
    const {id, title, price, description, category, image}=this.props
    return (
      <div className='product-card-container'>
        <NavLink to={`product/${id}`}><h2>{title}</h2></NavLink>
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

export default FunctionalWrapper(ProductCard)
