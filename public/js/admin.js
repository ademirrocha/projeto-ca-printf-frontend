const api = axios.create({
	//baseURL: "https://project-ca-printf-backend.herokuapp.com/api/"
	baseURL: "http://localhost:8000/api/"
});



api.defaults.headers.common = {
	...api.defaults.headers.common, 
	'Accept': 'application/json',
	'Content-Type':'',
	'Content-Type': 'multipart/form-data',
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Headers": "Authorization", 
	"Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE" ,
	"Content-Type": "multipart/form-data"
}


function getAllData(){

	let myForm = document.getElementById('formCreateProject'); 
	let formData = new FormData(myForm);
	const data = {}; 

	for (let [key, val] of formData.entries()) {
		Object.assign(data, {[key]: val})
	}
	console.log(data);

	return data
}



async function createProject() {


	let data = getAllData()

	var result = {}

	let send = await api.post('projects/new', data)
	.then(
		function(response){

			console.log(response)

			if(response.status == 201){
				result.status = response.status
				result.event = {
					id: response.data.data.id,
					title: response.data.data.title,
					description: response.data.data.description,
					image: response.data.data.image,
				}
			}

		})
	.catch(error => {

		console.log(error.response)

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



	console.log(send , 'sende')
	console.log(result, 'result')

	return false
}