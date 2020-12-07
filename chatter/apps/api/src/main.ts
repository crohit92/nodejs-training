/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
// const express = require("express");
import * as express from 'express';
import { router as v1Routes } from "./config/routes";
import { json } from "body-parser";
import { connect } from "mongoose";
import * as cors from "cors";
const app = express();
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
    const server = app.listen(port, () => {
      console.log(`Listening at http://localhost:${port}/api/v1`);
    });
    server.on('error', console.error);
  } else {
    console.error(err);
  }
})
