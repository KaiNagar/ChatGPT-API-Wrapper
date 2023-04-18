import { useEffect, useState } from 'react'
import { productService } from '../services/productService'
import { ProductList } from '../cmps/product/ProductList'

export const Products = () => {
  const [productsNames, setProductsNames] = useState()
  const [selectedData, setSelectedData] = useState({
    location: '',
    date: '',
    product: '',
  })

  const [chatResponse, setChatResponse] = useState()

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    const names = await productService.getProducts()
    setProductsNames(names)
  }

  const onSetProduct = (productType) => {
    console.log(productType.toLowerCase() );
    setSelectedData((prevData) => ({ ...prevData, product: productType.toLowerCase() }))
  }

  const onChange = ({ target }) => {
    const { value, name } = target
    setSelectedData((prevData) => ({ ...prevData, [name]: value }))
  }

  const onSendData =async () => {
    const response = await productService.getResponseFromProduct(selectedData)
    console.log(response);
  }

  if (!productsNames)
    return (
      <img className='loading-icon' src='https://i.stack.imgur.com/h6viz.gif' />
    )
  return (
    <section className='product-page'>
      <h1>Select a product to use</h1>
      <ProductList setProduct={onSetProduct} productsNames={productsNames} />
      {selectedData.product && (
        <div className='select-data'>
          <h1>You chose: {selectedData.product}</h1>
          <h3>Pick a date to check at</h3>
          <input onChange={onChange} name='date' type='date' />
          <h3>Pick a location to check on</h3>
          <input
            onChange={onChange}
            type='text'
            name='location'
            placeholder='Enter a real Location please'
          />
          <button onClick={onSendData}>Submit</button>
        </div>
      )}
    </section>
  )
}
