import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { DBConnect } from "./db.js";
import userRouter from "./routes/user.js";
import analyzeRouter from "./routes/analyze.js";


DBConnect();
const app = express();
app.use(express.json());
const PORT = process.env.PORT;

app.use("/api/v1/user", userRouter);
app.use("/api/v1/image", analyzeRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})