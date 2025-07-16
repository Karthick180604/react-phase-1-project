    import { ADD_TO_CART, REMOVE_FROM_CART } from "./ActionTypes";

    const initialCartState={
        cartItems:[]
    }

    export const cartReducer=(state=initialCartState, action)=>{
        switch(action.type)
        {
            case ADD_TO_CART:return{
                ...state,
                cartItems:[...state.cartItems, action.payload]
            }
            case REMOVE_FROM_CART:return{
                ...state,
                cartItems:state.cartItems.filter((cartItemId)=>{
                    return cartItemId!==action.payload
                })
            }
            default : return state
        }
    }