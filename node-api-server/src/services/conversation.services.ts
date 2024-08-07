import axios from "axios";
import conversationModel from "../models/conversation.model";

export const selectModels = async (userId: string, modelName: string) => {
    try {
        const response = await axios.post('http://python-program:5000/select-model', { userId, modelName });
        return response;
    } catch (error) {
        throw new Error('Error while selecting model: ' + error.message);
    }
};


export const sendQuerys = async(userId: string, query:string) => {
    const response = await axios.post('http://python-program:5000/query', { userId, query });
    const { data } = response;

    const newConversation = new conversationModel({
        userId,
        query,
        response: data.response
    });
    await newConversation.save();

    return newConversation
}