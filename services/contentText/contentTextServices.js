const constructResponse = (data) => {
    result = {}

    if(data.content){
        let index = data.content
        result[index] = data[index]
    }else{
        for(var prop in data){
            let index = data[prop].content
            result[index] = data[prop][index]
        }
    }

    return result
}

module.exports = class ContentTextServices {

	constructor (async_param = 'undefined') {
		if (typeof async_param === 'undefined') {
			throw new Error('Cannot be called directly');
		}

	}
	
	async all(req, res){

		var result = {}
		const api = res.locals.api
        
		await api.get('content-text',{
			params: req.params
		})
		.then(
			function(response){
               
				if(response.status == 200){

					result.status = response.status
					result.contexts = constructResponse(response.data.data)
				}

			})
		.catch(error => {

			//console.log(error.response)
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


	async get(req, res){

		var result = {}
		const api = res.locals.api

		await api.get('documents/get/'+ parseInt(req.params.id))
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



	async update(req, res, file){
		var result = {}
		const api = res.locals.api
		
		await api.post('content-text/edit', {
			newText: req.body.newText,
            content: req.body.content,
			type: req.body.type
		})
		.then(
			function(response){

				console.log(response)
				if(response.status == 200){
					result.status = response.status
					result.contexts = constructResponse(response.data.data)
				}

			})
		.catch(error => {

			if(error.response  && error.response.status != 200){

				result.status = error.response.status

				var errors = {}

				for(var prop in error.response.data){
					if(prop == 'message' && error.response.data.message == 'Unauthenticated.'){
						errors[prop] = error.response.data.message;
					}
				}

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
