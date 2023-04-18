from flask import Flask, jsonify, request

# importing cors for enabling requests from frontend
from flask_cors import CORS

# adding the interview project
from routes import data

# made a different file for the chat endpoints for future expansion and to make the app.py file more readable and specific
from chat import chat
from product import product

app = Flask(__name__)

# added 2 origins to work with this backend using cors, if not specified endpoints could be used from any origin
CORS(app, origins=['http://localhost:3000', 'http://127.0.0.1:3000'])

# making all the chat endpoints start with /chat to make the code more organized
app.register_blueprint(chat, url_prefix='/chat')
app.register_blueprint(product, url_prefix='/product')

# first endpoint requested at '/' returning a simple text, this is presented at the frontend on the home page


@app.route('/')
def index():
    return 'Welcome to ChatGPT API Wrapper!'

# function that will create each endpoint


def create_view_func(args, prompt):
    # to prevent closure problems we need to create for each endpoints a new view_func with a new pointer
    def view_func():
        # Parse the request arguments
        request_args = {}
        for arg in args:
            name = arg.get('name')
            arg_type = arg.get('type')
            value = None
            # validating each type
            if arg_type == 'string':
                value = request.args.get(name).title()
            elif arg_type == 'integer':
                value = int(request.args.get(name))
            elif arg_type == 'float':
                value = float(request.args.get(name))
            elif arg_type == 'boolean':
                value = request.args.get(name).lower() == 'true'
            elif arg_type == 'date-time':
                value = request.args.get(name)
            request_args[name] = value

        # building the response back to the frontend/user
        response = {}
        for msg in prompt["messages"]:
            role = msg["role"]
            content = msg["content"]
            for arg in args:
                arg_name = arg["name"]
                arg_value = request_args.get(arg_name, "")
                content = content.replace(f"{{{arg_name}}}", str(arg_value))
            response[role] = content
        return jsonify(response)

    return view_func


# creating an endpoint for each item in the data array
for item in data:
    path = item.get('path')
    args = item.get('args', [])
    prompt = item.get('prompt')

    # this line creates a new endpoint using the function above for each path specified in data
    # right now all methods are GET by default but we can add to each route a property specifying what kind of method it is
    # then extract it from the request and use it in here
    app.add_url_rule(f'/{path}', view_func=create_view_func(args,
                     prompt), methods=['GET'], endpoint=path)

# for development, use debug mode to automatically reload the server after every change
if __name__ == '__main__':
    app.run(debug=True, port='5000')
