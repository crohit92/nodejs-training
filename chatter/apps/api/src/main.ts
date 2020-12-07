/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
// const express = require("express");
import * as express from 'express';
import { Server } from "socket.io";
import { createServer } from 'http'
import { router as v1Routes } from "./config/routes";
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    allowedHeaders: "*",
    methods: "*",
    origin: "*",
  }
})
app.use("/api/v1", v1Routes);
const port = process.env.port || 3333;
server.listen(port, (err) => {
  console.log(`Listening at http://localhost:${port}/api/v1`);
});
// server.on('error', console.error);
