from flask import Flask, jsonify, request

from chat import chat

app = Flask(__name__)
app.register_blueprint(chat,url_prefix='/chat')

@app.route('/')
def index():
    return 'Welcome to ChatGPT API Wrapper!'

if __name__ == '__main__':
    app.run(debug=True, port='8080')
