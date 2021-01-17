const express = require('express')
const router = express.Router()
const { isAdmin } = require('../helpers/isAdmin')
const { auth } = require('../helpers/auth')
const EventServices = require('../services/event/eventServices')
const ProjectServices = require('../services/project/projectServices')
var path = require('path')
const multer = require('multer')
const multerConfig = require("../config/multer");

router.get('/', auth, isAdmin, (req, res) => {
	res.send('Page Principal Adimin')
})

router.get('/eventos/novo', auth, isAdmin, function(req,res){
	res.render('users/forms/create_event');
})

router.get('/projetos/novo', auth, isAdmin, function(req,res){
	res.render('users/forms/create_project');
})
router.get('/forms/formregulamnetoestagio',auth,isAdmin,function(req,res){
	res.render('/users/forms/formregulamnetoestagio');
})
router.get('/forms/formregulamentohorascomplementares',auth,isAdmin,function(req,res){
	res.render('/users/forms/formregulamentohorascomplementares');
})
router.get('/forms/formatasreuniao',auth,isAdmin,function(req,res){
	res.render('/users/forms/formatasreuniao');
})
router.get('/forms/formppc',auth,isAdmin,function(req,res){
	res.render('/users/forms/formppc');
})
router.post('/events/create', auth, isAdmin, async function(req,res){

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

router.post('/project/create', auth, isAdmin, multer(multerConfig).single('image'), async (req,res) => {

	var image = null

	if(req.file != undefined ){

		const { originalname: originalname, mimetype, size, key } = req.file;

		image = {
			originalname,
			mimetype,
			size,
			key,
			url: req.file.url || req.file.location 
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


router.get('/documentos/novo', auth, isAdmin, (req, res) => {
	res.send('Page Cadastro documentos')
})


router.get('/documentos/editar', auth, isAdmin, (req, res) => {
	res.send('Page Editar Documentos')
})

router.post('/formregulamnetoestagio/create', auth, isAdmin, async function(req,res){

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


router.post('/formregulamentohorascomplementares/create', auth, isAdmin, async function(req,res){

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
router.post('/formatasreuniao/create', auth, isAdmin, async function(req,res){

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

