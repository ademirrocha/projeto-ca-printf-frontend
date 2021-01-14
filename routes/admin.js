const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
	res.send('Page Principal Adimin')
})

router.get('/documentos/novo', (req, res) => {
	res.send('Page Cadastro documentos')
})

router.get('/documentos/editar', (req, res) => {
	res.send('Page Editar Documentos')
})


module.exports = router