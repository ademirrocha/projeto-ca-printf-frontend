const express = require('express')
const router = express.Router()
const { guest } = require('../helpers/guest')
const { auth } = require('../helpers/auth')
const AuthServices = require('../services/auth/authServices')
const UserServices = require('../services/user/userServices')
const EventServices = require('../services/event/eventServices')

const passport = require('passport')

router.get('/', (req, res) => {
	res.render('users/index')
})

router.get('/login', guest, (req, res) => {

	res.render('users/auth/login')
})

router.post('/logout', auth, async (req, res, next) => {

	const service = new AuthServices
	const api = res.locals.api
	var logout = await service.logout(api, req)
	if(logout.status == 200){
		req.body.user = null
		req.logout()
		res.redirect('/login')

	}else{
		res.redirect('/')
	}

})

router.post('/auth/login', async (req, res, next) => {

	const service = new AuthServices
	const api = res.locals.api

	var logar = await service.login(api, req.body.email, req.body.password)
	if(logar.status == 200){
		req.body.user = {id: logar.user.id, name: logar.user.name, email: logar.user.email, accessToken: logar.user.accessToken }

		passport.authenticate('local', {
			successRedirect: '/',
			//failureRedirect: '/login',
			failureFlash: true
		})(req, res, next)

	}else{
		req.flash('email', req.body.email)
		req.flash('errors', logar.errors)
		res.redirect('/login')
	}

})


router.post('/auth/register', async (req, res, next) => {

	const service = new AuthServices
	const api = res.locals.api

	var register = await service.register(api, req, res)

	console.log(register)

	if(register.status == 201){
		req.body.user = {id: register.user.id, name: register.user.name, email: register.user.email, accessToken: register.user.accessToken }

		passport.authenticate('local', {
			successRedirect: '/',
			//failureRedirect: '/login',
			failureFlash: true
		})(req, res, next)

	}else{
		

		req.flash('name', req.body.name)
		req.flash('email', req.body.email)
		req.flash('errors', register.errors)
		res.redirect('/cadastro')
	}

})

router.get('/cadastro', (req, res) => {
	res.render('users/auth/register')
})

router.get('/perfil', auth, (req, res) => {
	res.render('users/user/profile')
})

router.post('/profile/edit', auth, async (req, res, next) => {

	const api = res.locals.api

	const serviceUser = new UserServices

	var updadeUser = await serviceUser.updadeUser(api, req, res)
	if(updadeUser.status == 200){
		
		res.redirect('/perfil')

	}else{
		req.flash('error_msg', updadeUser.errors)
		res.redirect('/perfil')
	}


})

router.get('/documentos', (req, res) => {
	res.send('Page Cadastro documentos')
})

router.get('/documentos/ver', (req, res) => {
	res.send('Page Editar Documentos')
})
router.get('/eventos', async function(req,res){
	const serviceEvent = new EventServices
	
	var events = await serviceEvent.all(req, res)
	console.log(events)
	
	res.render('users/events/events', {events: events});
})
router.get('/events',function(req,res){
	res.render('users/events/events');
})
router.get('/fundamentos',function(req,res){
	res.render('users/course/fundaments');
})
router.get('/curso',function(req,res){
	res.render('users/course/course');
})
router.get('/projeto',function(req,res){
	res.render('users/projects/cardsproject');
})
router.get('/project',function(req,res){
	res.render('users/projects/project');
})
router.get('/ppc',function(req,res){
	res.render('users/documents/ppc');
})
router.get('/regulamentos',function(req,res){
	res.render('users/documents/regulamentoestagio');
})
router.get('/regulamento',function(req,res){
	res.render('users/documents/complementaryhours');
})
router.get('/atas',function(req,res){
	res.render('users/documents/atasreuniao');
})

router.get('/cadastroprojeto',function(req,res){
	res.render('users/forms/formproject');
})
router.get('/cadastroregulamentoestagio',function(req,res){
	res.render('users/forms/formregulamentoestagio');
})
router.get('/cadastroregulamentohoras',function(req,res){
	res.render('users/forms/formregulamentohorascomplementares');
})
router.get('/cadastroatasreuniao',function(req,res){
	res.render('users/forms/formatasreuniao');
})



module.exports = router;