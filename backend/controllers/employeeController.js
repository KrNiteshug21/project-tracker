import Employee from "../models/Employee.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const empExist = await Employee.findOne({ email });
    if (empExist) {
      return res.status(400).json({ message: "Employee already exists" });
    }

    const hashPwd = await bcrypt.hash(password, 10);
    const emp = await Employee.create({ name, email, password: hashPwd });

    // Generate token
    const token = jwt.sign({ _id: emp._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    return res
      .status(201)
      .json({ message: "User created successfully", token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const emp = await Employee.findOne({ email });
    if (!emp) {
      return res.status(400).json({ message: "Invalid email" });
    }

    const isMatch = await bcrypt.compare(password, emp.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Email and password did not matched!" });
    }

    const token = jwt.sign({ _id: emp._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    return res
      .status(200)
      .json({ message: "Employee logged in successfully", token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    return res.status(200).json(employees);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
