import express from "express";
import {
  register,
  login,
  getAllEmployees,
} from "../controllers/employeeController.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/", getAllEmployees);

export default router;
