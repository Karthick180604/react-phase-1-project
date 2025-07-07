import React, { Component } from "react";
import { getAllProducts } from "../../services/apiCalls";

import ProductFilter from "../../components/ProductFilter/ProductFilter";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./Products.css";
import {
  Box,
  CircularProgress,
  IconButton,
  Pagination,
  Snackbar,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import debounce from "lodash.debounce";
import ApiError from "../../components/ApiError/ApiError";
import noResults from "../../assets/noResults.jpg";

const Wrapper = (props) => {
  const navigate = useNavigate();
  return <Products {...props} navigate={navigate} />;
};

class Products extends Component {
  contentSize = 6;
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      filteredProducts: [],
      categories: [],
      category: "",
      search: "",
      paginationContent: [],
      from: 0,
      to: this.contentSize,
      count: 0,
      loading: false,
      error: false,
      errorMessage: "",
      open: false,
      snackbarMessage: "",
    };

    this.debouncedPerformSearch = debounce(this.performSearchFilter, 500);
  }

  componentDidMount() {
    this.fetchProducts();
  }

  componentWillUnmount() {
    if (
      this.debouncedPerformSearch &&
      typeof this.debouncedPerformSearch.cancel === "function"
    ) {
      this.debouncedPerformSearch.cancel();
    }
  }

  handlePagination = () => {
    this.setState({ count: this.state.filteredProducts.length });
    const data = this.state.filteredProducts.slice(
      this.state.from,
      this.state.to,
    );
    this.setState({ paginationContent: data });
  };

  onPageChange = (e, page) => {
    const from = (page - 1) * this.contentSize;
    const to = from + this.contentSize;
    this.setState({ from: from, to: to }, () => {
      this.handlePagination();
    });
  };

  fetchProducts = async () => {
    try {
      this.setState({ loading: true });
      const response = await getAllProducts();
      const editedData = response.data.map((data, index) => {
        data.addedToCart = false;
        return data;
      });
      this.setState(
        { products: editedData, filteredProducts: editedData },
        () => {
          this.handlePagination();
          this.onUpdatedCart();
        },
      );
      const filteredCategories = editedData.reduce((acc, product) => {
        if (!acc.includes(product.category)) {
          acc.push(product.category);
        }
        return acc;
      }, []);
      filteredCategories.unshift("All");
      this.setState({ categories: filteredCategories });
      this.setState({ loading: false });
    } catch (error) {
      this.setState({ error: true, loading: false });
    }
  };

  onCategoryChange = (e) => {
    const { value } = e.target;
    this.setState({ category: value }, () => {
      this.applyFilters(this.state.search, value);
    });
  };

  onSearchChange = (e) => {
    const { value } = e.target;
    const searchText = value.toLowerCase();
    this.setState({ search: searchText });
    this.debouncedPerformSearch(searchText, this.state.category);
  };

  performSearchFilter = (searchText, currentCategory) => {
    let filteredBySearchAndCategory = this.state.products;
    if (currentCategory && currentCategory !== "All") {
      filteredBySearchAndCategory = filteredBySearchAndCategory.filter(
        (product) => {
          return product.category === currentCategory;
        },
      );
    }
    if (searchText) {
      filteredBySearchAndCategory = filteredBySearchAndCategory.filter(
        (product) => {
          return product.title.toLowerCase().includes(searchText);
        },
      );
    }
    this.setState(
      {
        filteredProducts: filteredBySearchAndCategory,
        from: 0,
        to: this.contentSize,
      },
      () => {
        this.handlePagination();
      },
    );
  };

  applyFilters = (searchText, category) => {
    let filtered = this.state.products;
    if (category && category !== "All") {
      filtered = filtered.filter((product) => product.category === category);
    }
    if (searchText) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchText),
      );
    }
    this.setState(
      { filteredProducts: filtered, from: 0, to: this.contentSize },
      () => {
        this.handlePagination();
      },
    );
  };

  onUpdatedCart = () => {
    const cartString = localStorage.getItem("cart");
    const cartArray = JSON.parse(cartString) || [];
    const updatedFilteredArray = this.state.filteredProducts.map((product) => {
      const findInCart = cartArray.find((cartItem) => {
        return cartItem.id === product.id;
      });
      const isThereInCart = !!findInCart;
      product.addedToCart = isThereInCart;
      return product;
    });
    this.setState({ filteredProducts: updatedFilteredArray });
  };

  onAddToCart = (id) => {
    this.setState({ open: true, snackbarMessage: "Added to cart" });
    const localCart = localStorage.getItem("cart");
    const prevCart = localCart === null ? [] : JSON.parse(localCart);
    const alreadyExist = prevCart.find((cartItem) => {
      return cartItem.id === id;
    });
    const isExist = !!alreadyExist;
    if (!isExist) {
      const cartItem = { id: id, quantity: 1 };
      prevCart.push(cartItem);
      const stringifyCart = JSON.stringify(prevCart);
      localStorage.setItem("cart", stringifyCart);
      window.dispatchEvent(new Event("CartUpdated"));
      this.onUpdatedCart();
    } else {
      this.setState({ open: true, snackbarMessage: "Already Exist in cart" });
    }
  };
  removeCartFromProductsPage = (id) => {
    this.setState({ open: true, snackbarMessage: "Removed to cart" });
    const cartString = localStorage.getItem("cart");
    const cartArray = JSON.parse(cartString) || [];
    const updatedCartArray = cartArray.filter((cartItem) => {
      return cartItem.id !== id;
    });
    localStorage.setItem("cart", JSON.stringify(updatedCartArray));
    window.dispatchEvent(new Event("CartUpdated"));
    this.onUpdatedCart();
  };

  backHandler = () => {
    this.props.navigate(-1);
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    if (this.state.error) {
      return (
        <div className="error-container">
          <ApiError />
        </div>
      );
    }
    if (this.state.loading) {
      return (
        <div className="product-loading-container">
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        </div>
      );
    }

    return (
      <>
        <div className="products-container">
          <div className="products-header-container">
            <div className="back-container">
              <IconButton color="primary" onClick={this.backHandler}>
                <ArrowBackIcon />
              </IconButton>
            </div>
            <div className="products-filter-container">
              <ProductFilter
                category={this.state.category}
                onCategoryChange={this.onCategoryChange}
                categories={this.state.categories}
                onSearchChange={this.onSearchChange}
                value={this.state.search}
              />
            </div>
          </div>
          {this.state.filteredProducts.length === 0 ? (
            <div className="products-empty-container">
              <img className="products-empty-image" src={noResults}></img>
              <h2 className="products-empty-text">No results found</h2>
            </div>
          ) : (
            <div className="products-conditional-container">
              <div className="product-display-wrapper-container">
                <div className="products-display-container">
                  {this.state.paginationContent.map((data, index) => (
                    <div className="product-inside-container" key={index}>
                      <ProductCard
                        {...data}
                        onAddToCart={this.onAddToCart}
                        onUpdatedCart={this.onUpdatedCart}
                        removeCartFromProductsPage={
                          this.removeCartFromProductsPage
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="products-pagination">
                <Pagination
                  count={Math.ceil(this.state.count / this.contentSize)}
                  variant="outlined"
                  color="primary"
                  onChange={this.onPageChange}
                />
              </div>
            </div>
          )}
          <Snackbar
            open={this.state.open}
            autoHideDuration={2000}
            onClose={this.handleClose}
            message={this.state.snackbarMessage}
          />
        </div>
      </>
    );
  }
}

export default Wrapper;
