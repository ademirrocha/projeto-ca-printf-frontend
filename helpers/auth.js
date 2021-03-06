module.exports = {
	auth: function(req, res, next){
		if(req.isAuthenticated()){
			return next()
		}
		req.logout()
		req.flash('error_msg', 'Você não está logado')
		res.redirect('/login')
	}
}