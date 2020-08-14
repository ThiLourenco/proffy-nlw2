const Database = require('sqlite-async')//criando o db

function execute(db) {//funcao para excução do db, db.exec é a funcionalidade executar onde será inseridos os codigos sql usando crase ``
    //criar as tabelas do banco de dados
   return db.exec(`
        CREATE TABLE IF NOT EXISTS proffys (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            avatar TEXT,
            whatsapp TEXT,
            bio TEXT             
        );

        CREATE TABLE IF NOT EXISTS classes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            subject INTEGER,
            cost TEXT,
            proffy_id INTEGER 
        );
        
        CREATE TABLE IF NOT EXISTS class_schedule (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            class_id INTEGER,
            weekday INTEGER,
            time_from INTEGER,
            time_to INTEGER
        );
    `)
}

//module.exports = "exportando para fora do arquivo, para no caso o teste.js a funcao retornando db pelo then.(execute)"
module.exports = Database.open(__dirname + '/database.sqlite').then(execute)//abrindo o database no diretorio .then = entao execute a funcao