
const Handlebars = require('handlebars')
const moment = require('moment')

module.exports = {

	handlebarsHelpres: function(req, res, next){

		Handlebars.registerHelper('equals', function (value1, value2) {
			return value1 == value2
		})

		Handlebars.registerHelper('receive', function (varName, varValue, options) {
			options.data.root[varName] = varValue;
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

		Handlebars.registerHelper('trimString', function(passedString, limit, begin=0) {
			var theString = passedString.substring(begin, limit);
			return new Handlebars.SafeString(theString)
		});

		Handlebars.registerHelper('format_date', function (date, format) {
			return moment(date).format(format)
		})

		Handlebars.registerHelper('sun', function (value1, value2) {
			return parseInt(value1 + value2)
		})

		Handlebars.registerHelper('minus', function (value1, value2) {
			return parseInt(value1 - value2)
		})

		Handlebars.registerHelper('includes', function (value1, value2) {
			var buf = Buffer.from(value1);
			console.log(buf.includes(value2));
			return buf.includes(value2)
		})

		Handlebars.registerHelper('isInteger', function (value) {
			return Number.isInteger(value);
		})
		


		Handlebars.registerHelper('replace', function (text, index, replaced) {
			return decodeURIComponent(text.replace(index, replaced));
		})


		Handlebars.registerHelper('moderatorPermission', function(){
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

				if(isAdmin || isModerator){
					return true
				}else{
					return false
				}	
			}
			return false
		})

		Handlebars.registerHelper('adminPermission', function(){
			let isAdmin = false
			if(req.isAuthenticated()){
				for (role in req.user.roles ){
					if(req.user.roles[role].name == 'admin'){
						isAdmin = true
					}
				}

				if(isAdmin){
					return true
				}else{
					return false
				}	
			}
			return false
		})


		Handlebars.registerHelper('valueOrOtherValue', function (value1, value2) {
			let result = ''
			
			if((value1 != undefined && value1 != 'undefined' && value1 != null && value1 != 'null') && value1.lenght > 0 ){
				result = value1
			}else{
				result = value2
			}
			

			return result;
		})


		next()
	}
}

