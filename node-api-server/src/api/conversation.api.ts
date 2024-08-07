import express from "express";
import { selectModel, sendQuery, getHistory, getConversation } from '../controller/conversation.controller';

const router = express.Router()


router.post('/select-model', selectModel);
router.post('/query', sendQuery);
router.get('/history/:userId', getHistory);
router.get('/conversation/:id', getConversation);

export default router;