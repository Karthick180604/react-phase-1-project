import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home/Home.jsx'
import Products from './pages/Products/Products.jsx'
import Cart from './pages/Cart/Cart.jsx'
import Authentication from './pages/Authentication/Authentication.jsx'
import "./index.css"
import WebLayout from './pages/WebLayout/WebLayout.jsx'
import SingleProduct from './pages/SingleProduct/SingleProduct.jsx'
import ProductSection from './pages/ProductSection/ProductSection.jsx'
import { createTheme, ThemeProvider, styled } from '@mui/material/styles'

const theme=createTheme({
  palette:{
    primary:{
      main:"#2C5E4C"
    },
    secondary:{
      main:"#E7C961"
    }
  }
})

const router=createBrowserRouter([
    {
      path:"/",
      element:<WebLayout />,
      children:[
        {index:true, element:<Home />}
      ]
    },
    {
      path:"/:email",
      element:<WebLayout />,
      children:[
        {index:true, element:<Home />},
        {
          path:"products", 
          element:<ProductSection />,
          children:[
            {index:true, element:<Products />},
            {path:"product/:id", element:<SingleProduct />}
          ]
        },
        {path:"cart", element:<Cart />},
      ]
    },
    {
      path:"/auth",
      element:<Authentication />
    },
  ])
createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  // </StrictMode>, */
)
