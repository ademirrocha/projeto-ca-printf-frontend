const express = require('express')
const router = express.Router()
const { isAdmin } = require('../helpers/isAdmin')
const { auth } = require('../helpers/auth')
const EventServices = require('../services/event/eventServices')

router.get('/', auth, isAdmin, (req, res) => {
	res.send('Page Principal Adimin')
})

router.get('/documentos/novo', auth, isAdmin, (req, res) => {
	res.send('Page Cadastro documentos')
})

router.get('/documentos/editar', auth, isAdmin, (req, res) => {
	res.send('Page Editar Documentos')
})


router.get('/eventos/novo',function(req,res){
	res.render('users/forms/create_event');
})


router.post('/events/create',async function(req,res){

	const service = new EventServices
	var register = await service.create(req, res)

	console.log(register)

	if(register.status == 401 && register.errors.message == 'Unauthenticated.'){
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



module.exports = router