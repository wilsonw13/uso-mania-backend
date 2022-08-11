import { Request, Response, NextFunction } from "express";
const express = require("express");
const cors = require("cors");
const port = process.env.Port || 8000;
const app = express();
const routes = require("./routes.ts");
// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(cors());
//takes the raw request and turns them into usable properties on req.body
app.use(express.json());
app.use(express.urlencoded());
app.use(function (req: Request, res: Response, next: NextFunction) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use("/", routes);

app.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
