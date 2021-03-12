const express = require('express')
const router = express.Router()
const ProjectServices = require('../../services/project/projectServices')
const ContentTextServices = require('../../services/contentText/contentTextServices')

router.get('/', async function(req,res){

	const serviceProject = new ProjectServices
	const serviceContentText = new ContentTextServices

	var projects = await serviceProject.all(req, res)
	req.params.contents = 'projects_title'
	
	var contentTexts = await serviceContentText.all(req, res)
	res.render('users/projects/projects', {projects: projects, contentTexts: contentTexts.contexts});
})

router.get('/:id', async function(req,res){
	const serviceProject = new ProjectServices
	
	var project = await serviceProject.get(req, res)
	
	res.render('users/projects/projectView', {project: project.data});
})

module.exports = router;