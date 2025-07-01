import React, { Component } from "react"
import { useParams } from "react-router-dom"
import { getSingleProduct } from "../../services/apiCalls"

const FunctionalWrapper=(SingleProduct)=>{
    const Wrapper=(props)=>{
        const params=useParams()
        return <SingleProduct {...props} params={params} />
    }
    return Wrapper
}

class SingleProduct extends Component{
    constructor(props){
        super(props)
        this.state={
            product:{}
        }
    }
    fetchSingleProduct=async()=>{
        const {data}=await getSingleProduct(this.props.params.id)
        this.setState({product:data})
    }
    componentDidMount(){
        this.fetchSingleProduct()
    }
    render(){
        const {title, id, description, price}=this.state.product
        return(
            <>
                <h1>{title}</h1>
                <p>{description}</p>
            </>
        )
    }
}

export default FunctionalWrapper(SingleProduct)