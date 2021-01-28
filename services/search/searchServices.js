module.exports = class SearchServices {

	constructor (async_param = 'undefined') {
		if (typeof async_param === 'undefined') {
			throw new Error('Cannot be called directly');
		}

	}


	async get(req, res){

		var result = {}
		const api = res.locals.api

		await api.get('search/', {
			params: {
				search: req.params.search
			}
		})
		.then(
			function(response){

				if(response.status == 200){
					result.status = response.status
					result.data = response.data.data
				}

			})
		.catch(error => {

			if(error.response  && error.response.status != 200){

				result.status = error.response.status
				var errors = {}

				for(var prop in error.response.data.meta){
					if(prop == 'errors'){
						errors[prop] = error.response.data.meta.errors;
					}
				}

				for(var prop in error.response.data.errors){
					errors[prop] = error.response.data.errors[prop];
				}

				result.errors = errors
			}
		}); 

		return result

	}


}