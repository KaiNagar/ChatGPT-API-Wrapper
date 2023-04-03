import { useEffect } from 'react'
import { useState } from 'react'
import { chatService } from '../services/chatService'

export const Home = () => {
  const [msg, setMsg] = useState()

  useEffect(() => {
    loadMsg()
  }, [])

  const loadMsg = async () => {
    try{

        const newMsg = await chatService.getHomeMsg()
            setMsg(newMsg)
        }catch(err){
            console.error('Something went wrong, ',err);
        }
  }

  return <section className='home-page'>{msg}</section>
}
