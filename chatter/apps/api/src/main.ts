/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
// const express = require("express");
import * as express from 'express';
import { router as v1Routes } from "./config/routes";
import { json } from "body-parser";
import { connect } from "mongoose";
import { createServer } from "http";
import * as cors from "cors";
import { Server, Socket } from "socket.io";
import { messagesSocketHandller } from './app/v1/messages/messages.controller';
const app = express();

const server = createServer(app);
const io = new Server(server, {
  cors: {
    methods: "*",
    origin: "*",
    allowedHeaders: "*"
  },
});

io.on("connection", (socket: Socket) => {
  messagesSocketHandller(socket);
})

app.use(cors({
  methods: "*",
  origin: "*",
  allowedHeaders: "*"
}))
app.use(json());
app.use("/api/v1", v1Routes);
const port = process.env.port || 3333;
connect("mongodb://localhost:27017/chatter", (err) => {
  if (!err) {
    server.listen(port, () => {
      console.log(`Listening at http://localhost:${port}/api/v1`);
    });
    // server.on('error', console.error);
  } else {
    console.error(err);
  }
});
