import axios from "axios";

export const chatService = {
    getHomeMsg,
    sendMsg
}

const API_URL = 'http://127.0.0.1:8080'

async function getHomeMsg() {
    try{
        const response = await axios.get(API_URL)
        return response.data
    }catch (err){
        console.error('Something went wrong at endpoint,',err);
    }
}

async function sendMsg(message){
    try{
        const response = await axios.post(`${API_URL}/chat/`,{message})
        return response.data
    }catch(err){
        console.error('Something went wrong at endpoint,',err);
    }
}