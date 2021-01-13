const express = require('express')
const router = express.Router()
const { isAdmin } = require('../helpers/isAdmin')
const { auth } = require('../helpers/auth')

router.get('/', auth, isAdmin, (req, res) => {
	res.send('Page Principal Adimin')
})

router.get('/documentos/novo', auth, isAdmin, (req, res) => {
	res.send('Page Cadastro documentos')
})

router.get('/documentos/editar', auth, isAdmin, (req, res) => {
	res.send('Page Editar Documentos')
})

module.exports = router