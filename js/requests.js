const api = axios.create({
    //baseURL: "https://project-ca-printf.herokuapp.com/api/"
    baseURL: "http://localhost:8000/api/"
});

var config = {
	headers: {
		'Accept': 'application/json', 
		'Content-Type':'application/x-www-form-urlencoded',
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Headers": "Authorization", 
		"Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE" ,
		"Content-Type": "application/json;charset=UTF-8"
	}
};


async function login($this){

	$($this).html("Entrar " +'<img src="img/loading.gif" class="loading-button">')
	$('#message_login').attr('hidden', 'hidden')
	$('#message_login').removeClass('error')

	await api.post('auth/login', {
		email: $('#email').val(),
		password: $('#password').val(),
		config
	})
	.then(
		function(response){

			console.log(response)

			if(response.status == 200){
				localStorage.setItem('accessToken', response.data.meta.token);
				localStorage.setItem('name', response.data.data.name);
				localStorage.setItem('email', response.data.data.email);
				localStorage.setItem('id', response.data.data.id);

				menuUser();
				closeModal();
				closeLoginForm();
			}
			
			$($this).html("Entrar")

		})
	.catch(error => {
		console.log(error)
		if(error.response.data != 'undefined'){
			$('#message_login').removeAttr('hidden')
			$('#message_login').addClass('error')

			$("#message_login").html(error.response.data.meta.errors);
		}

		console.log(error.response)
		
	}); 

	$($this).html("Entrar")
}


async function logout(){

	loading()

	api.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('accessToken');
	await api.post('auth/logout', {
		config
	})
	.then(
		function(response){

			console.log(response)

			if(response.status == 200){

				localStorage.removeItem('accessToken');
				localStorage.removeItem('name');
				localStorage.removeItem('email');
				localStorage.removeItem('id');

				menuUser();
			}

		})
	.catch(error => {
		console.log(error)
		if(error.response.data != 'undefined'){
			$('#message_login').removeAttr('hidden')
			$('#message_login').addClass('error')

			$("#message_login").html(error.response.data.meta.errors);
		}

		console.log(error.response)
		
	}); 
	
	Swal.close(); 

}

function clearErrors(field){
	$("#" + field + "_error").attr('hidden', 'hidden')
	$("#" + field + "_error").removeClass('error-text')
	$("#" + field + "_error").html('');
}

async function AuthRegister($this){

	clearErrors('email')
	clearErrors('name')
	clearErrors('password')

	$($this).html("Cadastrar " +'<img src="img/loading.gif" class="loading-button">')
	$('#message_register').attr('hidden', 'hidden')
	$('#message_register').removeClass('error')

	await api.post('auth/register', {
		name: $('#name').val(),
		email: $('#email').val(),
		password: $('#password').val(),
		password_confirmation: $('#password_confirmation').val(),
		config
	})
	.then(
		function(response){

			console.log(response)

			if(response.status == 201){
				localStorage.setItem('accessToken', response.data.meta.token);
				localStorage.setItem('name', response.data.data.name);
				localStorage.setItem('email', response.data.data.email);
				localStorage.setItem('id', response.data.data.id);

				menuUser();
				closeModal();
				closeLoginForm();
			}
			
			$($this).html("Cadastrar")

		})
	.catch(error => {
		console.log(error.response.data)

		for (var property in error.response.data.errors){
			console.log(property + " = " + error.response.data.errors[property]);
			$("#"+ property + "_error").removeAttr('hidden')
			$("#"+ property + "_error").addClass('error-text')
			$("#"+ property + "_error").html(error.response.data.errors[property]);
		}



		console.log(error.response)
		
	}); 

	$($this).html("Cadastrar")
}