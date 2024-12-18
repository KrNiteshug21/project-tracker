import Project from "../models/Project.js";
import Task from "../models/Task.js";
// getProjectById, getAllProjects, createProject, updateProject, deleteProject

export const getProjectById = async (req, res) => {
  try {
    const projectId = req.params.id;
    console.log("projectId", projectId);

    const project = await Project.findById(projectId).populate("tasks");
    if (!project) {
      return res
        .status(404)
        .json({ status: "failed", message: "Project not found" });
    }

    return res.status(200).json({
      status: "success",
      message: "Project fetched Succesfully",
      project,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ status: "failed", message: error.message });
  }
};

export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    return res.status(200).json(projects);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const createProject = async (req, res) => {
  try {
    const body = req.body;
    const { title, description, startDate, endDate } = body;

    if (!title || !description || !startDate || !endDate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const project = await Project.create({
      title,
      description,
      startDate,
      endDate,
      tasks: [],
    });

    return res.status(201).json(project);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const AddTaskToProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const taskToAdd = req.body;
    console.log("taskToAdd", taskToAdd);

    const { title, description, score } = taskToAdd;
    if (!title || !description || !score) {
      return res
        .status(400)
        .json({ status: "failed", message: "All fields are required!" });
    }

    const project = await Project.findById(projectId);
    if (!project) {
      return res
        .status(400)
        .json({ status: "failed", message: "Project not found!" });
    }
    console.log("project", project);

    const task = await Task.create({
      title,
      description,
      score,
      projectId,
      status: "Pending",
    });
    console.log("task", task);

    project.tasks.push(task);
    const response = await project.save();
    console.log("response", response);

    return res.status(200).json({
      status: "success",
      message: `${task.title} added as task succesfully`,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ status: "failed", message: error.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const data = await project.deleteOne();

    return res
      .status(200)
      .json({ message: `${project.title} deleted successfully` });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};
