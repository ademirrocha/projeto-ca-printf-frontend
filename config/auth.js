const LocalStrategy = require('passport-local').Strategy

module.exports = function(passport){

	passport.use(new LocalStrategy({usernameField: 'email', passwordField: 'password', passReqToCallback : true }, (req, email, password, done, ) => {


			User = new class {
				id = req.body.user.id
				name = req.body.user.name
				email = email
				accessToken = req.body.user.accessToken
				roles = req.body.user.roles
			}

			if(!User.email){
				return done(null, false, {message: 'Esta conta não existe'})
			}else{
				return done(null, User)
			}

		}))

	passport.serializeUser((User, done) => {
		done(null, User)
	})

	passport.deserializeUser((User, done) => {
		done(null, User)
	})

	
}