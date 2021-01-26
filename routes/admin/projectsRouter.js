const express = require('express')
const router = express.Router()
const { auth } = require('../../helpers/auth')
const { isAdmin, isModerator } = require('../../helpers/isAdmin')

const ProjectServices = require('../../services/project/projectServices')
const multer = require('multer')
const multerConfig = require("../../config/multer");

router.get('/novo', auth, isModerator, function(req,res){
	res.render('admin/projects/create');
})

router.get('/editar/:id', auth, isModerator, async (req, res) => {
	const service = new ProjectServices
	var project = await service.get(req, res)
	if(project.status == 200){
		res.render('admin/projects/update', {project: project.data});
	}else{
		req.flash('error', 'Projeto não encontrado')
		return res.redirect('/projetos')
	}
})

router.post('/create', auth, isModerator, multer(multerConfig).single('image'), async (req,res) => {

	var image = null

	if(req.file != undefined ){

		const { originalname: originalname, mimetype, size, key, local } = req.file;

		image = {
			originalname,
			mimetype,
			size,
			key,
			url: req.file.url || req.file.location,
			local: local
		}
	}

	if(req.flash('errors').length == 0){

		const service = new ProjectServices

		const data = {
			req,
			res,
			image: image
		}

		var register = await service.create(data)

		if(register.status == 401 && register.errors.message == 'Unauthenticated.'){
			req.logout()
			res.redirect('/login')

		}else if(register.status == 201){

			req.flash('success_msg', 'Projeto cadastrado com sucesso!')
			return res.redirect('/admin/projetos/novo')	

		}else{

			req.flash('title', req.body.title)
			req.flash('description', req.body.description)
			req.flash('image', req.body.image)
			req.flash('errors', register.errors)
			req.flash('error_msg', 'Projeto não cadastrado!')
			return res.redirect('/admin/projetos/novo')

		}

	}else{


		req.flash('title', req.body.title)
		req.flash('description', req.body.description)
		req.flash('error_msg', 'Não Registrado')
		req.flash('errors', {image:'Formato inválido'})
		return res.redirect('/admin/projetos/novo')
	}


})


router.post('/update', auth, isModerator, multer(multerConfig).single('image'), async (req, res) => {

	var image = null

	if(req.file != undefined ){

		const { originalname: originalname, mimetype, size, key, local } = req.file;

		image = {
			originalname,
			mimetype,
			size,
			key,
			url: req.file.url || req.file.location,
			local: local
		}
	}

	const service = new ProjectServices
	var update = await service.update(req, res, image)
	if(update.status == 401 && update.errors.message == 'Unauthenticated.'){
		req.logout()
		res.redirect('/login')

	}else if(update.status == 200){

		req.flash('success_msg', 'Alterações salvas com sucesso!')
		res.redirect('/projetos')	
		
	}else{

		req.flash('title', req.body.title)
		req.flash('description', req.body.description)
		req.flash('errors', update.errors)
		req.flash('error_msg', 'As alterações não foram salvas!')
		res.redirect('/admin/projetos/editar/' + req.body.id)
	}

})

router.post('/delete', auth, isAdmin, async function(req,res){

	const service = new ProjectServices
	var deleteRes = await service.delete(req, res)
	if(deleteRes.status == 401 && deleteRes.errors.message == 'Unauthenticated.'){
		req.logout()
		res.redirect('/login')

	}else if(deleteRes.status == 200){

		req.flash('success_msg', 'Projeto removido com sucesso!')
		res.redirect('/projetos')	
		
	}else{

		req.flash('error', 'Erro ao excluir projeto')
		res.redirect('/projetos')
	}

})


module.exports = router;