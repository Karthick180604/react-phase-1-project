import React, { Component } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import "./Navbar.css"

export class Navbar extends Component {
  constructor(props){
    super(props)
    this.state={
      cartCount:0
    }
  }
  componentDidMount(){
    this.updatedCart()

    window.addEventListener('storage', this.storageHandler)
  }
  
  updatedCart=()=>{
    const getCartString=localStorage.getItem("cart")
    const parseCart=JSON.parse(getCartString)
    this.setState({cartCount:parseCart.length})
  }
  storageHandler=(e)=>{
    if(e.key==='cart')
    {
      this.updatedCart()
    }
  }
  render() {
    const navElements=[
        {name:"Products", url:"products"},
        {name:"Cart", url:"cart"},
    ]
    return (
      <div className='navbar-container'>
        <div className="nav-internal-container">
          <div className="nav-title">
              <h1>Ecommerce</h1>
          </div>
          <div className="nav-elements">
          {
              navElements.map(({name, url}, index)=>(
                  <div key={index}>
                      {
                        name==="Cart" ? 
                        (<IconButton aria-label="cart">
                          <Badge badgeContent={this.state.cartCount} color="secondary">
                            <ShoppingCartIcon />
                          </Badge>
                        </IconButton>)
                        :
                        ""
                      }
                      <NavLink to={url}
                      className={({ isActive }) =>
                      isActive ? 'nav-text active-link' : 'nav-text inactive-link'
                      }
                      >
                      {name}
                      </NavLink>
                  </div>
              ))
          }
          <Link className='nav-text' to="/auth">Authenticate</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Navbar
