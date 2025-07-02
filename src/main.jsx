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
import CartSection from './pages/CartSection/CartSection.jsx'
import ProtectedRoute from './components/ProtectedRoutes/ProtectedRoute.jsx'
import NotFound from './pages/NotFound/NotFound.jsx'

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
        {index:true, element:<Home />},
        {
          path:"*",
          element:<NotFound />
        }
      ]
    },
    {
      path:"/:email",
      element:<ProtectedRoute><WebLayout /></ProtectedRoute>,
      children:[
        {index:true, element:<Home />},
        {
          path:"products", 
          element:<ProtectedRoute><ProductSection /></ProtectedRoute>,
          children:[
            {index:true, element:<ProtectedRoute><Products /></ProtectedRoute>},
            {path:"product/:id", element:<ProtectedRoute><SingleProduct /></ProtectedRoute>}
          ]
        },
        {
          path:"cart",
          element:<ProtectedRoute><CartSection /></ProtectedRoute>,
          children:[
            {index:true, element:<Cart />},
            {path:"product/:id", element:<SingleProduct />}
          ]
        },
        {
          path:"*",
          element:<NotFound />
        }
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
