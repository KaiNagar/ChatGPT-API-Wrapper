from flask import Flask
from flask_cors import CORS

from chat import chat

app = Flask(__name__)
CORS(app, origins=['http://localhost:3000','http://127.0.0.1:3000'])
app.register_blueprint(chat, url_prefix='/chat')


@app.route('/')
def index():
    print('hey')
    return 'Welcome to ChatGPT API Wrapper!'


if __name__ == '__main__':
    app.run(debug=True, port='5000')
