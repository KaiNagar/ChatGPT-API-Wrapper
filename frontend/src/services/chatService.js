import axios from "axios";

export const chatService = {
    getHomeMsg,
    sendMsg
}

const API_URL = 'http://127.0.0.1:5000/'

async function getHomeMsg() {
    try{
        const response = await axios.get(API_URL)
        return response.data
    }catch (err){
       throw err
    }
}

async function sendMsg(message){
    // message = null // to check for errors uncomment this and send something
    try{
        const response = await axios.post(`${API_URL}/chat/`,{message})
        return response.data
    }catch(err){
        throw err
    }
}