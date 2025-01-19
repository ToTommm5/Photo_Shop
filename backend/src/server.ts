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

const photosDir = path.resolve(__dirname, "../public/photos");
app.use("/photos", express.static(photosDir));

const logosDir = path.resolve(__dirname, "../public/logo_epreuve");
app.use("/logo", express.static(logosDir));

const port = 5001;
app.listen(port, () => {
  console.log("Le site est connecté à http://localhost:" + port);
});

app.get("/api/data", (req, res) => {
  res.sendFile(path.join(__dirname, "data.json"));
});
