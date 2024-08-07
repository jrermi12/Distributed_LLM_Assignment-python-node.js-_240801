import express from "express";

import conversation from "./conversation.api"

const router = express.Router()

router.use("/conversation", conversation)

export default router;