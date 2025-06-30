import axios from "axios"

const api="https://fakestoreapi.com"

const getAllProducts=()=>{
    return axios.get(`${api}/products`)
}

export {getAllProducts}