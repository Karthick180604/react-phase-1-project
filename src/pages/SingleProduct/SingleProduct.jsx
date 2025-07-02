import React, { Component } from "react";
import { useParams } from "react-router-dom";
import { getSingleProduct } from "../../services/apiCalls";
import "./SingleProduct.css";
import { Box, CircularProgress, IconButton, Rating } from "@mui/material";

const FunctionalWrapper = (SingleProduct) => {
  const Wrapper = (props) => {
    const params = useParams();
    return <SingleProduct {...props} params={params} />;
  };
  return Wrapper;
};

class SingleProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      loading: false,
      rating: 0,
    };
  }
  fetchSingleProduct = async () => {
    this.setState({ loading: true });
    const { data } = await getSingleProduct(this.props.params.id);
    this.setState({ rating: data.rating.rate });
    this.setState({ product: data });
    this.setState({ loading: false });

    // console.log(data)
  };
  componentDidMount() {
    this.fetchSingleProduct();
  }
  render() {
    if (this.state.loading) {
      return (
        <div className="product-loading-container">
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        </div>
      );
    } else {
      const { title, id, description, price, image, category, rating } =
        this.state.product;
      console.log(this.state.product);
      return (
        <>
          <div className="single-product-page-container">
            <div className="single-product-page">
              <div className="single-product-image">
                <img src={image} alt={title} />
              </div>
              <div className="single-product-details">
                <h1 className="single-product-title">{title}</h1>
                <p className="single-product-id">Category: {category}</p>
                <div className="rating-container">
                  <Rating
                    name="half-rating-read"
                    defaultValue={this.state.rating}
                    precision={0.5}
                    readOnly
                  />
                </div>
                <p className="single-product-price">₹{price}</p>
                <p className="single-product-description">{description}</p>
                {/* <div className="product-actions">
              <button className="buy-button">Buy Now</button>
              <button className="add-to-cart-button">Add to Cart</button>
            </div> */}
              </div>
            </div>
          </div>
        </>
      );
    }
  }
}

export default FunctionalWrapper(SingleProduct);
