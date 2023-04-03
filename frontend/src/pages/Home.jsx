import {  Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'
import { chatService } from '../services/chatService'

export const Home = () => {
  const [msg, setMsg] = useState()

  useEffect(() => {
    loadMsg()
  }, [])

  const loadMsg = async () => {
    try {
      const newMsg = await chatService.getHomeMsg()
      setMsg(newMsg)
    } catch (err) {
      console.error('Something went wrong, ', err)
    }
  }

  return (
    <section className='home-page'>
      <h1 className='welcome-msg'>{msg}</h1>
      <Link to='/chat' className='link-to-chat'>To chat click here</Link>
    </section>
  )
}
