import Project from "../models/Project.js";
// getProjectById, getAllProjects, createProject, updateProject, deleteProject

export const getProjectById = async (req, res) => {
  const projectId = req.params.id;
  const project = await Project.findById(projectId);
  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  return res.status(200).json(project);
};

export const getAllProjects = async (req, res) => {
  const projects = await Project.find();
  return res.status(200).json(projects);
};

export const createProject = async (req, res) => {
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
};

export const deleteProject = async (req, res) => {
  const projectId = req.params.id;
  const project = await Project.findById(projectId);

  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  const data = await project.deleteOne();

  return res
    .status(200)
    .json({ message: `${data.title} deleted successfully` });
};
