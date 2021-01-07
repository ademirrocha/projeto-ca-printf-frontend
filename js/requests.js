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


