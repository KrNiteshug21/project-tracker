import Emplyee from "../models/Emplyee";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  const body = req.body;
  console.log("body", body);
  const { name, email, password } = body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const hashPwd = bcrypt.hash(password, 10);

  const emp = Emplyee.create({ name, email, password: hashPwd });

  return res.status(201).json({ message: "Employee registered successfully" });
};

export const login = async (req, res) => {
  const body = req.body;
  console.log("body", body);
  const { email, password } = body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const emp = Emplyee.findOne({ email });
  if (!emp) {
    return res.status(400).json({ message: "Invalid email" });
  }

  const isMatch = bcrypt.compare(password, emp.password);
  if (!isMatch) {
    return res
      .status(400)
      .json({ message: "Email and password did not matched!" });
  }

  return res.status(200).json({ message: "Employee logged in successfully" });
};
