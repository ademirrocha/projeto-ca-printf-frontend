const express = require('express')
const router = express.Router()

const DocumentServices = require('../../services/document/documentServices')
const ContentTextServices = require('../../services/contentText/contentTextServices')

router.get('/', async (req, res) => {

	const serviceDocument = new DocumentServices
	const serviceContentText = new ContentTextServices
	var documents = await serviceDocument.all(req, res)
	req.params.contents = 'documents_title'
	
	var contentTexts = await serviceContentText.all(req, res)
	
	res.render('users/documents/documents', {documents: documents, contentTexts: contentTexts.contexts});
})


router.get('/:search', async (req, res) => {

	const serviceDocument = new DocumentServices
	var documents = await serviceDocument.all(req, res)

	if(documents.status == 200){
		if(documents.meta.total == 0){
			return res.render('users/documents/documents', {documents: documents, error_search: 'Lamentamos, mas não temos nenhum resultado para "'+ req.params.search +'"'} );
		
		}else{
			return res.render('users/documents/documents', {documents: documents, success_search: "Encontramos "+ documents.meta.total + ' resultado para "'+ req.params.search +'"'} );
		}
	}

	
})


module.exports = router;