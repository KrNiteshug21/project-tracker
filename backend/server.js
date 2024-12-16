import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
const app = express();
const port = process.env.PORT || 3000;

dotenv.config();

// middleware to parse json
app.use(express.json());

// connnect to database
connectDB();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
