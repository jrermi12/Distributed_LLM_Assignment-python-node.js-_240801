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

@app.route('/query', methods=['POST'])
def query():
    # Get JSON data from the request
    data = request.json
    user_id = data.get('userId')
    query_text = data.get('query')

    # Check if a model has been selected for the user
    if user_id not in user_conversations or not user_conversations[user_id]["model"]:
        return jsonify({"error": "No model selected for user"}), 400

    model = user_conversations[user_id]["model"]
    history = user_conversations[user_id]["history"]

    # Create a conversational object with history
    conversation = {
        "history": history,
        "query": query_text
    }

    # Get response from the model
    response = model(conversation)
    response_text = response.get('generated_text', '')

    # Update conversation history
    user_conversations[user_id]["history"].append({
        "query": query_text,
        "response": response_text
    })

    return jsonify({"response": response_text}), 200


#created a route and function to send the the conversation history of a user by userId
@app.route('/history/<user_id>', methods=['GET'])
def get_history(user_id):
    #check if the user hava any conversation by userId in user_conversation dictionary
    if user_id not in user_conversations:
        #if user_id not found send an error with error message no conversation found
        return jsonify({"error": "No conversation history for this user"}), 400
    #if user_id has conversation respond witht the history 
    history = user_conversations[user_id]["history"]
    return jsonify({"history": history}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)