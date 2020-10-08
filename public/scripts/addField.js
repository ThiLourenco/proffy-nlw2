document.querySelector('#add-time').addEventListener('click', cloneField);

function checkField() {
    const newFieldContainer = document.querySelector('.schedule-item');
    const select = newFieldContainer.querySelectorAll('select');
    const fields = newFieldContainer.querySelectorAll('input');

    let voidElements = true;

    if(select[0].value == '') {
        voidElements = false;
    }

    for(i = 0; i < 2; i++) {
        if(fields[i].value == '') {
            voidElements = false;
        }
    }

    return voidElements;
}

//excutar uma acao
function cloneField() {
    
    if(checkField() ) {
    //duplicar os campos. que campos ?
    const newFieldContainer = document.querySelector('.schedule-item').cloneNode(true)

    //pegar os campos
    const fields = newFieldContainer.querySelectorAll('input')

    // para cada campo, limpar
    fields.forEach(function(element){
        element.value = ""
    });

    //colocar na página; onde ?
    document.querySelector('#schedule-items').appendChild(newFieldContainer)
    
    }
}