
const express = require('express')
const router = express.Router()
const { auth } = require('../../helpers/auth')
const UserServices = require('../../services/user/userServices')


router.get('/', (req, res) => {
	res.render('users/index')
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




router.get('/curso',function(req,res){
	res.render('users/course/course');
})
router.get('/curso/fundamentos',function(req,res){
	res.render('users/course/fundaments');
})
router.get('/curso/docentes/descricao',function(req,res){
	res.render('users/course/descriptiondocourse');
})

router.get('/centro-academico/descricao',function(req,res){
	res.render('users/course/descriptionca');
})
router.get('/centro-academico/membros',function(req,res){
	res.render('users/course/memberca')
});
router.get('/centro-academico/membros/cadastro',function(req,res){
	res.render('admin/memberca/formmemberca')
});


module.exports = router;