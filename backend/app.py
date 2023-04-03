from flask import Flask

# importing cors for connecting the frontend
from flask_cors import CORS

# made a diffrent file for the chat endpoints for future expantion and to make the app.py file more readable and specific
from chat import chat

app = Flask(__name__)
# added 2 origins to work with this backend using cors, if not specified endpoints could be used from any origin
CORS(app, origins=['http://localhost:3000','http://127.0.0.1:3000'])

# making all the chat endpoints start with /chat to make the code more orgenized
app.register_blueprint(chat, url_prefix='/chat')

# first endpoint requested at '/' returning a simple text , this is presented at the frontend in the home page
@app.route('/')
def index():
    return 'Welcome to ChatGPT API Wrapper!'


# for development used debug true to reload after every change
if __name__ == '__main__':
    app.run(debug=True, port='5000')
