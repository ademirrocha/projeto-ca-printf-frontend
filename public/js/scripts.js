

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

function requiredLogin(){
	
	
	openLogin()
}


function menuUser(){
	

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

function closeBackgrounModal(){
	$('#cc').removeAttr('class', 'cc');
	$('#cc').hide();
	$('#cc').html('');
}

function openBackgrounModal(){
	$('#cc').attr('class', 'cc');
	$('#cc').show();
	$('#cc').html('');
}

function loading(){
	//openBackgrounModal()
	//$('#cc').html('<img src="img/loading.gif">')
	Swal.showLoading()

}

function closeModal(){
	closeBackgrounModal()
	$('#form-modal').hide()
}

function openModal(){
	$('#form-modal').show()
	openBackgrounModal()
}



function openSignUp(){

	closeNavbarTogglere();
	openModal();
	

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

	closeModal()
}


$(".navbar-toggler").click(function(){

	if(! $( ".navbar-toggler" ).hasClass("collapsed")){
		openBackgrounModal()
	}else{
		closeBackgrounModal()
	}


});

