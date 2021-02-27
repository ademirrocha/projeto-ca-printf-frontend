
const constructMembers = (data) => {
    result = {}

    for(var prop in data){
        
        result[data[prop].role] = data[prop].name
    }
    
    return result
}

module.exports = class MemberServices {

	constructor (async_param = 'undefined') {
		if (typeof async_param === 'undefined') {
			throw new Error('Cannot be called directly');
		}

	}

	async all(req, res){

		var result = {}
		const api = res.locals.api
		await api.get('academic-center/members',{
		})
		.then(
			function(response){

				if(response.status == 200){

					result.status = response.status
					result.members = constructMembers(response.data.data)
					
				}

			})
		.catch(error => {
			console.log(error)
		}); 

		return result

	}
	
	async update(req, res){

		var result = {}
		const api = res.locals.api

		await api.post('academic-center/members/edit', {
			president: req.body.president,
			vice_president: req.body.vice_president,
			secretary: req.body.secretary,
			treasurer: req.body.treasurer,
			communication_coordinator: req.body.communication_coordinator,
			events_coordinator: req.body.events_coordinator,
		})
		.then(
			function(response){
				
				if(response.status == 200){
					result.status = response.status
					result.members = constructMembers(response.data.data)
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


	async delete(req, res){

		var result = {}
		const api = res.locals.api

		await api.post('events/delete', {
			id: req.body.id,
		})
		.then(
			function(response){

				if(response.status == 200){
					result.status = response.status
					
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
