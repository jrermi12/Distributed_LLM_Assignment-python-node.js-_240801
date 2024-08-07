import axios from "axios";

export const selectModels = async (userId: string, modelName: string) => {
    try {
        const response = await axios.post('http://python-program:5000/select-model', { userId, modelName });
        return response;
    } catch (error) {
        throw new Error('Error while selecting model: ' + error.message);
    }
};
