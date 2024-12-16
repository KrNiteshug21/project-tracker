import express from "express";
import { auth } from "../middleware/auth.js";
import {
  getTaskById,
  getAllTasks,
  createTask,
  deleteTask,
  updateTask,
} from "../controllers/taskController.js";
const router = express.Router();

router.use(auth);

router.use("/", createTask);
router.use("/", getAllTasks);
router.use("/:id", getTaskById);
router.use("/:id", updateTask);
router.use("/:id", deleteTask);

export default router;
