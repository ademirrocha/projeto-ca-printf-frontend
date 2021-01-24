
function confirmationEventDelete(event, id){

	console.log(event)

	Swal.fire({
		showClass: {
			popup: 'animate__animated animate__fadeInDown'
		},
		hideClass: {
			popup: 'animate__animated animate__fadeOutUp'
		},

		title: 'Excluir Evento',
		text: "Deseja realmente remover permanentment o evento: " + event + "?",
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Sim, Excluir!',
		cancelButtonText: 'Cancelar'
	}).then((result) => {
		if (result.isConfirmed) {
			document.getElementById('delete-event-form_' + id).submit();
		}
	})

	return false

}


