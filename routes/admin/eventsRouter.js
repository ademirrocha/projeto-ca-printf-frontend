const express = require('express')
const router = express.Router()
const { auth } = require('../../helpers/auth')
const { isAdmin, isModerator } = require('../../helpers/isAdmin')
const EventServices = require('../../services/event/eventServices')

router.get('/novo', auth, isModerator, function(req,res){
	res.render('admin/events/create');
})

router.get('/editar/:id', auth, isModerator, async (req, res) => {
	const service = new EventServices
	var event = await service.get(req, res)
	if(event.status == 200){
		res.render('admin/events/update', {event: event.data});
	}else{
		req.flash('error', 'Evento não encontrado')
		res.redirect('/eventos')
	}
})


router.post('/create', auth, isModerator, async function(req,res){

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


router.post('/update', auth, isModerator, async function(req,res){

	const service = new EventServices
	var register = await service.update(req, res)
	if(register.status == 401 && register.errors.message == 'Unauthenticated.'){
		req.logout()
		res.redirect('/login')

	}else if(register.status == 200){

		req.flash('success_msg', 'Alterações salvas com sucesso!')
		res.redirect('/eventos')	
		
	}else{

		req.flash('title', req.body.title)
		req.flash('description', req.body.description)
		req.flash('initial_date', req.body.initial_date)
		req.flash('final_date', req.body.final_date)
		req.flash('state', req.body.state)
		req.flash('errors', register.errors)
		req.flash('error_msg', 'As alterações não foram salvas!')
		res.redirect('/admin/eventos/editar/' + req.body.id)
	}

})

router.post('/delete', auth, isAdmin, async function(req,res){

	const service = new EventServices
	var deleteRes = await service.delete(req, res)
	if(deleteRes.status == 401 && deleteRes.errors.message == 'Unauthenticated.'){
		req.logout()
		res.redirect('/login')

	}else if(deleteRes.status == 200){

		req.flash('success_msg', 'Evento removido com sucesso!')
		res.redirect('/eventos')	
		
	}else{

		req.flash('error', 'Erro ao excluir evento')
		res.redirect('/eventos')
	}


})



module.exports = router;