import express from "express";
import { auth } from "../middleware/auth.js";
import {
  getProjectById,
  getAllProjects,
  createProject,
  deleteProject,
  AddTaskToProject,
} from "../controllers/projectController.js";
const router = express.Router();

router.use(auth);

router.post("/", createProject);
router.get("/", getAllProjects);
router.get("/:id", getProjectById);
router.put("/:id", AddTaskToProject);
router.delete("/:id", deleteProject);

export default router;
