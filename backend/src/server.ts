import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import express from "express";
import path from "path";
import { dbConnect } from "./configs/database.config";
import photoRouter from "./routers/photo.router";
import userRouter from "./routers/user.router";

dbConnect();
const app = express();
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4200"],
  })
);

app.use("/api/photos", photoRouter);
app.use("/api/users", userRouter);

const publicDir = path.resolve(__dirname, "../public/photos");
app.use("/photos", express.static(publicDir));

const port = 5001;
app.listen(port, () => {
  console.log(publicDir);
  console.log("Le site est connecté à http://localhost:" + port);
});
