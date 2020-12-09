import { User } from './user.model'
import { Router } from "express";
import { sign, verify } from "jsonwebtoken";
import { router as userMessagesController } from "./messages/messages.controller";
import { Types } from 'mongoose';

const router = Router();

router.post("/", (req, res) => {
  User.create(req.body).then((user) => {
    res.json(user);
  }).catch(err => res.status(500).json(err));
});

router.post("/login", (req, res) => {
  User.findOne(req.body).then((user: any) => {
    if (user) {
      const payload = { name: user.name, username: user.username, _id: user._id };
      const token = sign(payload, "MYSECRETKEY");
      res.json({ user: payload, token });
      return;
    }
    res.status(401).json({
      message: "User not found"
    });
  }).catch((err) => {
    res.status(500).json(err);
  })
});

router.get("/", (req, res, next) => {
  const token = req.get("authorization").split(" ").pop();
  verify(token, "MYSECRETKEY", (err, payload) => {
    if (err) {
      res.status(500).json(err);
    } else {
      (req as any).uid = (payload as any)._id;
      next();
    }
  })
}, (req, res) => {
  User.find({
    _id: { $ne: Types.ObjectId((req as any).uid) }
  }).select("-password").then((users) => {
    res.json(users);
  }).catch(err => {
    res.status(500).json(err);
    return;
  });
})

router.use("/:id/messages", userMessagesController);

export { router };

//users/id/messages?with=otherUserId
