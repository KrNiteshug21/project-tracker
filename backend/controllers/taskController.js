import Task from "../models/Task.js";
// createTask, getTaskById, getAllTasks, updateTask, deleteTask

export const createTask = async (req, res) => {
  try {
    const body = req.body;
    console.log("createTask", body);

    const { title, description, score, assignee, projectId } = body;

    if (!title || !description || !score || !assignee || !projectId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const taskExists = await Task.findOne({ title });
    if (taskExists) {
      return res.status(400).json({ message: "Task already exists" });
    }

    const task = await Task.create({
      title,
      description,
      score,
      assignee,
      projectId,
      status: "Pending",
    });

    return res.status(201).json(task);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json(task);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    return res.status(200).json(tasks);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const getTaskByEmployee = async (req, res) => {
  const employeeId = req.params.id;
  try {
    const tasks = await Task.find({ assignee: employeeId });
    return res.status(200).json(tasks);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
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
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const data = await task.deleteOne();
    return res
      .status(200)
      .json({ message: `${task.title} deleted successfully` });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};
