// routes/projectRoutes.js
const express = require('express');
const router = express.Router();
const Project = require('../../models/ProjectModel');
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

module.exports = router;
