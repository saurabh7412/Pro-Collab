const express = require("express");
const User = require("../Model/user.model");
const Router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const authenticateJWT = require("../Middlware/authMiddlware");
const Project = require("../Model/project. model");
const Task = require("../Model/task.model");

Router.get("/", (req, res) => {
  res.send("Welcome to Backend");
});

Router.get("/user", authenticateJWT, async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json({ "allUsers": user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

Router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

Router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user._id }, "JWT_SECRET", {
      expiresIn: "5d",
    });
    res.json({ token, user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

Router.post("/projects", authenticateJWT, async (req, res) => {
  try {
    const { projectName, description, startDate, endDate } = req.body;
    const projectLead = req.user.userId;

    const project = new Project({
      projectName,
      description,
      startDate,
      endDate,
      projectLead,
    });

    await project.save();

    res.status(201).json({ message: "Project created successfully", project });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

Router.get("/projects/me", authenticateJWT, async (req, res) => {
  try {
    const projects = await Project.find({ projectLead: req.user.userId })
      .populate("projectLead")
      .populate("members")
      .populate("task");
    res.json({ projects });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

Router.get("/projects/all", authenticateJWT, async (req, res) => {
  try {
    const projects = await Project.find()
      .populate("projectLead")
      .populate("members")
      .populate("task");
    res.json({ projects });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

Router.patch("/projects/:projectId", authenticateJWT, async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const { projectName, description, startDate, endDate } = req.body;

    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      { projectName, description, startDate, endDate },
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json({
      message: "Project updated successfully",
      project: updatedProject,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});



Router.patch("/projects/:projectId/editTask/:taskId", authenticateJWT, async(req,res)=>{
  try {

    const taskId = req.params.taskId;

    const { taskName, description, priority, status, assignedTo } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(taskId,{
      taskName, description, priority, status, assignedTo
    })

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json({
      message: "Task updated successfully",
      Task: updatedTask,
    });
    
    
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
})



Router.delete('/task/:projectId/:taskId', authenticateJWT, async (req, res) => {
  try {
      const projectId = req.params.projectId;
      const taskId = req.params.taskId;

      // Find the project by ID
      const project = await Project.findById(projectId);

      if (!project) {
          return res.status(404).json({ error: 'Project not found' });
      }

      // Check if the task exists in the project's tasks
      const taskIndex = project.task.indexOf(taskId);
      if (taskIndex === -1) {
          return res.status(404).json({ error: 'Task not found in the project' });
      }

      // Remove the task from the project's tasks
      project.task.splice(taskIndex, 1);
      await project.save();

      // Remove the task from the Task collection
      await Task.findByIdAndRemove(taskId);

      res.json({ message: 'Task deleted successfully' });
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
});


Router.delete("/projects/:projectId", authenticateJWT, async (req, res) => {
  try {
    const projectId = req.params.projectId;

    const deletedProject = await Project.findByIdAndDelete(projectId);

    if (!deletedProject) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json({
      message: "Project deleted successfully",
      project: deletedProject,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

Router.post(
  "/projects/:projectId/add/:username",
  authenticateJWT,
  async (req, res) => {
    try {
      const projectId = req.params.projectId;
      const username = req.params.username;

      // Find the user by username to get their ID
      const user = await User.findOne({ username });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Find the project by ID
      const project = await Project.findById(projectId);

      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      project.members.push(user._id);
      await project.save();

      res.json({ message: "User added to project successfully", project });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

Router.post("/task/:projectId/:username", authenticateJWT, async (req, res) => {
  try {
    const { taskName, description, deadline, priority, status } = req.body;
    const projectId = req.params.projectId;
    const username = req.params.username;

    // Find the user by username to get their ID
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Create the task
    const task = new Task({
      taskName,
      description,
      deadline,
      priority,
      status,
      assignedTo: user._id,
    });

    // Save the task
    await task.save();

    // Find the project by ID
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    project.task.push(task._id);
    await project.save();

    res.json({ message: "Task created successfully", task });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

Router.get('/tasks/:taskId', async(req,res)=>{
  try {

    const task = await Task.findById(req.params.taskId)

    res.json({task})
    
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
})

Router.get("/projects/tasks/:projectId", authenticateJWT, async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId)
      .populate("task")
      .populate("members")
      .populate("projectLead");
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json({ project });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = Router;
