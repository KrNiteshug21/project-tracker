import express from "express";
import { register, login } from "../controllers/employeeController";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
