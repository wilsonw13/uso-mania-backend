import express from "express";
import cors from "cors";
const port = process.env.Port || 8000;
const app = express();
import router from "./routes";
// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(cors());
//takes the raw request and turns them into usable properties on req.body
app.use(express.json());
app.use(express.urlencoded());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  })
);

app.use("/", router);

app.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
