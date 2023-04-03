from flask import Blueprint, request, jsonify
import requests
import json

chat = Blueprint(__name__, 'chat')


@chat.route('/', methods=['POST'])
def chat_post():
    try:
        message = request.json['message']
    except KeyError:
        return jsonify({'error': 'No message was sent.'}), 400

    chatgpt_url = "https://api-inference.huggingface.co/models/EleutherAI/gpt-neo-2.7B"
    headers = {
        'Content-Type': 'application/json'
    }
    data = {
        'inputs': message,
        'options': {
            'generate_length': 500,  # for max length per response i set it to 500 characters
            'max_time': 10
        }
    }
    try:
        response = requests.post(chatgpt_url, headers=headers, json=data)
        result = json.loads(response.content.decode('utf-8'))
        generated_text = result[0]["generated_text"]
        return generated_text
    except requests.exceptions.HTTPError as e:
        return jsonify({'error': str(e)})
