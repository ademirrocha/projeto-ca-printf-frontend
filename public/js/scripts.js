function CriaRequest() {
	try{
		request = new XMLHttpRequest();        
	}catch (IEAtual){

		try{
			request = new ActiveXObject("Msxml2.XMLHTTP");       
		}catch(IEAntigo){

			try{
				request = new ActiveXObject("Microsoft.XMLHTTP");          
			}catch(falha){
				request = false;
			}
		}
	}

	if (!request) 
		alert("Seu Navegador não suporta Ajax!");
	else
		return request;
}



function editUser(){
	
	$('.card-user-profile').addClass('card col-sm-6')

	$('#card-update-profile').removeAttr('hidden')

	$('#card-update-profile').addClass(' bg-gray')

	$('#password').val('')
	$('#password_confirmation').val('')
	$('#password_old').val('')

}

function CancelEditUser(){
	$('.card-user-profile').removeClass('card col-sm-6')

	$('#card-update-profile').attr('hidden', 'hidden')

	$('#card-update-profile').removeClass(' bg-gray')
}