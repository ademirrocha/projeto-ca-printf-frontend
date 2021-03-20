async function editContent($this, content, type = 'input_text'){
    oldText = $('#' + content).html();
    await createForm(type, oldText, content)

    //$($this).html('Cancelar')

}

async function sendContexts(form, input, newText, content){
	
	xmlreq = CriaRequest();
  
	await xmlreq.open("POST", "/admin/content/edit", true);
	 xmlreq.onreadystatechange = async function(){
		if (xmlreq.readyState == 4) {
			if (xmlreq.status == 200) {
        result = JSON.parse(xmlreq.responseText)

        
				
        for(var prop in result.contentTexts){
          let value = result.contentTexts[prop]
          if(input != 'image'){
            $('#' + prop).html(value);
          } 
        }
        errors = ''
        for(var erro in result.errors){
          let value = result.errors[erro]
          errors = value[0]
        }
        

       
        if(prop){
          Swal.fire({
            html: "<span class='success-text'>Conteúdo salvo com sucesso</span>"
          }).then(( ) => {
            window.location.href = '' + window.location.pathname
          })
        }else{

          $('#swal2-content').addClass('error-text')
          createForm(input, newText, content , "<span class='error-text'> Erro ao salvar o conteúdo <br> "+errors+"</span>")
        }

        return xmlreq.responseText
			}else{
				console.log("Erro: " + xmlreq.statusText);     
			}
		}
	};
	await xmlreq.send(form);
}

function loadSweet(){
  
  Swal.fire({
    timer: 20000,
    didOpen: () => {
      Swal.showLoading()
    },
  }).then((result) => {
    /* Read more about handling dismissals below */
    if (result.dismiss === Swal.DismissReason.timer) {
      
    }
  })
}


async function createForm(input, oldText, content, error = ''){
    let typeInput = input
    if(input == 'image'){
      typeInput = 'file'
    }
    return Swal.fire(
        {
        title: 'Editar Conteúdo',
        html: error,
        input: typeInput,
        inputValue: oldText,
        inputAttributes: {
            autocapitalize: 'off',
        },
        showCancelButton: true,
        confirmButtonText: 'Salvar',
        cancelButtonText: 'Cancelar',
        showLoaderOnConfirm: true,
        
        preConfirm: async (newText) => {
          
          //const body = JSON.stringify({newText: newText, content: content})
          form = new FormData();
          if(input == 'image'){
            form.append('image', newText)
          }else{
            form.append('newText', newText)
          }
          form.append('content', content)
          await sendContexts(form, input, newText, content)
          return true
        }
      })
      .then((result) => {
        if (result.isConfirmed) {
          loadSweet()
        }
      })

      



    
}

function highlight_editable(){
    if($('#highlight_editable').is(':checked') ){
        localStorage.setItem('highlight_editable', true)
        let color = 0;
        $('.editable').each(function(i, obj) {
            $(obj).addClass('color' + color)
            color++
            if(color > 4){
                color = 0
            }

        });
    }else{
        $('.editable').removeClass('color0 color1 color2 color3 color4')
        localStorage.setItem('highlight_editable', false)
    }
}


$('#highlight_editable').click(function() {
    highlight_editable()
});


if(localStorage.getItem('highlight_editable') == 'true'){
  $('#highlight_editable').attr("checked",true)
}else{
  $('#highlight_editable').removeAttr("checked")
}

highlight_editable();