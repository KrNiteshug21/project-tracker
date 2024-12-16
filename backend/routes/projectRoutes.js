import express from "express";
import { auth } from "../middleware/auth.js";
import {
  getProjectById,
  getAllProjects,
  createProject,
  deleteProject,
} from "../controllers/projectController.js";
const router = express.Router();

router.use(auth);

router.use("/", createProject);
router.use("/", getAllProjects);
router.use("/:id", getProjectById);
router.use("/:id", deleteProject);

export default router;
