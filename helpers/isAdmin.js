module.exports = {

	isAdmin: function(req, res, next){
		if( 1 == 1 || (req.isAuthenticated() && req.user.role.name == 'admin') ){
			return next()
		}

		req.flash('error_msg', 'Você não tem permissão de administrador')
		res.redirect('/')
	},

	isModerator: function(req, res, next){
		if( 1 == 1 || (req.isAuthenticated() && req.user.role.name == 'admin')  || (req.isAuthenticated() && req.user.role.name == 'moderator') ){
			return next()
		}

		req.flash('error_msg', 'Você não tem permissão de moderador')
		res.redirect('/')
	}


}