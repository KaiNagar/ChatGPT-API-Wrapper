from flask import Flask
from flask_cors import CORS

from chat import chat

app = Flask(__name__)
CORS(app)
app.register_blueprint(chat,url_prefix='/chat')

@app.route('/')
def index():
    return 'Welcome to ChatGPT API Wrapper!'

if __name__ == '__main__':
    app.run(debug=True, port='8080')
