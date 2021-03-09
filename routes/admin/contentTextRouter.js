const express = require('express')
const router = express.Router()
const { isAdmin } = require('../../helpers/isAdmin')
const { auth } = require('../../helpers/auth')

const ContentTextServices = require('../../services/contentText/contentTextServices')

router.post('/edit', async (req, res) => {

	const serviceContentText = new ContentTextServices
	
	var contentTexts = await serviceContentText.update(req, res)
    console.log('contentTexts' , contentTexts)
	res.json({contentTexts: contentTexts.contexts})
})

module.exports = router;