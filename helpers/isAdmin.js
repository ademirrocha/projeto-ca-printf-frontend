module.exports = {

	isAdmin: function(req, res, next){

		let isAdmin = false

		if(req.isAuthenticated()){

			for (role in req.user.roles ){
				if(req.user.roles[role].name == 'admin'){
					isAdmin = true
				}
			}
		}
		
		if( isAdmin ){
			return next()
		}



		req.flash('error_msg', 'Você não tem permissão de administrador')
		res.redirect('/')
	},

	isModerator: function(req, res, next){

		let isAdmin = false
		let isModerator = false

		if(req.isAuthenticated()){

			for (role in req.user.roles ){
				if(req.user.roles[role].name == 'admin'){
					isAdmin = true
				}
				if(req.user.roles[role].name == 'moderator'){
					isModerator = true
				}
			}
			
		}

		if( isAdmin || isModerator ){
			return next()
		}

		req.flash('error_msg', 'Você não tem permissão de moderador')
		res.redirect('/')
	}


}