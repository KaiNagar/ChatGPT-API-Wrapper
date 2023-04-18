import { useEffect, useState } from 'react'
import { productService } from '../services/productService'
import { ProductList } from '../cmps/product/ProductList'
import { showErrorMsg } from '../services/event-bus.service'
import { chatService } from '../services/chatService'

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
    try {
      const names = await productService.getProducts()
      setProductsNames(names)
    } catch (err) {
      showErrorMsg('Something went wrong')
    }
  }

  const onSetProduct = (productType) => {
    console.log(productType.toLowerCase())
    setSelectedData((prevData) => ({
      ...prevData,
      product: productType.toLowerCase(),
    }))
  }

  const onChange = ({ target }) => {
    const { value, name } = target
    setSelectedData((prevData) => ({ ...prevData, [name]: value }))
  }

  const onSendData = async () => {
    if (!selectedData.date || !selectedData.location || !selectedData.product) {
      return showErrorMsg('You must pick date location and a product')
    }
    try {
      const response = await productService.getResponseFromProduct(selectedData)
      const chatAnswer = await chatService.sendMsg(response.user)
      setChatResponse({ system: response.system, ans: chatAnswer })
    } catch (err) {
      showErrorMsg('Something went wrong talking with the chat')
    }
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
        <div className='response-container flex'>
          <div className='select-data'>
            <h1>You chose: {selectedData.product}</h1>
            <h3>Pick a date to check at</h3>
            <input onChange={onChange} name='date' type='date' />
            <h3>Pick a {
                selectedData.product === 'game' ? 'team' : 'location'
              } to check on</h3>
            <input
              onChange={onChange}
              type='text'
              name='location'
              placeholder={`Enter a real ${
                selectedData.product === 'game' ? 'team' : 'location'
              } please`}
            />
            <button className='submit-btn' onClick={onSendData}>
              Submit
            </button>
          </div>
          {chatResponse && (
            <div className='chat-response'>
              <h4>{chatResponse.system}</h4>
              <h5>{chatResponse.ans}</h5>
            </div>
          )}
        </div>
      )}
    </section>
  )
}
