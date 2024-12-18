import express from "express";
import {
  getAllEmployees,
  getEmployeeById,
  assignProject,
  updateScores,
} from "../controllers/employeeController.js";
const router = express.Router();

router.get("/", getAllEmployees);
router.get("/:id", getEmployeeById);
router.put("/:id/assign", assignProject);
router.put("/:id/updateScores", updateScores);

export default router;
