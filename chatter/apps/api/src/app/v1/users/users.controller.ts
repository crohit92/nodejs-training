import { User } from './user.model'
import { Router } from "express";
import { sign } from "jsonwebtoken";

const router = Router();

router.post("/", (req, res) => {
  User.create(req.body).then((user) => {
    res.json(user);
  }).catch(err => res.status(500).json(err));
});

router.post("/login", (req, res) => {
  User.findOne(req.body).then((user: any) => {
    if (user) {
      const token = sign({ username: user.username, password: user.password }, "MYSECRETKEY");
      res.json({ token });
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

export { router };
