const express = require('express')
const router = express.Router()
const { isAdmin, isModerator } = require('../helpers/isAdmin')
const { auth } = require('../helpers/auth')
const EventServices = require('../services/event/eventServices')
const ProjectServices = require('../services/project/projectServices')
const DocumentServices = require('../services/document/documentServices')
var path = require('path')
const multer = require('multer')
const multerConfig = require("../config/multer");


router.get('/eventos/novo', auth, isModerator, function(req,res){
	res.render('users/forms/create_event');
})

router.get('/projetos/novo', auth, isModerator, function(req,res){
	res.render('users/forms/create_project');
})


router.post('/events/create', auth, isModerator, async function(req,res){

	const service = new EventServices
	var register = await service.create(req, res)
	if(register.status == 401 && register.errors.message == 'Unauthenticated.'){
		req.logout()
		res.redirect('/login')

	}else if(register.status == 201){

		req.flash('success_msg', 'Evento cadastrado com sucesso!')
		res.redirect('/admin/eventos/novo')	
		
	}else{

		req.flash('title', req.body.title)
		req.flash('description', req.body.description)
		req.flash('initial_date', req.body.initial_date)
		req.flash('final_date', req.body.final_date)
		req.flash('state', req.body.state)
		req.flash('errors', register.errors)
		req.flash('error_msg', 'Evento não cadastrado!')
		res.redirect('/admin/eventos/novo')
	}

})

router.post('/project/create', auth, isModerator, multer(multerConfig).single('image'), async (req,res) => {

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


router.get('/documentos/novo', auth, isModerator, (req, res) => {
	res.render('users/forms/create_document');
})


router.post('/documents/create', auth, isModerator, multer(multerConfig).single('file'), async (req,res) => {

	var file = null

	if(req.file != undefined ){

		const { originalname: originalname, mimetype, size, key, local } = req.file;

		file = {
			originalname,
			mimetype,
			size,
			key,
			url: req.file.url || req.file.location,
			url_download: req.file.url_download || null,
			local: local
		}

	}

	if(req.flash('errors').length == 0){

		const service = new DocumentServices

		const data = {
			req,
			res,
			file: file
		}

		var register = await service.create(data)

		if(register.status == 401 && register.errors.message == 'Unauthenticated.'){
			req.logout()
			res.redirect('/login')

		}else if(register.status == 201){

			req.flash('success_msg', 'Projeto cadastrado com sucesso!')
			return res.redirect('/admin/documentos/novo')	

		}else{

			req.flash('title', req.body.title)
			req.flash('description', req.body.description)
			req.flash('type', req.body.type)
			req.flash('state', req.body.state)
			req.flash('errors', register.errors)
			req.flash('error_msg', 'Projeto não cadastrado!')
			return res.redirect('/admin/documentos/novo')

		}

	}else{


		req.flash('title', req.body.title)
		req.flash('description', req.body.description)
		req.flash('type', req.body.type)
		req.flash('state', req.body.state)
		req.flash('error_msg', 'Não Registrado')
		req.flash('errors', {file:'Formato inválido'})
		return res.redirect('/admin/documentos/novo')
	}


})



router.get('/', auth, isModerator, (req, res) => {
	res.send('Page Principal Adimin')
})


router.get('/documentos/editar', auth, isModerator, (req, res) => {
	res.send('Page Editar Documentos')
})

router.post('/formregulamnetoestagio/create', isModerator, async function(req,res){

	const service = new EventServices
	var register = await service.create(req, res)
	if(register.status == 401 && register.errors.message == 'Unauthenticated.'){
		req.logout()
		res.redirect('/login')

	}else if(register.status == 201){

		req.flash('success_msg', 'Regulamento De Estagio cadastrado com sucesso!')
		res.redirect('/admin/forms/formregulamnetoestagio')	
		
	}else{

		req.flash('title', req.body.title)
		req.flash('description', req.body.description)
		req.flash('turm', req.body.turm)
		req.flash('state', req.body.state)
		req.flash('envio', req.body.envio)
		req.flash('errors', register.errors)
		req.flash('error_msg', 'Regulamento De Estagio não cadastrado!')
		res.redirect('/admin/forms/formregulamnetoestagio')
	}

})


router.post('/formregulamentohorascomplementares/create', isModerator, async function(req,res){

	const service = new EventServices
	var register = await service.create(req, res)
	if(register.status == 401 && register.errors.message == 'Unauthenticated.'){
		req.logout()
		res.redirect('/login')

	}else if(register.status == 201){

		req.flash('success_msg', 'Regulamento De Horas cadastrado com sucesso!')
		res.redirect('/admin/forms/formregulamentohorascomplementares')	
		
	}else{

		req.flash('title', req.body.title)
		req.flash('description', req.body.description)
		req.flash('turm', req.body.turm)
		req.flash('state', req.body.state)
		req.flash('file', req.body.file)
		req.flash('errors', register.errors)
		req.flash('error_msg', 'Regulamento De Horas não cadastrado!')
		res.redirect('/admin/forms/formregulamentohorascomplementares')
	}

})
router.post('/formatasreuniao/create', isModerator, async function(req,res){

	const service = new EventServices
	var register = await service.create(req, res)
	if(register.status == 401 && register.errors.message == 'Unauthenticated.'){
		res.redirect('/login')

	}else if(register.status == 201){

		req.flash('success_msg', 'Atas de reunião cadastrado com sucesso!')
		res.redirect('/admin/forms/formatasreuniao')	
		
	}else{

		req.flash('title', req.body.title)
		req.flash('description', req.body.description)
		req.flash('errors', register.errors)
		req.flash('error_msg', 'Atas de reunião não cadastrado!')
		res.redirect('/admin/forms/formatasreuniao')
	}

})


module.exports = router;

