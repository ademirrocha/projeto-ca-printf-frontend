const express = require('express')
const router = express.Router()
const ProjectServices = require('../../services/project/projectServices')

router.get('/project/create', async function(req,res){
	const serviceProject = new ProjectServices
	
	var projects = await serviceProject.all(req, res)
	
	res.render('users/projects/projects', {projects: projects});
})



module.exports = router;