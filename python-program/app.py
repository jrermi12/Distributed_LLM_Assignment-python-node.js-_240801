from flask import Flask, request, jsonify
from transformers import pipeline

# create a flas app instance
app = Flask(__name__)


# defining a dictionary to store the availabe models using hugging face pipeline
models = {
    "llama2": pipeline("conversational", model="decapoda-research/llama-2-7b-hf"),
    "mistral": pipeline("conversational", model="bigscience/mistral-7b")
}

#initalized a dictionary to keep track of user conversation
user_conversations = {}

#defined the route to select a model for a specfic user
@app.route('/select_model', methods=['POST'])
def select_model():
    #get the json data from the post request    
    data = request.json

    #extract the userId and modelName from the jsonData
    user_id = data['userId']
    model_name = data['modelName']

    #checking existance of model in our model dictionary
    if model_name not in models:

        #if the model does not exist respon with error
        return jsonify({"error": "Model not found"}), 400

    #if the model exist, initialize the conversation history and selected model 
    user_conversations[user_id] = {"model": models[model_name], "history": []}

    #then reutrn a sucess message 
    return jsonify({"message": f"Model {model_name} selected for user {user_id}"}), 200

# new route and function to handle query
@app.route('/query', methods=['POST'])
def query():

    #extracting userId and query from the json
    data = request.json
    user_id = data['userId']
    query_text = data['query']

    #check if the userId exits in the user_conversation dictionary 
    if user_id not in user_conversations:
        #if the user does not exist respond with error message
        return jsonify({"error": "User has not selected a model"}), 400

    #if the userId exist the model selected and the histroy of the conversation is retrived
    model = user_conversations[user_id]["model"]
    history = user_conversations[user_id]["history"]

    #apending the query to the conversation history
    history.append({"role": "user", "content": query_text})
    # sends the users query to the selected model to generate response
    response = model(query_text, pad_token_id=50256)

    #extracting the generated text from the model response
    response_text = response[0]["generated_text"]

    #appending the response text to the conversation history 
    history.append({"role": "bot", "content": response_text})
    # respinding the response_text 
    return jsonify({"response": response_text}), 200