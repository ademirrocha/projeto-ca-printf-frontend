
const Handlebars = require('handlebars')


module.exports = {

	handlebarsHelpres: function(req, res, next){

		Handlebars.registerHelper('equals', function (value1, value2) {
			return value1 == value2
		})

		next()
	}
}

