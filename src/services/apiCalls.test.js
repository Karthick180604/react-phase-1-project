import axios from "axios";
import MockAdapter from "axios-mock-adapter"
import { getAllProducts, getSingleProduct } from "./apiCalls";

const mock=new MockAdapter(axios);

describe("User Service", ()=>{
    test("getting all products", async()=>{
        const mockedProducts = [
        {
            id: 1,
            title: "iPhone",
            price: 999,
            description: "Apple phone",
            category: "electronics",
            image: "image.jpg",
            rating: { rate: 4.5, count: 120 },
        },
        {
            id: 2,
            title: "Jacket",
            price: 59.99,
            description: "Winter jacket",
            category: "clothing",
            image: "jacket.jpg",
            rating: { rate: 4.2, count: 75 },
        },
        ];

        mock.onGet("https://fakestoreapi.com/products").reply(200, mockedProducts)

        const response=await getAllProducts()
        expect(response.data).toEqual(mockedProducts)

    })
    test("getting single product", async()=>{
        const mockedProduct = {
            id: 1,
            title: "iPhone",
            price: 999,
            description: "Apple phone",
            category: "electronics",
            image: "image.jpg",
            rating: { rate: 4.5, count: 120 },
        };

        mock.onGet("https://fakestoreapi.com/products/1").reply(200, mockedProduct)

        const response = await getSingleProduct(1)
        expect(response.data).toEqual(mockedProduct)
    })
})