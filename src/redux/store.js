import { combineReducers, createStore } from "redux";
import { cartReducer } from "./Reducer";

const rootReducer=combineReducers({
    cart:cartReducer
})

export const store=createStore(rootReducer)