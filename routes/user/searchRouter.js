const express = require('express')
const router = express.Router()

const SearchServices = require('../../services/search/searchServices')



router.get('/:search', async (req, res) => {

	const serviceSearch = new SearchServices
	var searcheds = await serviceSearch.get(req, res)
	
	if(searcheds.status == 200){
		//if(searcheds.meta.total == 0){
			//return res.render('users/search/search', {search: searcheds, error_search: 'Lamentamos, mas não temos nenhum resultado para "'+ req.params.search +'"'} );
		
		//}else{
			return res.render('users/search/search', {searcheds: searcheds.data, success_search: "Encontramos " + parseInt(searcheds.data.documents.length + searcheds.data.events.length + searcheds.data.projects.length) + ' resultado para "'+ req.params.search +'"'} );
		//}
	}

	return res.render('users/search/search', {searcheds: searcheds.data, error_search: 'Lamentamos, mas não temos nenhum resultado para "'+ req.params.search +'"'} );
		
})


module.exports = router;