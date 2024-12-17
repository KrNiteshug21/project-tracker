import Project from "../models/Project.js";
// getProjectById, getAllProjects, createProject, updateProject, deleteProject

export const getProjectById = async (req, res) => {
  try {
    const projectId = req.params.id;
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    return res.status(200).json(project);
  } catch (error) {
    return res.status(500).json({ message: error.message });
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

    const project = await Project.create({
      title,
      description,
      startDate,
      endDate,
      employees: [],
      tasks: [],
    });

    return res.status(201).json(project);
  } catch (error) {
    return res.status(500).json({ message: error.message });
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
