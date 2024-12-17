import Employee from "../models/Employee.js";
import Project from "../models/Project.js";

export const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    return res.status(200).json(employees);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const getEmployeeById = async (req, res) => {
  try {
    const { empId } = req.params;
    const employee = await Employee.findById(empId);
    if (!employee) {
      return res.status(400).json({ message: "Employee does not exist" });
    }
    return res.status(200).json(employee);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const assignProject = async (req, res) => {
  try {
    const empId = req.params.id;
    const { projectId } = req.body;
    console.log("empId", req.params.id);
    console.log("projectId", projectId);

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(400).json({ message: "Project does not exist" });
    }

    const emp = await Employee.findById(empId);
    if (!emp) {
      return res.status(400).json({ message: "Employee does not exist" });
    }

    emp.assignedProjects.push(project);
    const data = await emp.save();

    return res.status(200).json({
      status: "success",
      message: `Project assigned successfully to ${emp.name}`,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ status: "failed", message: error.message });
  }
};
