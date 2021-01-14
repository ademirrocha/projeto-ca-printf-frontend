const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
	res.render('users/index')
})

router.get('/login', (req, res) => {
	res.render('users/auth/login')
})

router.get('/cadastro', (req, res) => {
	res.render('users/auth/register')
})

router.get('/perfil', (req, res) => {
	res.render('users/user/profile')
})

router.get('/documentos', (req, res) => {
	res.send('Page Cadastro documentos')
})

router.get('/documentos/ver', (req, res) => {
	res.send('Page Editar Documentos')
})
router.get('/eventos',function(req,res){
	res.render('users/events/cardsevents');
})
router.get('/events',function(req,res){
	res.render('users/events/events');
})
router.get('/curso',function(req,res){
	res.render('users/course/course');
})

module.exports = router