from flask import Flask, jsonify, request

# importing cors for enabling requests from frontend
from flask_cors import CORS

# adding the interview project
from routes import data
from datetime import datetime
# made a diffrent file for the chat endpoints for future expantion and to make the app.py file more readable and specific
from chat import chat

app = Flask(__name__)
# added 2 origins to work with this backend using cors, if not specified endpoints could be used from any origin
CORS(app, origins=['http://localhost:3000', 'http://127.0.0.1:3000'])

# making all the chat endpoints start with /chat to make the code more organizied
app.register_blueprint(chat, url_prefix='/chat')

# first endpoint requested at '/' returning a simple text , this is presented at the frontend in the home page


@app.route('/')
def index():
    return 'Welcome to ChatGPT API Wrapper!'

# running on all routes to create endpoints


for item in data:
    path = item.get('path')
    args = item.get('args', [])
    prompt = item.get('prompt')

    # Define the route function
    @app.route(f'/{path}', methods=['GET'])
    def create_routes():
        # Parse the request arguments
        request_args = {}
        for arg in args:
            name = arg.get('name')
            arg_type = arg.get('type')
            value = None

            # validating each type
            if arg_type == 'string':
                value = request.args.get(name)
            elif arg_type == 'integer':
                value = int(request.args.get(name))
            elif arg_type == 'float':
                value = float(request.args.get(name))
            elif arg_type == 'boolean':
                value = request.args.get(name).lower() == 'true'
            elif arg_type == 'date-time':
                value = request.args.get(name)
            request_args[name] = value

        # bulding the response back to the fronend/ user
        response = {}
        for msg in prompt["messages"]:
            role = msg["role"]
            content = msg["content"].format(
                date=request_args.get("date", ""),
                location=request_args.get("location", "")
            )
            response[role] = content

        return jsonify(response)


# for development used debug true to reload after every change
if __name__ == '__main__':
    app.run(debug=True, port='5000')
