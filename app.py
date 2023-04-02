from flask import Flask

app = Flask(__name__)


@app.route('/')
def index():
    return 'Welcome to ChatGPT API Wrapper!'

# todo - move to blueprint folder 
@app.route('/chat')
def chat():
    return 'this is from chat'

if __name__ == '__main__':
    app.run(debug=True, port='8080')
