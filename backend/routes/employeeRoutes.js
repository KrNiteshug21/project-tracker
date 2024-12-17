import express from "express";
import {
  getAllEmployees,
  getEmployeeById,
  assignProject,
} from "../controllers/employeeController.js";
const router = express.Router();

router.get("/", getAllEmployees);
router.get("/:id", getEmployeeById);
router.put("/:id", assignProject);

export default router;
