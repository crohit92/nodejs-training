import { Router } from 'express';
import { IMessage, Message } from './message.model';

const router = Router();

// messages
router.post("/", async (req, res) => {
  const message: IMessage = req.body;
  const result = await saveMessage(message);
  res.json(result);
});

router.get('/', (req, res, next) => {
  res.send('<h1>Hello world. I am Express!</h1>');
});

export async function saveMessage(message: IMessage) {
  return await Message.create(message);
}
export { router };
