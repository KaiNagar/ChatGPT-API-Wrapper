from flask import Blueprint, request, jsonify
import requests
import json

chat = Blueprint(__name__, 'chat')

# second endpoint requested at /chat, i use prefix `/chat` so here all we need is a simple '/'
@chat.route('/', methods=['POST'])
def chat_post():
    # catching the message from request body,if there is no message will return an error in json format to be collected at the front end
    try:
        message = request.json['message']
    except KeyError:
        return jsonify({'error': 'No message was sent.'}), 400

    # bulding the chat request with chatgpt URL 
    chatgpt_url = "https://api-inference.huggingface.co/models/EleutherAI/gpt-neo-2.7B"
    # Headers (can add here authorization with API key but this is a free API so there is no need for that)
    headers = {
        'Content-Type': 'application/json'
    }
    # and data - for longer response i set the response length to 500 characters
    data = {
        'inputs': message,
        'options': {
            'generate_length': 500,  
            'max_time': 10
        }
    }

    # request it self, if at any stage something went wrong it will catch the error
    # and throw it back to the frontend for the user to know somethign went wrong
    try:
        # making a post request with url headers and data
        response = requests.post(chatgpt_url, headers=headers, json=data)

        # after getting the respone converting the json formatted string into a python dictionary object
        # then taking the contect and converting into a string object using 'utf-8' encoding
        result = json.loads(response.content.decode('utf-8'))
        
        # taking only the text inself from the result and returning it to the frontend
        generated_text = result[0]["generated_text"]
        return generated_text
    except requests.exceptions.HTTPError as e:
        return jsonify({'error': str(e)})
