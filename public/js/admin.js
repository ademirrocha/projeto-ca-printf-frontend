
function confirmationEventDelete(event, id){

	Swal.fire({
		showClass: {
			popup: 'animate__animated animate__fadeInDown'
		},
		hideClass: {
			popup: 'animate__animated animate__fadeOutUp'
		},

		title: 'Excluir Evento',
		text: "Deseja realmente remover permanentemente o evento: " + event + "?",
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


function confirmationProjectDelete(project, id){

	Swal.fire({
		showClass: {
			popup: 'animate__animated animate__fadeInDown'
		},
		hideClass: {
			popup: 'animate__animated animate__fadeOutUp'
		},

		title: 'Excluir Projeto',
		text: "Deseja realmente remover permanentement o projeto: " + project + "?",
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Sim, Excluir!',
		cancelButtonText: 'Cancelar'
	}).then((result) => {
		if (result.isConfirmed) {
			document.getElementById('delete-project-form_' + id).submit();
		}
	})

	return false

}


function confirmationDocumentDelete(doc, id){

	Swal.fire({
		showClass: {
			popup: 'animate__animated animate__fadeInDown'
		},
		hideClass: {
			popup: 'animate__animated animate__fadeOutUp'
		},

		title: 'Excluir Documento',
		text: "Deseja realmente remover permanentement o documento: " + doc + "?",
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Sim, Excluir!',
		cancelButtonText: 'Cancelar'
	}).then((result) => {
		if (result.isConfirmed) {
			document.getElementById('delete-document-form_' + id).submit();
		}
	})

	return false

}


