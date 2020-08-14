//Função de duplicar os horários do curso

// proucurar o botao
document.querySelector('#add-time')
// quando clicar no botao
.addEventListener('click', cloneField);

//excutar uma acao
function cloneField() {
    //duplicar os campos. que campos ?
    const newFieldsContainer = document.querySelector('.schedule-item').cloneNode(true)

    //pegar os campos
    const fields = newFieldsContainer.querySelectorAll('input')

    // para cada campo, limpar
    fields.forEach(function(field){
        field.value = ""
    });

    //colocar na página; onde ?
    document.querySelector('#schedule-items').appendChild(newFieldsContainer)

}