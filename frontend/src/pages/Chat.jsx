import { useState } from 'react'
import { chatService } from '../services/chatService'

export const Chat = () => {
  const [inputValue, setInputValue] = useState('')
  const [responseFromChat, setResponseFromChat] = useState('')

  const onChangeInput = ({ target }) => {
    const { value } = target
    setInputValue(value)
  }

  const onSubmitForm =async  (ev) => {
    ev.preventDefault()
    const response = await chatService.sendMsg(inputValue)
    console.log(response);
    setInputValue('')
  }

  return (
    <section className='chat-page'>
      <h1>Go on! Talk to me please!</h1>
      <div className='response-from-chat'>{responseFromChat}</div>
      <form className='chat-form' onSubmit={(e) => onSubmitForm(e)}>
        <input
          type='text'
          value={inputValue}
          onChange={onChangeInput}
          placeholder='Tell me somethine please...'
        />
      </form>
    </section>
  )
}
