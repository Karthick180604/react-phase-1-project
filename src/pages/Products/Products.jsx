import React, { Component } from "react"
import { getAllProducts } from "../../services/apiCalls"
import Button from '@mui/material/Button';

import ProductFilter from "../../components/ProductFilter/ProductFilter";

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
    fetchProducts= async(category)=>{
        const {data}=await getAllProducts()
        this.setState({products:data, filteredProducts:data})
        // if(category!==undefined && category!=="")
        // {
        //     const filteredByCategory=data.filter((data)=>{
        //         return data.category===category
        //     })
        //     this.setState({products:filteredByCategory})
        // }
        // else
        // {
        //     this.setState({products:data})
        // }
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
                            <h3>{data.title}</h3>
                            <p>{data.category}</p>
                        </div>
                    ))
                }
            </div>
            </>
            
        )
    }
}

export default Products