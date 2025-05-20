// routes/projectRoutes.js
const express = require('express');
const router = express.Router();
const Project = require('../../models/ProjectModel');
const Task = require("../../models/TaskModel")
const authenticateToken = require('../../middlewear/JWTverify');




router.get("/fetchList",authenticateToken,async(req,res)=>{

  console.log("fetchList hittend")
  const User = req.user.id

  try{
    const projectList = await Project.find({owner:User})
    res.status(200).json({message:"success",data:projectList})
  }
  catch(err){
console.error(err);
    res.status(500).json({ error: "Failed to fetch projects" });  }
})

router.post('/add', authenticateToken, async (req, res) => {
  console.log("addProjects hitted")
  const { title, description } = req.body;
  const userId = req.user.id; 


  try {
    const projectCount = await Project.countDocuments({ owner: userId });

    if (projectCount >= 4) {
      return res.status(403).json({ message: "Limit reached: You can create a maximum of 4 projects." });
    }

    const newProject = new Project({
      title,
      description,
      owner: userId
    });

    await newProject.save();
    console.log(newProject)
    res.status(201).json(newProject);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get('/:projectId/projectDetail',authenticateToken ,async (req, res) => {
  console.log("fetch project Deatils hitted")

    const projectId = req.params.projectId;

    try{
        const projectDetails = await Project.findOne({_id:projectId})
        res.status(200).json(projectDetails)
    }
    catch(err){
        res.status(400).json({message:"error"})
    }
});


router.get('/:projectId/taskList',authenticateToken ,async (req, res) => {
    const projectId = req.params.projectId;
      console.log(projectId)

  console.log("fetch TaskList Deatils hitted")


    try{
        const taskList = await Task.find({projectId:projectId})
        console.log(taskList)
        res.status(200).json(taskList)
    }
    catch(err){
      console.log("error")
        res.status(400).json({message:"error"})
    }
});

router.post('/:projectId/addTask', authenticateToken, async (req, res) => {
  console.log("add")
  const { projectId } = req.params;
  const { title, description } = req.body;
  const userId = req.user.id;

  if (!title || !title.trim()) {
    return res.status(400).json({ error: 'Task title is required' });
  }

  try {
    const newTask = new Task({
      title,
      description,
      projectId,
      userId,
    });

    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.error('Task creation error:', error);
    res.status(500).json({ error: 'Server error while creating task' });
  }
});

router.delete('/delete/:id', authenticateToken, async (req, res) => {
  console.log("delete initiated")
  try {
    const projectId = req.params.id;

    await Project.findByIdAndDelete(projectId);

    await Task.deleteMany({ projectId });

    return res.status(200).json({ message: 'Project deleted successfully' });
  } catch (err) {
    console.error('Error deleting project:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

router.put('/task/:id/updateStatus', authenticateToken, async (req, res) => {
  console.log("updated status hitted")
  try {
    const taskId = req.params.id;
    const { status, completedAt } = req.body;

    const updateFields = { status };
    if (completedAt) {
      updateFields.completedAt = completedAt;
    }

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { $set: updateFields },
      { new: true }
    );

    res.json(updatedTask);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Update failed' });
  }
});


router.get('/:projectId/projectDetail',authenticateToken ,async (req, res) => {
  console.log("fetch project Deatils hitted")

    const projectId = req.params.projectId;
    console.log("projectid",projectId)

    try{
        const projectDetails = await Project.findOne({_id:projectId})
        res.status(200).json(projectDetails)
    }
    catch(err){
        res.status(400).json({message:"error"})
    }
});

module.exports = router;
