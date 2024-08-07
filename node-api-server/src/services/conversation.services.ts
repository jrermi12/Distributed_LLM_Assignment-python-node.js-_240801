import axios from "axios";
import conversationModel from "../models/conversation.model";
import NotFoundError from "../error/notFound.errors";
import { ErrorCode } from "../error/custom.errors";

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

export const getConversationHistory = async(userId: string) => {
    const conversations = await conversationModel.find({ userId }).sort({ createdAt: -1 });
    if (!conversations) throw new NotFoundError("conversation not found", ErrorCode.ITEM_NOT_FOUND)

    return conversations
}


export const getConversationById = async(id: string) => {
    const conversation = await conversationModel.findById(id);
    if (!conversation) throw new NotFoundError("conversation not found", ErrorCode.ITEM_NOT_FOUND)

    return conversation
}