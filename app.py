from flask import Flask, jsonify, request
import requests
import json

app = Flask(__name__)


@app.route('/')
def index():
    return 'Welcome to ChatGPT API Wrapper!'

# todo - move to blueprint folder


@app.route('/chat', methods=['POST'])
def chat():
    try:
        message = request.json['message']
    except KeyError:
        return jsonify({'error': 'No message was sent.'}), 400

    #  buidling the request to the chatGPT api
    chatgpt_url = "https://api-inference.huggingface.co/models/EleutherAI/gpt-neo-2.7B"
    try:
        response = requests.post(chatgpt_url, message)
        result = json.loads(response.content.decode('utf-8'))
        generated_text = result[0]["generated_text"]
        return generated_text
    except requests.exceptions.HTTPError as e:
        return jsonify({'error':str(e)})



if __name__ == '__main__':
    app.run(debug=True, port='8080')
