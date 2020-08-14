const subjects = [
    "Artes",
    "Biologia",
    "Ciências",
    "Educação física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Quimíca",
]

const weekdays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
]

// == Será alterado criando duas variavel para express e server == //
//Funcionalidades

function getSubject(subjectNumber) { //funcao que retorna um numero menos um numero, por que foi usada porque no loop do index inicia pelo 1
    const position = +subjectNumber - 1
    return subjects[position]
}

//converter horas em minutos / split retira os : da hora e a transforma em string separando em array hour e minutes, Number transformar em numeros esse retorno
function convertHoursToMinutes(time) {
    const [hour, minutes] = time.split(":")
    return Number((hour * 60) + minutes)
}

//exportando para server.js
module.exports = {
    subjects,
    weekdays,
    getSubject,
    convertHoursToMinutes
}

