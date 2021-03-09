async function editContent($this, content, type = 'input_text'){
    oldText = $('#' + content).html();
    var up = await createForm(type, oldText, content)
    console.log(up.value )
    $('#' + content).html(up.value.contentTexts[content])

    //$($this).html('Cancelar')

}

async function createForm(input, oldText, content){
    return Swal.fire({
        title: 'Editar Conteúdo',
        input: input,
        inputValue: oldText,
        inputAttributes: {
            autocapitalize: 'on'
        },
        showCancelButton: true,
        confirmButtonText: 'Salvar',
        cancelButtonText: 'Cancelar',
        showLoaderOnConfirm: true,
        preConfirm: async (newText) => {

        return await fetch(`/admin/content/edit`, {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({newText: newText, content: content})
        })
            .then(async response => {
               
              if (!response.ok) {
                throw new Error(response.statusText)
              }
              
              return response.json()
            })
            .catch( async error => {
              Swal.showValidationMessage(
                `Request failed: ${error}`
              )
            })
        
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire('', "Conteúdo Salvo com Sucesso!", 'success')
        }

        return result
      })

    
}

function highlight_editable(){
    if($('#highlight_editable').is(':checked') ){
        
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
    }
}


$('#highlight_editable').click(function() {
    highlight_editable()
});
