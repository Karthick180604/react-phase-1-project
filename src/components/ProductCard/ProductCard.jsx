import React, { Component } from 'react'
import Button from '@mui/material/Button';
import "./ProductCard.css"
import { NavLink, useNavigate } from 'react-router-dom';
import { IconButton, Rating } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';

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
    const {id, title, price, description, category, image, rating}=this.props
    return (
      <div className='product-card-container'>
        <NavLink className="nav-text" to={`product/${id}`}>
        <div className="product-image-container">
          <img className='product-image' src={image} />
        </div>
        <div>
          <div className="product-title-container">
            <h2 className='product-title'>{title}</h2>
          </div>
        </div>

        </NavLink>
        <p>₹{price}</p>
        <div className="rating-container">
          <Rating name="half-rating-read" defaultValue={rating.rate} precision={0.5} readOnly />
        </div>
        {
          this.props.cart===true ? (
            <div className='cart-buttons'>
              <p>Quantity : {this.props.quantity}</p>
              <IconButton color='primary' variant='outlined' onClick={()=>this.props.onQuantityChange(id, 1)} > <AddIcon /> </IconButton>
              <IconButton color='primary' variant='outlined' onClick={()=>this.props.onQuantityChange(id, -1)}> <RemoveIcon/> </IconButton>
              <Button variant='outlined' onClick={()=>this.props.onRemoveCart(id)} endIcon={<DeleteIcon />}>Remove from cart</Button>
            </div>
          ) : (
            <div className='product-button'>
              <Button variant='outlined' onClick={()=>this.props.onAddToCart(id)}>Add to cart</Button>
            </div>
          )
        }
      </div>
    )
  }
}

export default FunctionalWrapper(ProductCard)
