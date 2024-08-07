import { Request, Response } from 'express';
import { getConversationById, getConversationHistory, selectModels, sendQuerys } from '../services/conversation.services';

export const selectModel = async (req: Request, res: Response) => {
    const { userId, modelName } = req.body;
    try {
        const model = await selectModels(userId, modelName);
        res.status(200).json({ 
            message: `Model ${modelName} selected for user ${userId}`, 
            data: model.data 
        });
    } catch (error) {
        res.status(500).json({ error: 'Error selecting model' });
    }
};

export const sendQuery = async (req: Request, res: Response) => {
    try {
        const { userId, query } = req.body;

        const response = await sendQuerys(userId, query)
        res.status(200).json(response.response);
    } catch (error) {
        res.status(500).json({ error: 'Error sending query to model' });
    }
};

export const getHistory = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
        const history = await getConversationHistory(userId)
        res.status(200).json(history);
    } catch (error) {
        res.status(500).json({ error: 'Error getting conversation history' });
    }
};

export const getConversation = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const conversation = await getConversationById(id)
        res.status(200).json(conversation);
    } catch (error) {
        res.status(500).json({ error: 'Error getting conversation' });
    }
};