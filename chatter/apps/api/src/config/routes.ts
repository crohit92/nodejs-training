import { Router } from "express";
import { router as messagesController } from "../app/v1/messages/messages.controller";
import { router as usersController } from "../app/v1/users/users.controller";
const router = Router();

router.use("/messages", messagesController);
router.use("/users", usersController);

export { router };
