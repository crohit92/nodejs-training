import { User } from './user.model'
import { Router } from "express";
import { sign } from "jsonwebtoken";
import { router as userMessagesController } from "./messages/messages.controller";

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

router.get("/", (req, res) => {
  User.find((err, users) => {
    if (err) {
      res.status(500).json(err);
      return;
    }
    res.json(users);
  });
})

router.use("/:id/messages", userMessagesController);

export { router };

//users/id/messages?with=otherUserId
