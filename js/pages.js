function redirect(page = ""){
	window.location.href = '/' + page;


}

function view(){



	if(window.location.pathname == '/perfil'){
		openPage('user/perfil.html')
	}


	Swal.close();

}

function setDataUserProfile(){
	$('#user-profile-name').html("Nome: " +localStorage.getItem('name'))
	$('#user-profile-email').html("Email: " +localStorage.getItem('email'))
}


function openPage(page){
	
	xmlreq = CriaRequest();

	if(localStorage.getItem('accessToken') != 'null' && localStorage.getItem('accessToken') != null){
		$('#signUpMenu').remove()
		xmlreq.open("GET", page, true);
	}else{
		$('#dataUserMenu').remove()
		xmlreq.open("GET", "sing-up-menu.html", true);
		
	}


	xmlreq.onreadystatechange = function(){
		if (xmlreq.readyState == 4) {
			if (xmlreq.status == 200) {
				result = xmlreq.responseText;

			}else{
				result = "Erro: " + xmlreq.statusText;     
			}

			$('#app').html(result)
			
			if(localStorage.getItem('accessToken') != 'null'){

				//$('#nameUser_menu').html('Olá ' + localStorage.getItem('name'))

			}

			menuUser()

			setDataUserProfile()


		}
	};
	xmlreq.send(null);

}