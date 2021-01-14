module.exports = {
	isAdmin: function(req, res, next){
		if(req.isAuthenticated() && req.user.role == 'admin'){
			return next()
		}

		req.flash('error_msg', 'Você não é admin')
		res.redirect('/')
	}
}