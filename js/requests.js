const api = axios.create({
	baseURL: "https://project-ca-printf-backend.herokuapp.com/api/"
	//baseURL: "http://localhost:8000/api/"
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

//config.headers.append('Access-Control-Allow-Origin', 'http://localhost:8080');
//config.headers.append('Access-Control-Allow-Credentials', 'true');


api.defaults.headers.common = {
	...api.defaults.headers.common, 
	'Accept': 'application/json',
	'Content-Type':'application/x-www-form-urlencoded',
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Headers": "Authorization", 
	"Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE" ,
	"Content-Type": "application/json;charset=UTF-8"
}


async function login($this){

	$($this).html("Entrar " +'<img src="img/loading.gif" class="loading-button">')
	$('#message_login').attr('hidden', 'hidden')
	$('#message_login').removeClass('error')



	await api.post('auth/login', {
		email: $('#email').val(),
		password: $('#password').val()
	})
	.then(
		function(response){


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
		

		if(error.response.data != 'undefined'){
			$('#message_login').removeAttr('hidden')
			$('#message_login').addClass('error')

			$("#message_login").html(error.response.data.meta.errors);
		}

		

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

			

			if(response.status == 200){

				localStorage.removeItem('accessToken');
				localStorage.removeItem('name');
				localStorage.removeItem('email');
				localStorage.removeItem('id');

				menuUser();
				closeModal()
			}

		})
	.catch(error => {

		

		if(error.response.data.message != 'undefined' && error.response.data.message == 'Unauthenticated.'){
			requiredLogin();
		}

		if(error.response.data != 'undefined'){
			$('#message_login').removeAttr('hidden')
			$('#message_login').addClass('error')

			$("#message_login").html(error.response.data.meta.errors);
		}

		

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
		

		for (var property in error.response.data.errors){
			

			$("#"+ property + "_error").removeAttr('hidden')
			$("#"+ property + "_error").addClass('error-text')
			$("#"+ property + "_error").html(error.response.data.errors[property]);
		}



		

	}); 

	$($this).html("Cadastrar")
}



async function UpdateUser($this){

	clearErrors('email')
	clearErrors('name')
	clearErrors('password')
	clearErrors('password_old')

	$($this).html("Salvar " + '<img src="img/loading.gif" class="loading-button">')
	$('#message_register').attr('hidden', 'hidden')
	$('#message_register').removeClass('error')

	api.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('accessToken');
	await api.post('users/edit', {
		name: $('#name').val(),
		email: $('#email').val(),
		password: $('#password').val(),
		password_confirmation: $('#password_confirmation').val(),
		password_old: $('#password_old').val(),
		config
	})
	.then(
		function(response){

			

			if(response.status == 200){

				localStorage.setItem('name', response.data.data.name);
				localStorage.setItem('email', response.data.data.email);
				localStorage.setItem('id', response.data.data.id);

				redirect('perfil');
			}

			$($this).html("Salvar")

		})
	.catch(error => {
		

		if(error.response.data.message != 'undefined' && error.response.data.message == 'Unauthenticated.'){
			requiredLogin();
		}


		for (var property in error.response.data.errors){
			
			$("#"+ property + "_error").removeAttr('hidden')
			$("#"+ property + "_error").addClass('error-text')
			$("#"+ property + "_error").html(error.response.data.errors[property]);
		}


	}); 

	$($this).html("Salvar")

}