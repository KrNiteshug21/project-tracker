import jwt from "jsonwebtoken";
import Employee from "../models/Employee.js";

export const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const employee = await Employee.findById(decoded._id);

    if (!employee) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.employee = employee;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Authentication failed" });
  }
};
