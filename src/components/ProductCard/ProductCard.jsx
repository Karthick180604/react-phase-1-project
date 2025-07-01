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
        <NavLink className="nav-text" to={`product/${id}`}>
        <img className='product-image' src={image} />
        <h2>{title}</h2>

        </NavLink>
        <p>${price}</p>
        {
          this.props.cart===true ? (
            <div className='cart-buttons'>
              <p>Quantity : {this.props.quantity}</p>
              <Button onClick={()=>this.props.onQuantityChange(id, 1)}>+</Button>
              <Button onClick={()=>this.props.onQuantityChange(id, -1)}>-</Button>
              <Button onClick={()=>this.props.onRemoveCart(id)}>Remove from cart</Button>
            </div>
          ) : (
            <div className='product-button'>
              <Button onClick={()=>this.props.onAddToCart(id)}>Add to cart</Button>
            </div>
          )
        }
      </div>
    )
  }
}

export default FunctionalWrapper(ProductCard)
