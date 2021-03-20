const express = require('express')
const router = express.Router()
const { isAdmin } = require('../../helpers/isAdmin')
const { auth } = require('../../helpers/auth')

const ContentTextServices = require('../../services/contentText/contentTextServices')
const multer = require('multer')
const multerConfig = require("../../config/multer");

router.post('/edit', auth, isAdmin, multer(multerConfig).single('image'), async (req, res) => {

	var image = null

	if(req.file != undefined ){

		const { originalname: originalname, mimetype, size, key, local } = req.file;

		image = {
			originalname,
			mimetype,
			size,
			key,
			url: req.file.url || req.file.location,
			local: local
		}
	}


	const serviceContentText = new ContentTextServices
	const data = {req: req, res: res, image: image}
	var contentTexts = await serviceContentText.update(data)
    
	if(contentTexts.status == 200){
		return res.json({contentTexts: contentTexts.contexts})
	}else{
		return res.json({errors: contentTexts.errors})
	}
	
})

module.exports = router;