var http = require('http'),
    fs = require('fs');

module.exports = class DocumentServices {

	constructor (async_param = 'undefined') {
		if (typeof async_param === 'undefined') {
			throw new Error('Cannot be called directly');
		}

	}

	async create(data){
		const { req, res, file } = data
		var result = {}
		const api = res.locals.api
		
		await api.post('documents/new', {
			title: req.body.title,
			description: req.body.description,
			file: file
		})
		.then(
			function(response){

				if(response.status == 201){
					result.status = response.status
					result.event = {
						id: response.data.data.id,
						title: response.data.data.title,
						description: response.data.data.description,
						file: response.data.data.file,
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
		var pathName = 'documents' + page

		let params = req.params

		await api.get(pathName,{
			params: params
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
		
		await api.post('documents/edit', {
			id: req.body.id,
			title: req.body.title,
			description: req.body.description,
			file: file
		})
		.then(
			function(response){

				if(response.status == 200){
					result.status = response.status
					result.event = {
						id: response.data.data.id,
						title: response.data.data.title,
						description: response.data.data.description,
						file: response.data.data.file,
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

		await api.post('documents/delete', {
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
