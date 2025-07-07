import React, { Component } from "react";
import { getAllProducts } from "../../services/apiCalls";
import ProductCard from "../../components/ProductCard/ProductCard";
import {
  removeStorageProduct,
  updateStorageQuantity,
} from "../../services/storageOperations";
import "./Cart.css";
import { Box, CircularProgress, IconButton, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ApiError from "../../components/ApiError/ApiError";
import emptyCart from "../../assets/emptyCart.png";

const Wrapper = (props) => {
  const navigate = useNavigate();
  return <Cart {...props} navigate={navigate} />;
};

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartProducts: [],
      total: 0,
      loading: false,
      error: false,
      open: false,
    };
  }
  componentDidMount() {
    this.fetchCartProducts();
    window.addEventListener("RemoveFromCart", (event) => {
      this.onRemoveCart(event.detail);
    });
  }

  fetchCartProducts = async () => {
    try {
      this.setState({ loading: true });
      const { data } = await getAllProducts();
      const cartString = localStorage.getItem("cart");
      const cartArray = JSON.parse(cartString) || [];
      const getCartItems = cartArray.reduce((acc, cartItem) => {
        const findInAllProducts = data.find((product) => {
          return product.id === cartItem.id;
        });
        const addQuantity = {
          ...findInAllProducts,
          quantity: cartItem.quantity,
        };
        acc.push(addQuantity);
        return acc;
      }, []);
      this.setState({ cartProducts: getCartItems }, () => {
        this.findTotal();
      });
      this.setState({ loading: false });
    } catch (error) {
      this.setState({ loading: false, error: true });
    }
  };
  onQuantityChange = (id, count) => {
    let quantityZero = false;
    const updatedCartProduct = this.state.cartProducts.map(
      (cartProduct, index) => {
        if (cartProduct.id === id) {
          cartProduct.quantity = cartProduct.quantity + count;
          if (cartProduct.quantity === 0) {
            quantityZero = true;
          }
          updateStorageQuantity(id, cartProduct.quantity);
        }
        return cartProduct;
      },
    );
    this.setState({ cartProducts: updatedCartProduct }, () => {
      this.findTotal();
    });
    if (quantityZero) {
      this.onRemoveCart(id);
    }
  };
  onRemoveCart = (id) => {
    this.setState({ open: true });
    const filteredCartProduct = this.state.cartProducts.filter((cartItem) => {
      return cartItem.id !== id;
    });
    removeStorageProduct(id);
    this.setState({ cartProducts: filteredCartProduct }, () => {
      this.findTotal();
    });
    window.dispatchEvent(new Event("CartUpdated"));
  };
  findTotal = () => {
    const totalPrice = this.state.cartProducts.reduce((acc, cartItem) => {
      const price = cartItem.price * cartItem.quantity;
      return acc + price;
    }, 0);
    this.setState({ total: totalPrice.toFixed(2) });
  };
  backHandler = () => {
    this.props.navigate(-1);
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  render() {
    if (this.state.loading) {
      return (
        <div className="product-loading-container">
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        </div>
      );
    }
    if (this.state.error) {
      return (
        <div className="error-container">
          <ApiError />
        </div>
      );
    }
    return (
      <>
        <div className="cart-container">
          <div className="cart-header">
            <div className="back-wrapper">
              <div className="cart-back-container">
                <IconButton color="primary" onClick={this.backHandler}>
                  <ArrowBackIcon />
                </IconButton>
              </div>
            </div>
            <div className="total-wrapper-container">
              <div className="total-container">
                <h1>Cart</h1>
                <h2>total: ₹{this.state.total}</h2>
              </div>
            </div>
          </div>
          {this.state.cartProducts.length === 0 ? (
            <div className="cart-empty-container">
              <img className="cart-empty-image" src={emptyCart}></img>
              <h2 className="cart-empty-text">No cart items</h2>
            </div>
          ) : (
            <div className="cart-items-wrapper">
              <div className="cart-items">
                {this.state.cartProducts.map((data, index) => (
                  <div className="cart-product" key={index}>
                    <ProductCard
                      {...data}
                      cart={true}
                      onQuantityChange={this.onQuantityChange}
                      onRemoveCart={this.onRemoveCart}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          <Snackbar
            open={this.state.open}
            autoHideDuration={2000}
            onClose={this.handleClose}
            message="Removed from cart"
          />
        </div>
      </>
    );
  }
}

export default Wrapper;
