const axios = require('axios')


const api = axios.create({
	baseURL: process.env.API_URL
});



api.defaults.headers.common = {
	...api.defaults.headers.common, 
	'Accept': 'application/json',
	'Content-Type':'application/x-www-form-urlencoded',
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Headers": "Authorization", 
	"Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE" ,
	"Content-Type": "application/json;charset=UTF-8"
}


module.exports = api