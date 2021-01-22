const express = require('express')
const router = express.Router()
const { guest } = require('../../helpers/guest')
const { auth } = require('../../helpers/auth')
const AuthServices = require('../../services/auth/authServices')
const passport = require('passport')



router.get('/login', guest, (req, res) => {

	res.render('users/auth/login')
})

router.get('/cadastro', (req, res) => {
	res.render('users/auth/register')
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
		req.body.user = {id: logar.user.id, name: logar.user.name, email: logar.user.email, accessToken: logar.user.accessToken, roles: logar.user.roles }

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

	if(register.status == 201){
		req.body.user = {id: register.user.id, name: register.user.name, email: register.user.email, accessToken: register.user.accessToken, roles: register.user.roles }

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

module.exports = router;