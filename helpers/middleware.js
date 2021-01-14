module.exports = {

	reqFlash: function(req, res, next){

		res.locals.success_msg = req.flash('success_msg')
		res.locals.error_msg = req.flash('error_msg')
		res.locals.name = req.flash('name')
		res.locals.email = req.flash('email')
		res.locals.errors = req.flash('errors')

		next()
	}

}