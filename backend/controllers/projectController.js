import Project from "../models/Project.js";
import Task from "../models/Task.js";
// getProjectById, getAllProjects, createProject, updateProject, deleteProject

export const getProjectById = async (req, res) => {
  try {
    const projectId = req.params.id;

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
    return res.status(500).json({ status: "failed", message: error.message });
  }
};

export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    return res.status(200).json(projects);
  } catch (error) {
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

    const projectExists = await Project.findOne({ title });
    if (projectExists) {
      return res.status(400).json({ message: "Project already exists" });
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
    return res.status(500).json({ message: error.message });
  }
};

export const AddTaskToProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const taskToAdd = req.body;

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

    const taskExists = project.tasks.find((task) => task.title === title);
    if (taskExists) {
      return res
        .status(400)
        .json({ status: "failed", message: "Task already exists!" });
    }

    const task = await Task.create({
      title,
      description,
      score,
      projectId,
      status: "Pending",
    });

    project.tasks.push(task);
    const response = await project.save();

    return res.status(200).json({
      status: "success",
      message: `${task.title} added as task succesfully`,
    });
  } catch (error) {
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
    return res.status(500).json({ message: error.message });
  }
};

export const createTasks = async (req, res) => {
  try {
    const projectId = req.params.id;
    const tasks = req.body;

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    tasks.forEach(async (task) => {
      const taskExists = await Task.findOne({ title: task.title });
      if (taskExists) {
        console.log("task already exists");
        return;
      } else {
        const newTask = await Task.create(task);
        console.log("newTask", newTask);
        project.tasks.push(newTask);
        await project.save();
        return;
      }
    });

    const response = await project.save();
    return res.status(201).json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
