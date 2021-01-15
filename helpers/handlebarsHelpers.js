
const Handlebars = require('handlebars')


module.exports = {

	handlebarsHelpres: function(req, res, next){

		Handlebars.registerHelper('equals', function (value1, value2) {
			return value1 == value2
		})

		Handlebars.registerHelper('receive', function (value1, value2) {
			return value1 = value2
		})

		Handlebars.registerHelper('bigger', function (value1, value2) {
			return value1 > value2
		})

		Handlebars.registerHelper('bigger_or_equals', function (value1, value2) {
			return value1 >= value2
		})

		Handlebars.registerHelper('lesssss', function (value1, value2) {
			return value1 < value2
		})

		Handlebars.registerHelper('less_or_equals', function (value1, value2) {
			return value1 <= value2
		})

		next()
	}
}

