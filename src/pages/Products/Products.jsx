import React, { Component } from "react"
import { getAllProducts } from "../../services/apiCalls"
import Button from '@mui/material/Button';

import ProductFilter from "../../components/ProductFilter/ProductFilter";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./Products.css"
import { Box, CircularProgress, Pagination } from "@mui/material";


class Products extends Component{
    contentSize=6;
    constructor(props){
        super(props)
        this.state={
            products:[],
            filteredProducts:[],
            categories:[],
            category:"",
            search:"",
            paginationContent:[],
            from:0,
            to:this.contentSize,
            count:0,
            loading:false,
        }
    }
    componentDidMount(){
        console.log("mounted")
        this.fetchProducts()
        // this.fetchCategories()
    }
    // componentDidUpdate(prevProps, prevState){
    //     if (prevState.filteredProducts !== this.state.filteredProducts || 
    //   prevState.from !== this.state.from || 
    //   prevState.to !== this.state.to) 
    //   {
    //     this.handlePagination();
    //     }
    // }
    // fetchCategories=async()=>{
        //     const {data}=await getAllProducts();
        
        // }
    
        handlePagination=()=>{
            this.setState({count:this.state.filteredProducts.length})
            const data=this.state.filteredProducts.slice(this.state.from, this.state.to)
            this.setState({paginationContent:data}, ()=>console.log(this.state.paginationContent))
        }
        onPageChange=(e, page)=>{
            const from=(page-1)*this.contentSize
            const to=from+this.contentSize
            this.setState({from:from, to:to}, ()=>{
                this.handlePagination()
            })
        }
    fetchProducts= async()=>{
        this.setState({loading:true})
        const {data}=await getAllProducts()
        this.setState({products:data, filteredProducts:data}, ()=>{
            this.handlePagination()
        })
        const filteredCategories=data.reduce((acc, product)=>{
            if(!acc.includes(product.category))
            {
                acc.push(product.category)
            }
            return acc;
        },[])
        console.log(filteredCategories)
        this.setState({categories:filteredCategories})
        this.setState({loading:false})
    }
    onCategoryChange=(e)=>{
        const {value}=e.target
        this.setState({category:value})
        const filterByCategory=this.state.products.filter((product)=>{
            return product.category===value
        })
        this.setState({filteredProducts:filterByCategory}, ()=>{
            this.handlePagination()
        })
    }
    onSearchChange=(e)=>{
        const {value}=e.target
        const searchText=value.toLowerCase()
        this.setState({search:searchText})
        const filteredBySearch=this.state.products.filter((product)=>{
            if(this.state.category!=="")
            {
                return product.title.toLowerCase().includes(searchText) && this.state.category===product.category
            }
            else
            {
                return product.title.toLowerCase().includes(searchText)
            }
        })
        this.setState({filteredProducts:filteredBySearch}, ()=>{
            this.handlePagination()
        })
    }
    onAddToCart=(id)=>{
        console.log("in cart button")
        const localCart=localStorage.getItem("cart")
        const prevCart=localCart===null ? [] : JSON.parse(localCart)
        const alreadyExist=prevCart.find((cartItem)=>{
            return cartItem.id===id
        })
        const isExist=!!alreadyExist
        if(!isExist)
        {
            const cartItem={id:id, quantity:1}
            prevCart.push(cartItem)
            const stringifyCart=JSON.stringify(prevCart)
            localStorage.setItem("cart",stringifyCart)
            window.dispatchEvent(new Event("CartUpdated"))
        }
        else
        {
            console.log("already exist")
        }


    }
    render(){
        if(this.state.loading)
        {
            return (
                <div className="product-loading-container">
                    <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                    </Box>
                </div>
            )
        }
        return(
            <>
            <div className="products-container">
                <div className="products-filter-container">
                    <ProductFilter 
                    category={this.state.category} 
                    onCategoryChange={this.onCategoryChange} 
                    categories={this.state.categories}
                    onSearchChange={this.onSearchChange}
                    value={this.state.search}
                    />  
                </div>
                <div className="product-display-wrapper-container">
                    
                        <div className="products-display-container">
                            {
                                this.state.paginationContent.map((data, index)=>(
                                    <div className="product-inside-container" key={index}>
                                            <ProductCard {...data} onAddToCart={this.onAddToCart} />
                                    </div>
                                ))
                            }
                        </div>
                </div>
                <div className="products-pagination">
                    <Pagination 
                    count={Math.ceil(this.state.count/this.contentSize)} 
                    variant="outlined" 
                    color="primary" 
                    onChange={this.onPageChange}
                    />
                </div>
            </div>
            </>
            
        )
    }
}

export default Products