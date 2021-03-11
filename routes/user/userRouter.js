
const express = require('express')
const router = express.Router()
const { auth } = require('../../helpers/auth')
const UserServices = require('../../services/user/userServices')
const ContentTextServices = require('../../services/contentText/contentTextServices')

router.get('/', async (req, res) => {
	req.params.contents = [
		'title_content_index', 
		'text_content_index',
		'index_title_brand',
		'index_body_brand'
	]
	
	const serviceContentText = new ContentTextServices
	var contentTexts = await serviceContentText.all(req, res)
	res.render('users/index', {contentTexts: contentTexts.contexts})
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

router.get('/curso',async function(req,res){
	req.params.contents = [
		'course_title',
		'course_body'
	]
	
	const serviceContentText = new ContentTextServices
	var contentTexts = await serviceContentText.all(req, res)
	res.render('users/course/course', {contentTexts: contentTexts.contexts});
})

router.get('/curso/fundamentos',async function(req,res){
	req.params.contents = [
		'fundaments_course_card1',
		'fundaments_course_card2',
		'fundaments_course_card3'
	]
	const serviceContentText = new ContentTextServices
	var contentTexts = await serviceContentText.all(req, res)
	res.render('users/course/fundaments', {contentTexts: contentTexts.contexts});
})

router.get('/curso/docentes/descricao',async function(req,res){
	req.params.contents = [
		'teachers_title',
		'teachers_body'
	]
	const serviceContentText = new ContentTextServices
	var contentTexts = await serviceContentText.all(req, res)
	res.render('users/course/descriptiondocourse', {contentTexts: contentTexts.contexts});
})

router.get('/centro-academico/descricao',async function(req,res){
	req.params.contents = [
		'ca_title',
		'ca_body'
	]
	const serviceContentText = new ContentTextServices
	var contentTexts = await serviceContentText.all(req, res)
	res.render('users/course/descriptionca', {contentTexts: contentTexts.contexts});
})




module.exports = router;