import axios from "axios"

export const productService = {
    getProducts,
    getResponseFromProduct
}

const API_URL = 'http://127.0.0.1:5000'

async function getProducts() {
    const response = await axios.get(`${API_URL}/product/names`)
    return response.data
}


async function getResponseFromProduct(data) {
    const url = `${API_URL}/${data.product}?date=${data.date}&location=${data.location}`
    console.log(url);
    const response = await axios.get(url)
    return response.data

}