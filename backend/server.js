import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import cors from "cors";
const app = express();
const port = process.env.PORT || 3000;

dotenv.config();

app.use(cors());

// middleware to parse json
app.use(express.json());

// connnect to database
connectDB();

app.use("/auth", authRoutes);
app.use("/employee", employeeRoutes);
app.use("/projects", projectRoutes);
app.use("/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
