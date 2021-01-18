module.exports = class AuthServices {

	constructor (async_param = 'undefined') {
        if (typeof async_param === 'undefined') {
            throw new Error('Cannot be called directly');
        }

    }

    async login(api, email, password){

		var result = {}

		await api.post('auth/login', {
			email: email,
			password: password
		})
		.then(
			function(response){

				if(response.status == 200){
					result.status = response.status
					result.user = {
						id: response.data.data.id,
						name: response.data.data.name,
						email: response.data.data.email,
						accessToken: response.data.meta.token
					}
				}

			})
		.catch(error => {

			console.log(error.response)
			
			if(error.response.status != 200){
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

	async register(api, req, res){

		var result = {}

		await api.post('auth/register', {
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
			password_confirmation: req.body.password_confirmation
		})
		.then(
			function(response){

				if(response.status == 201){
					result.status = response.status
					result.user = {
						id: response.data.data.id,
						name: response.data.data.name,
						email: response.data.data.email,
						accessToken: response.data.meta.token
					}
				}

			})
		.catch(error => {

			
			if(error.response.status != 201){
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


	async logout(api, req){

		var result = {}
		api.defaults.headers.common['Authorization'] = 'Bearer ' + req.user.accessToken;
		await api.post('auth/logout')
		.then(
			function(response){

				if(response.status == 200){
					result.status = response.status
				}
			})
		.catch(error => {

			if(error.response.status != 200){
				result.status = error.response.status
				
				var errors = []
				
				for(var prop in error.response.data.errors){
					
						errors.push(error.response.data.errors[prop]);
			
				}
				
				result.errors = errors
			}
		}); 

		return result

	}


}
