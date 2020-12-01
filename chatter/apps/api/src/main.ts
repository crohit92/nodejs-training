/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
// const express = require("express");
import * as express from 'express';
import { router as v1Routes } from "./config/routes";
const app = express();

app.use("/api/v1", v1Routes);
const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api/v1`);
});
server.on('error', console.error);
