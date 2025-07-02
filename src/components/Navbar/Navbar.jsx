import React, { Component } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import "./Navbar.css"
import { getCartItemsLength } from '../../services/storageOperations';

export class Navbar extends Component {
  constructor(props){
    super(props)
    this.state={
      cartCount:0
    }
  }
  componentDidMount(){
    this.updatedCart()

    window.addEventListener('CartUpdated', this.updatedCart)
  }
  
  updatedCart=()=>{
    const getCartLength=getCartItemsLength()
    this.setState({cartCount:getCartLength})
  }
  // storageHandler=(e)=>{
  //   if(e.key==='cart')
  //   {
  //     this.updatedCart()
  //   }
  // }
  render() {
    const userExist=localStorage.getItem("user")
    const isUserExist=!!userExist
    const navElements=[
        {
          name:"Products",
          url:"products", 
          icons:<div className='icon-demo'></div>
        },
        {
          name:"Cart",
          url:"cart",
          icons:<IconButton aria-label="cart">
                          <Badge badgeContent={this.state.cartCount} color="primary">
                            <ShoppingCartIcon />
                          </Badge>
                        </IconButton>
        },
    ]
    return (
      <div className='navbar-container'>
        <div className="nav-internal-container">
          <div className="nav-title">
              <h1>Shopora</h1>
          </div>
          <div className="nav-elements">
          {
            isUserExist && (
              
                  navElements.map(({name, url, icons}, index)=>(
                      <div key={index}>
                          <NavLink to={url}
                          className={({ isActive }) =>
                            isActive ? 'nav-text active-link' : 'nav-text inactive-link'
                        }
                        >
                          <div className="align-logo">
                            {icons}
                            {name}
                          </div>
                          </NavLink>
                      </div>
                  ))
            )
          }
          {
            !userExist && (
              <div className='align-authenticate'>
                <Link className='nav-text' to="/auth">
                <div className="align-logo">
                  <AccountCircleIcon/>Login
                </div>
                </Link>
                </div>

            )
          }
          </div>
        </div>
      </div>
    )
  }
}

export default Navbar
