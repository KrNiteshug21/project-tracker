import Employee from "../models/Employee.js";

export const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    return res.status(200).json(employees);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getEmployeeById = async (req, res) => {
  try {
    const empId = req.params.id;
    const employee = await Employee.findById(empId)
      .select("-password")
      .populate("assignedProjects");

    if (!employee) {
      return res.status(400).json({ message: "Employee does not exist" });
    }
    return res.status(200).json(employee);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const assignProject = async (req, res) => {
  try {
    const empId = req.params.id;
    const project = req.body;

    const emp = await Employee.findById(empId);
    if (!emp) {
      return res.status(400).json({ message: "Employee does not exist" });
    }

    const projAlreadyAssigned = emp.assignedProjects.find((p) => {
      return p == project._id;
    });
    if (projAlreadyAssigned) {
      return res.status(400).json({
        status: "Failed",
        message: "Project already assigned to employee",
      });
    }

    emp.assignedProjects.push(project);
    const data = await emp.save();

    return res.status(200).json({
      status: "success",
      message: `Project assigned successfully to ${data.name}`,
    });
  } catch (error) {
    return res.status(500).json({ status: "failed", message: error.message });
  }
};

export const updateScores = async (req, res) => {
  try {
    const empId = req.params.id;
    const { scores } = req.body;

    const emp = await Employee.findById(empId);
    if (!emp) {
      return res
        .status(400)
        .json({ status: "failed", message: "Employee does not exist" });
    }

    emp.scores += scores;
    const data = await emp.save();

    return res.status(200).json({
      status: "success",
      message: "Scores updated successfully",
    });
  } catch (error) {
    return res.status(500).json({ status: "failed", message: error.message });
  }
};
