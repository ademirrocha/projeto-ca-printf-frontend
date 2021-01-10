function editUser(){
	
	$('.card-user-profile').addClass('card col-sm-6')

	$('#card-update-profile').removeAttr('hidden')

	$('#card-update-profile').addClass(' bg-gray')

	$('#name').val(localStorage.getItem('name'))
	$('#email').val(localStorage.getItem('email'))
	$('#password').val('')
	$('#password_confirmation').val('')
	$('#password_old').val('')

}

function CancelEditUser(){
	$('.card-user-profile').removeClass('card col-sm-6')

	$('#card-update-profile').attr('hidden', 'hidden')

	$('#card-update-profile').removeClass(' bg-gray')
}