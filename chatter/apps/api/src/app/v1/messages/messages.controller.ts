import { Router } from 'express';
import { Socket } from 'socket.io';
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

export function messagesSocketHandller(socket: Socket) {
  const uid: string = (socket.handshake.query as any).id;
  socket.join(uid);

  socket.on("message", async (message: IMessage) => {
    socket.to(message.to).emit("message", message);
    await saveMessage(message);
  })
}
export { router };
