import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
// import router from "./routes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + Typescript Server");
});

/* // auth router attaches routes to the baseURL: '/'
app.use("/", router); */

app.listen(port, () => {
  console.log(`[server]: Server is up on ${port}`);
});
