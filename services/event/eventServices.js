module.exports = class EventServices {

	constructor (async_param = 'undefined') {
		if (typeof async_param === 'undefined') {
			throw new Error('Cannot be called directly');
		}

	}

	async create(req, res){

		var result = {}
		const api = res.locals.api

		await api.post('events/new', {
			title: req.body.title,
			description: req.body.description,
			initial_date: req.body.initial_date,
			final_date: req.body.final_date,
			state: req.body.state,
		})
		.then(
			function(response){

				if(response.status == 201){
					result.status = response.status
					result.event = {
						id: response.data.data.id,
						title: response.data.data.title,
						description: response.data.data.description,
						initial_date: response.data.meta.initial_date,
						final_date: response.data.meta.final_date,
						state: response.data.meta.state,
					}
				}

			})
		.catch(error => {

			if(error.response  && error.response.status != 201){

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


	async all(req, res){

		var result = {}
		const api = res.locals.api

		var page = req.query.page ? '?page=' + req.query.page : ''
		var pathName = 'events' + page

		await api.get(pathName,{
		})
		.then(
			function(response){

				if(response.status == 200){

					result.status = response.status
					result.data = response.data.data
					result.links = response.data.links
					result.meta = response.data.meta
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
	

	async get(req, res){

		var result = {}
		const api = res.locals.api

		await api.get('events/get/'+ parseInt(req.params.id))
		.then(
			function(response){

				console.log(response)

				if(response.status == 200){
					result.status = response.status
					result.data = response.data.data
					
				}

			})
		.catch(error => {

			console.log(error.response)

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


	async update(req, res){

		var result = {}
		const api = res.locals.api

		await api.post('events/edit', {
			id: req.body.id,
			title: req.body.title,
			description: req.body.description,
			initial_date: req.body.initial_date,
			final_date: req.body.final_date,
			state: req.body.state,
		})
		.then(
			function(response){
				
				if(response.status == 200){
					result.status = response.status
					result.event = {
						id: response.data.data.id,
						title: response.data.data.title,
						description: response.data.data.description,
						initial_date: response.data.meta.initial_date,
						final_date: response.data.meta.final_date,
						state: response.data.meta.state,
					}
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
