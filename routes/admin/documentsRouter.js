const express = require('express')
const router = express.Router()
const { auth } = require('../../helpers/auth')
const { isAdmin, isModerator } = require('../../helpers/isAdmin')

const DocumentServices = require('../../services/document/documentServices')
const multer = require('multer')
const multerConfig = require("../../config/multer");

router.get('/novo', auth, isModerator, (req, res) => {
	res.render('users/forms/create_document');
})

router.get('/editar/:id', auth, isModerator, (req, res) => {
	res.send('Page Editar Documentos')
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


module.exports = router;