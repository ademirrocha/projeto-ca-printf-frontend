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


function onLoads(){
	menuUser()
}


function menuUser(){
	
	xmlreq = CriaRequest();

	if(localStorage.getItem('accessToken') != 'null'){

		xmlreq.open("GET", "user-menu.html", true);
	}else{
		xmlreq.open("GET", "sing-up-menu.html", true);
	}


	xmlreq.onreadystatechange = function(){
		if (xmlreq.readyState == 4) {
			if (xmlreq.status == 200) {
				result = xmlreq.responseText;

			}else{
				result = "Erro: " + xmlreq.statusText;     
			}

			$('.navbar-collapse').append(result)

			if(localStorage.getItem('accessToken') != 'null'){

				$('#nameUser_menu').html('Olá ' + localStorage.getItem('name'))

			}


		}
	};
	xmlreq.send(null);

}



function openLogin(){

	closeNavbarTogglere();

	$('#form-modal').show()
	$('#cc').attr('class', 'cc');
	$('#cc').show();

	xmlreq = CriaRequest();
	xmlreq.open("GET", "cadastro/login.html", true);
	xmlreq.onreadystatechange = function(){
		if (xmlreq.readyState == 4) {
			if (xmlreq.status == 200) {
				result = xmlreq.responseText;

			}else{
				result = "Erro: " + xmlreq.statusText;     
			}

			$('#form-modal').html(result)
		}
	};
	xmlreq.send(null);
}





function openSignUp(){

	closeNavbarTogglere();

	$('#form-modal').show()
	$('#cc').attr('class', 'cc');
	$('#cc').show();

	xmlreq = CriaRequest();
	xmlreq.open("GET", "cadastro/cadastro.php", true);
	xmlreq.onreadystatechange = function(){
		if (xmlreq.readyState == 4) {
			if (xmlreq.status == 200) {
				result = xmlreq.responseText;

			}else{
				result = "Erro: " + xmlreq.statusText;     
			}

			$('#form-modal').html(result)
		}
	};
	xmlreq.send(null);
}





function closeNavbarTogglere(){
	if(!$( ".navbar-toggler" ).hasClass("collapsed")){
		$(".navbar-toggler").click()
	}	

	$('#cc').removeAttr('class', 'cc');
	$('#cc').hide();

	$('#form-modal').hide()
}


$(".navbar-toggler").click(function(){

	if(! $( ".navbar-toggler" ).hasClass("collapsed")){
		$('#cc').attr('class', 'cc');
		$('#cc').show();
	}else{
		$('#cc').removeAttr('class', 'cc');
		$('#cc').hide();
	}


});

