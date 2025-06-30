import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home/Home.jsx'
import Products from './pages/Products/Products.jsx'
import Cart from './pages/Cart/Cart.jsx'
import Authentication from './pages/Authentication/Authentication.jsx'
import "./index.css"
const router=createBrowserRouter([
    {
      path:"/",
      children:[
        {index:true, element:<Home />},
        {path:"products", element:<Products />},
        {path:"cart", element:<Cart />}
      ]
    },
    {
      path:"/auth",
      element:<Authentication />
    }
  ])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
