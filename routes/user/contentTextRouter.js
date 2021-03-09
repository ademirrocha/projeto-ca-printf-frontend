const express = require('express')
const router = express.Router()

const ContentTextServices = require('../../services/contentText/contentTextServices')

router.get('/', async (req, res) => {

	const serviceContentText = new ContentTextServices
	
	var contentTexts = await serviceContentText.all(req, res)
	
	res.json({contentTexts: contentTexts});
})


module.exports = router;