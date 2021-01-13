const express = require('express')
const router = express.Router()
const { guest } = require('../helpers/guest')
const { auth } = require('../helpers/auth')
const AuthServices = require('../services/auth/authServices')

const passport = require('passport')

router.get('/', (req, res) => {
	res.render('users/index')
})

router.get('/login', guest, (req, res) => {

	res.render('users/auth/login')
})

router.post('/logout', async (req, res, next) => {

	if(req.user){

		const service = new AuthServices
		const api = res.locals.api
		var logout = await service.logout(api, req)
		if(logout.status == 200){
			req.body.user = null
			req.logout()
			res.redirect('/login')

		}else{
			res.render('/', {errors: logar.errors})
		}

	}else{
		res.redirect('/')
	}


})

router.post('/login', async (req, res, next) => {

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
		res.render('users/auth/login', {errors: logar.errors})
	}

})

router.get('/cadastro', (req, res) => {
	res.render('users/auth/register')
})

router.get('/perfil', auth, (req, res) => {
	res.render('users/user/profile')
})

router.get('/documentos', (req, res) => {
	res.send('Page Cadastro documentos')
})

router.get('/documentos/ver', (req, res) => {
	res.send('Page Editar Documentos')
})

module.exports = router