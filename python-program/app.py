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

