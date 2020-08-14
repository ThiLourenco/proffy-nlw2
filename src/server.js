//servidor
const express = require('express')
const server = express()

const {
    pageLanding,
    pageStudy,
    pageGiveClasses,
    saveClasses
} = require('./pages')

//configurar nunjucks (template engine)
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    express: server,
    noCache: true,//habilitado para deixar mais rapido, se caso estiver desenvolvendo, desabilitar para nao ter nada no cache
})

//inicio e configuracao do servidor
server
//receber os dados do req. body mas não deixar visivel
.use(express.urlencoded({extended: true}))
//configurar arquivos estáticos (css, scrips, imagens)
.use(express.static("public"))
// rotas da aplicação
.get("/", pageLanding) 
.get("/study", pageStudy)
.get("/give-classes", pageGiveClasses) 
.post("/save-classes", saveClasses)//aplicando o method post do formulário

//stat do servidor
.listen(5500)