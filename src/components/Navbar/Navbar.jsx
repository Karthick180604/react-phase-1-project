import React, { Component } from 'react'
import { NavLink, Outlet } from 'react-router-dom'

export class Navbar extends Component {
  render() {
    const navElements=[
        {name:"Products", url:"/products"},
        {name:"Cart", url:"/cart"},
    ]
    return (
      <div className='navbar-container'>
        <div className="nav-title">
            <h1>Ecommerce</h1>
        </div>
        <div className="nav-elements">
        {
            navElements.map(({name, url}, index)=>(
                <div key={index}>
                    <NavLink to={url}
                    className={({ isActive }) =>
                    isActive ? 'active-link' : 'inactive-link'
                    }
                    >
                    {name}
                    </NavLink>
                </div>
            ))
        }
        </div>
        <Outlet />
      </div>
    )
  }
}

export default Navbar
