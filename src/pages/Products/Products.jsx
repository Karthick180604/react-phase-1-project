import React, { Component } from "react"
import { getAllProducts } from "../../services/apiCalls"
import Button from '@mui/material/Button';

import ProductFilter from "../../components/ProductFilter/ProductFilter";
import ProductCard from "../../components/ProductCard/ProductCard";
import { NavLink, Outlet } from "react-router-dom";

class Products extends Component{
    constructor(props){
        super(props)
        this.state={
            products:[],
            filteredProducts:[],
            categories:[],
            category:"",
            search:"",
        }
    }
    componentDidMount(){
        console.log("mounted")
        this.fetchProducts()
        this.fetchCategories()
    }
    fetchCategories=async()=>{
        const {data}=await getAllProducts();
        const filteredCategories=data.reduce((acc, product)=>{
            if(!acc.includes(product.category))
            {
                acc.push(product.category)
            }
            return acc;
        },[])
        console.log(filteredCategories)
        this.setState({categories:filteredCategories})
    }
    fetchProducts= async()=>{
        const {data}=await getAllProducts()
        this.setState({products:data, filteredProducts:data})
    }
    onCategoryChange=(e)=>{
        const {value}=e.target
        this.setState({category:value})
        const filterByCategory=this.state.products.filter((product)=>{
            return product.category===value
        })
        this.setState({filteredProducts:filterByCategory})
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
        this.setState({filteredProducts:filteredBySearch})
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
        }
        else
        {
            console.log("already exist")
        }

    }
    render(){
        return(
            <>
            <h1>products</h1>
            <ProductFilter 
            category={this.state.category} 
            onCategoryChange={this.onCategoryChange} 
            categories={this.state.categories}
            onSearchChange={this.onSearchChange}
            value={this.state.search}
            />  
            <div>
                {
                    this.state.filteredProducts.map((data, index)=>(
                        <div key={index}>
                                <ProductCard {...data} onAddToCart={this.onAddToCart} />
                        </div>
                    ))
                }
            </div>
            </>
            
        )
    }
}

export default Products