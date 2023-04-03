import { useState } from 'react'
import { Link } from 'react-router-dom'
import { chatService } from '../services/chatService'

export const Chat = () => {
  const [inputValue, setInputValue] = useState('')
  const [prevInputValue, setPrevInputValue] = useState()
  const [responseFromChat, setResponseFromChat] = useState('')

  const [isWaiting, setIsWaiting] = useState(false)

  const onChangeInput = ({ target }) => {
    const { value } = target
    setInputValue(value)
  }

  const onSubmitForm = async (ev) => {
    ev.preventDefault()
    setIsWaiting(true)
    const response = await chatService.sendMsg(inputValue)
    setIsWaiting(false)
    setResponseFromChat(response)
    setPrevInputValue(inputValue)
    setInputValue('')
  }

  return (
    <section className='chat-page flex column space-between'>
      <div className='headers'>
        <h1 className='chat-header'>Go on! Talk to me please!</h1>
        <h3 className='chat-prev-value'>
          {prevInputValue && `Input: ${prevInputValue}`}
        </h3>
      </div>
      <div className='response-from-chat'>{responseFromChat}</div>
      <form className='chat-form' onSubmit={(e) => onSubmitForm(e)}>
        <div className='input-container flex align-center'>
          <input
            type='text'
            value={inputValue}
            onChange={onChangeInput}
            placeholder='Tell me somethine please...'
          />
          {!isWaiting ? (
            <span onClick={onSubmitForm} className='send-icon'>
              <img
              className='send-icon-img'
                src='https://cdn-icons-png.flaticon.com/512/786/786205.png'
                alt='send msg icon'
              />
            </span>
          ) : <img className='loading-icon' src='https://i.stack.imgur.com/h6viz.gif' />}
        </div>
      </form>
    </section>
  )
}
