import Task from "../models/Task.js";
// createTask, getTaskById, getAllTasks, updateTask, deleteTask

export const createTask = async (req, res) => {
  const body = req.body;
  console.log("createTask", body);

  const { title, description, score, employeeId, projectId } = body;

  if (!title || !description || !score || !employeeId || !projectId) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const task = await Task.create({
    title,
    description,
    score,
    employeeId,
    projectId,
    status: "pending",
  });

  return res.status(201).json(task);
};

export const getTaskById = async (req, res) => {
  const taskId = req.params.id;
  const task = await Task.findById(taskId);
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  return res.status(200).json(task);
};

export const getAllTasks = async (req, res) => {
  const tasks = await Task.find();
  return res.status(200).json(tasks);
};

export const updateTask = async (req, res) => {
  const taskId = req.params.id;
  const body = req.body;
  const { status } = body;

  const task = await Task.findById(taskId);
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  task.status = status;
  const data = await task.save();
  return res
    .status(200)
    .json({ message: `${data.title} updated successfully` });
};

export const deleteTask = async (req, res) => {
  const taskId = req.params.id;
  const task = await Task.findById(taskId);
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  const data = await task.deleteOne();
  return res
    .status(200)
    .json({ message: `${data.title} deleted successfully` });
};
