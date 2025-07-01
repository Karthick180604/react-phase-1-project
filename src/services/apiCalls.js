import axios from "axios"

const api="https://fakestoreapi.com"

const getAllProducts=()=>{
    return axios.get(`${api}/products`)
}
const getSingleProduct=(id)=>{
    return axios.get(`${api}/products/${id}`)
}

export {getAllProducts, getSingleProduct}