import React, { Component } from "react"
import { getAllProducts } from "../../services/apiCalls"
import ProductCard from "../../components/ProductCard/ProductCard"
import { removeStorageProduct, updateStorageQuantity } from "../../services/storageOperations"
import "./Cart.css"

class Cart extends Component{
    constructor(props){
        super(props)
        this.state={
            cartProducts:[],
            total:0
        }
    }
    componentDidMount(){
        this.fetchCartProducts()
    }
    
    fetchCartProducts=async()=>{
        const {data}=await getAllProducts()
        const cartString=localStorage.getItem("cart")
        const cartArray=JSON.parse(cartString)
        const getCartItems=cartArray.reduce((acc, cartItem)=>{
            const findInAllProducts=data.find((product)=>{
                return product.id===cartItem.id
            })
            const addQuantity={...findInAllProducts, quantity:cartItem.quantity}
            acc.push(addQuantity)
            return acc
        },[])
        this.setState({cartProducts:getCartItems}, ()=>{
            this.findTotal()
        })
    }
    onQuantityChange=(id, count)=>{
        let quantityZero=false;
        const updatedCartProduct=this.state.cartProducts.map((cartProduct, index)=>{
            if(cartProduct.id===id)
            {
                cartProduct.quantity=cartProduct.quantity+count;
                if(cartProduct.quantity===0)
                {
                    quantityZero=true;
                }
                updateStorageQuantity(id, cartProduct.quantity)
            }
            return cartProduct
        })
        this.setState({cartProducts:updatedCartProduct}, ()=>{
            this.findTotal()
        })
        if(quantityZero)
        {
            this.onRemoveCart(id)
        }
    }
    onRemoveCart=(id)=>{
        const filteredCartProduct=this.state.cartProducts.filter((cartItem)=>{
            return cartItem.id!==id
        })
        removeStorageProduct(id)
        this.setState({cartProducts:filteredCartProduct}, ()=>{
            this.findTotal()
        })
    }
    findTotal=()=>{
        const totalPrice=this.state.cartProducts.reduce((acc, cartItem)=>{
            const price=cartItem.price*cartItem.quantity
            return acc+price
        },0)
        console.log(totalPrice)
        this.setState({total:totalPrice.toFixed(2)})
    }
    render(){
        return(
            <>
            <div className="cart-container">
                <div className="total-container">
                    <h1>Cart</h1>
                    <h2>total: ${this.state.total}</h2>
                </div>
                    <div className="cart-items">
                        {
                            this.state.cartProducts.map((data,index)=>(
                                <div className="cart-product" key={index}>
                                    <ProductCard {...data} cart={true} onQuantityChange={this.onQuantityChange} onRemoveCart={this.onRemoveCart} />
                                </div>
                            ))
                        }
                    </div>
            </div>
            </>
        )
    }
}

export default Cart