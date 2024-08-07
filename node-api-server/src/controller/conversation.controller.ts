import { Request, Response } from 'express';
import { selectModels } from '../services/conversation.serverices';

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
