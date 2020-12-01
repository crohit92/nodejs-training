import { Router } from "express";
import { router as messagesController } from "../app/v1/messages/messages.controller";
const router = Router();

router.use("/messages", messagesController);

export { router };
