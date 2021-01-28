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


var originalFieldSchoolClass = document.getElementById('school_class')

function changeFieldSchoolClass($this){

	if($($this).hasClass('fa-plus-circle')){

		$("#fieldSchoolClass").empty();
		var html="<input type='text' class='form-control ' id='school_class' name='school_class'>";
		/* preenche a div */
		$("#fieldSchoolClass").html(html);

		$($this).removeClass('fa-plus-circle')
		$($this).addClass('fa-minus-circle')

	}else{
		$("#fieldSchoolClass").empty();
		
		/* preenche a div */
		$("#fieldSchoolClass").html(originalFieldSchoolClass);

		$($this).removeClass('fa-minus-circle')
		$($this).addClass('fa-plus-circle')
	}
	
}


var originalFieldTypeDoc = document.getElementById('type')

function changeFieldTypeDoc($this){

	if($($this).hasClass('fa-plus-circle')){

		$("#fieldTypeDoc").empty();
		var html="<input type='text' class='form-control ' id='type' name='type'>";
		/* preenche a div */
		$("#fieldTypeDoc").html(html);

		$($this).removeClass('fa-plus-circle')
		$($this).addClass('fa-minus-circle')

	}else{
		$("#fieldTypeDoc").empty();
		
		/* preenche a div */
		$("#fieldTypeDoc").html(originalFieldTypeDoc);

		$($this).removeClass('fa-minus-circle')
		$($this).addClass('fa-plus-circle')
	}
	
}



function search(){
	if($('#search_all').val() != ''){
		window.location.href = '/search/' + $('#search_all').val()
	}

}


$( $('#search_all') ).on('keydown', function(event) {

    if(event.keyCode === 13) {

        search()

    }

});




function openCloseSearchResults($this, div){
	if($($this).hasClass('fa-plus-circle')){

		$("#" + div).removeAttr('hidden');

		$($this).removeClass('fa-plus-circle')
		$($this).removeClass('search-pointer-plus')
		$($this).addClass('fa-minus-circle')
		$($this).addClass('search-pointer-minus')

	}else{
		$("#" + div).attr('hidden', 'hidden');

		$($this).removeClass('fa-minus-circle')
		$($this).removeClass('search-pointer-minus')
		$($this).addClass('fa-plus-circle')
		$($this).addClass('search-pointer-plus')
	}
}