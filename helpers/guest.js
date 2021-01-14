module.exports = {
	guest: function(req, res, next){
		if(! req.isAuthenticated()){
			return next()
		}

		req.flash('error_msg', 'Somente Anonimos')
		res.redirect('/')
	}
}