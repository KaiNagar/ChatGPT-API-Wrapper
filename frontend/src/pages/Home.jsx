import { useEffect } from 'react'
import { useState } from 'react'
import { chatService } from '../services/chatService'

export const Home = () => {
  const [msg, setMsg] = useState()

  useEffect(() => {
    // loadMsg()
    fetch('http://127.0.0.1:8080/')
        .then(res=> console.log(res))
  }, [])

  const loadMsg = async () => {
    try{

        const newMsg = await chatService.getHomeMsg()
            console.log(newMsg)
        }catch(err){
            console.error('Something went wrong, ',err);
        }
  }

  return <section className='home-page'>{msg}</section>
}
