import axios from "axios"
import { chatService } from "./chatService"

export const productService = {
    getProducts,
    getResponseFromProduct,
}

const API_URL = 'http://127.0.0.1:5000'

async function getProducts() {
    try {
        const response = await axios.get(`${API_URL}/product/names`)
        return response.data
    } catch (err) {
        console.error('Something went wrong,', err);
        throw err
    }
}


async function getResponseFromProduct(data) {
    try {
        const url = `${API_URL}/${data.product}?date=${data.date}&location=${data.location}`
        const response = await axios.get(url)
        return response.data
    } catch (err) {
        console.error('Something went wrong,', err);
        throw err
    }
}
