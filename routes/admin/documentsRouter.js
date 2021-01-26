const express = require('express')
const router = express.Router()
const { auth } = require('../../helpers/auth')
const { isAdmin, isModerator } = require('../../helpers/isAdmin')

const DocumentServices = require('../../services/document/documentServices')
const multer = require('multer')
const multerConfig = require("../../config/multer");

router.get('/novo', auth, isModerator, async (req, res) => {
	const service = new DocumentServices
	var getData = await service.getDataCreateUpdate(req, res)

	res.render('admin/documents/create', {schoolClasses: getData.schoolClasses, typeDocuments: getData.typeDocuments});
})

router.get('/editar/:id', auth, isModerator, async (req, res) => {
	const service = new DocumentServices
	var documentRes = await service.get(req, res)
	var getData = await service.getDataCreateUpdate(req, res)
	
	if(documentRes.status == 200){
		res.render('admin/documents/update', {document: documentRes.data, schoolClasses: getData.schoolClasses, typeDocuments: getData.typeDocuments});
	}else{
		req.flash('error', 'Documento não encontrado')
		return res.redirect('/documentos')
	}
})


router.post('/create', auth, isModerator, multer(multerConfig).single('file'), async (req,res) => {

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


router.post('/update', auth, isModerator, multer(multerConfig).single('file'), async (req, res) => {

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

	const service = new DocumentServices
	var update = await service.update(req, res, file)
	if(update.status == 401 && update.errors.message == 'Unauthenticated.'){
		req.logout()
		res.redirect('/login')

	}else if(update.status == 200){

		req.flash('success_msg', 'Alterações salvas com sucesso!')
		res.redirect('/documentos')	
		
	}else{

		req.flash('title', req.body.title)
		req.flash('description', req.body.description)
		req.flash('errors', update.errors)
		req.flash('error_msg', 'As alterações não foram salvas!')
		res.redirect('/admin/documentos/editar/' + req.body.id)
	}

})

router.post('/delete', auth, isAdmin, async function(req,res){

	const service = new DocumentServices
	var deleteRes = await service.delete(req, res)
	if(deleteRes.status == 401 && deleteRes.errors.message == 'Unauthenticated.'){
		req.logout()
		res.redirect('/login')

	}else if(deleteRes.status == 200){

		req.flash('success_msg', 'Documento removido com sucesso!')
		res.redirect('/documentos')	
		
	}else{

		req.flash('error', 'Erro ao excluir documento')
		res.redirect('/documentos')
	}

})


module.exports = router;