const express = require('express')
const router = express.Router()
const { isAdmin, isModerator } = require('../../helpers/isAdmin')
const { auth } = require('../../helpers/auth')
const EventServices = require('../../services/event/eventServices')
const ProjectServices = require('../../services/project/projectServices')
const DocumentServices = require('../../services/document/documentServices')

const multer = require('multer')




router.get('/', auth, isModerator, (req, res) => {
	res.send('Page Principal Adimin')
})





module.exports = router;

