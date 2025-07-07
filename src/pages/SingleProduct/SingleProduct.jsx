import React, { Component } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleProduct } from "../../services/apiCalls";
import "./SingleProduct.css";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Rating,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ApiError from "../../components/ApiError/ApiError";

const FunctionalWrapper = (SingleProduct) => {
  const Wrapper = (props) => {
    const params = useParams();
    const navigate = useNavigate();
    return <SingleProduct {...props} params={params} navigate={navigate} />;
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
      error: false,
      expanded: false,
    };
  }
  fetchSingleProduct = async () => {
    try {
      this.setState({ loading: true });
      const { data } = await getSingleProduct(this.props.params.id);
      this.setState({ rating: data.rating.rate });
      this.setState({ product: data });
      this.setState({ loading: false });
    } catch (error) {
      this.setState({ loading: false, error: true });
    }
  };
  componentDidMount() {
    this.fetchSingleProduct();
  }
  onExpanded = () => {
    this.setState((prevState) => {
      return { expanded: !prevState.expanded };
    });
  };

  backHandler = () => {
    this.props.navigate(-1);
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
    const limit = 100;
    const {
      title,
      id,
      description = "",
      price,
      image,
      category,
      rating,
    } = this.state.product;
    const isLong = description.length > limit;
    return (
      <>
        <div className="single-product-page-container">
          <div className="single-back-container">
            <IconButton color="primary" onClick={this.backHandler}>
              <ArrowBackIcon />
            </IconButton>
          </div>
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
              <div>
                <Typography variant="body2">
                  {isLong && !this.state.expanded
                    ? description.slice(0, limit) + "..."
                    : description}
                </Typography>
                <Button size="small" onClick={this.onExpanded}>
                  {this.state.expanded ? "Read less" : "Read more"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default FunctionalWrapper(SingleProduct);
