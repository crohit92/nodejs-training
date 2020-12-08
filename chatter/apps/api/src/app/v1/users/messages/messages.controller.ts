import { Router } from 'express';
import { Types } from 'mongoose';
import { Message } from '../../messages/message.model';

const router = Router({
  mergeParams: true
});
//users/12/messages?with=13
router.get("/", async (req, res) => {
  res.json(await Message.find({
    $or: [
      {
        from: Types.ObjectId(req.params.id as string),
        to: Types.ObjectId(req.query.with as string)
      },
      {
        from: Types.ObjectId(req.query.with as string),
        to: Types.ObjectId(req.params.id as string)
      }
    ]
  }));
})

export { router };
