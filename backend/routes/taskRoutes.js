import express from "express";
import { auth } from "../middleware/auth.js";
import {
  getTaskById,
  getAllTasks,
  createTask,
  deleteTask,
  updateTask,
  getTaskByEmployee,
} from "../controllers/taskController.js";
const router = express.Router();

router.use(auth);

router.post("/", createTask);
router.get("/", getAllTasks);
router.get("/employee/:id", getTaskByEmployee);
router.get("/:id", getTaskById);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
