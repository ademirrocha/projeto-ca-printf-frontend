module.exports = class UserServices {

	constructor (async_param = 'undefined') {
        if (typeof async_param === 'undefined') {
            throw new Error('Cannot be called directly');
        }

    }

	async updadeUser(api, req, res){

		var result = {}

		api.defaults.headers.common['Authorization'] = 'Bearer ' + req.user.accessToken;
		await api.post('users/edit', {
			name: req.body.name,
			email: req.body.email,
			password: req.body.password || null,
			password_confirmation: req.body.password_confirmation || null,
			password_old: req.body.password_old
		})
		.then(
			function(response){

				if(response.status == 200){
					result.status = response.status
					req.user.name = response.data.data.name
					req.user.email = response.data.data.email
				}

			})
		.catch(error => {

			if(error.response.status != 200){
				result.status = error.response.status
				
				var errors = []
				
				if(error.response.data.message != 'undefined' && error.response.data.message == 'Unauthenticated.'){
					req.logout()
					res.redirect('/login')
				}
				
				for (var property in error.response.data.errors){

					errors.push(error.response.data.errors[property]);
					
				}
				
				result.errors = errors
			}
		}); 

		return result

	}


}
