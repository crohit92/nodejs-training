import { User } from './user.model'
import { Router } from "express";
import { sign } from "jsonwebtoken";
import { Socket } from 'socket.io';

const router = Router();

router.post("/", (req, res) => {
  User.create(req.body).then((user) => {
    res.json(user);
  }).catch(err => res.status(500).json(err));
});

router.post("/login", (req, res) => {
  User.findOne(req.body).then((user: any) => {
    if (user) {
      const _user = user.toObject();
      delete _user.password;
      const token = sign({ _user }, "MYSECRETKEY");
      res.json({ user: _user, token });
      return;
    }
    res.status(401).json({
      message: "User not found"
    });
  }).catch((err) => {
    res.status(500).json(err);
  })
});

router.get("/", (req, res) => {
  User.find((err, users) => {
    if (err) {
      res.status(500).json(err);
      return;
    }
    res.json(users.map((u: any) => {
      const _u = u.toObject();
      delete _u.password;
      return _u;
    }));
  });
})

export const messagesSocketHandller = (socket: Socket) => {
  const uid: string = (socket.handshake.query as any).id;
  socket.join(uid);
  socket.on("message", (message: { to: string, message: string }) => {
    socket.to(message.to).send({ from: uid, to: message.to, data: message.message })
    // Save message in DB
  });

}

export { router };
