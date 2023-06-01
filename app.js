/***************************************************************************************
* Objetivo: API para o projeto de Mecânica
* Data: 22/05/2023
* Autor: André Luiz e Oswaldo Barbosa
* Versão: 1.0
***************************************************************************************/

//importe das bibliotecas para a API
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { resquest, response } = require('express')

//cria o objeto app conforme a classe do express
const app = express()

//defini as permições do cors
app.use((resquest, response, next) => {
    //defini quem poderá acessar a  API
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    //atribui as permissões as cors
    app.use(cors())

    next()
})

var controllerProfessor = require('./controller/controller_professor.js')

var message = require('./controller/modulo/config.js')

//Define que os dados que iram chegar na requisição será no padrão JSON
const bodyParserJSON = bodyParser.json()

/********************************************************* ENDPOPINTS **********************************************************/

/********************************************************* ENDPOPINTS - ALUNOS **********************************************************/

//endpoint: Retorna todos os alunos registrados no banco
app.get('v1/projeto-mecanica-senai/aluno', cors(), async function (resquest, response) {

})

//endpoint: Retorna um aluno específico pelo ID
app.get('v1/projeto-mecanica-senai/aluno/:id', cors(), async function (resquest, response) {

    //recebe o ID  do aluno pelo parametro
    let idAluno = resquest.params.id

})

//endpoint: Retorna um aluno específico pelo MATRICULA
app.get('v1/projeto-mecanica-senai/aluno/:matricula', cors(), async function (resquest, response) {

    //recebe o ID  do aluno pelo parametro
    let matriculaAluno = resquest.params.matricula

})

//endpoint: Retorna um aluno específico pelo NOME
app.get('v1/projeto-mecanica-senai/aluno/nome/:nome', cors(), async function (resquest, response) {

    //recebe o NOME do aluno pelo parametro
    let nomeAluno = resquest.params.nome

})

//endpoint: Insere um novo aluno no banco de dados
app.post('v1/projeto-mecanica-senai/aluno', cors(), bodyParserJSON, async function (resquest, response) {

})

//endpoint: Atualiza um aluno no banco de dados
app.put('v1/projeto-mecanica-senai/aluno/:id', cors(), bodyParserJSON, async function (resquest, response) {

    //recebe o ID  do aluno pelo parametro
    let idAluno = resquest.params.id

})

//endpoint: Deleta um professor no banco de dados
app.delete('v1/projeto-mecanica-senai/aluno/:id', cors(), async function (resquest, response) {

    //recebe o ID  do aluno pelo parametro
    let idAluno = resquest.params.id

})

/********************************************************* ENDPOPINTS - PROFESSORES **********************************************************/

//endpoint: Retorna todos os professores registrados no banco
app.get('v1/projeto-mecanica-senai/professor', cors(), async function (resquest, response) {

})

//endpoint: Retorna um professor específico pelo id
app.get('v1/projeto-mecanica-senai/professor/:id', cors(), async function (resquest, response) {

    //recebe o ID do aluno pelo parametro
    let idProfessor = resquest.params.id

})

//endpoint: Retorna um professor específico pelo nome
app.get('v1/projeto-mecanica-senai/professor/:nome', cors(), async function (resquest, response) {

    //recebe o NOME do professor pelo parametro
    let nomeProfessor = resquest.params.nome

})

//endpoint: Insere um novo professor no banco de dados
app.post('v1/projeto-mecanica-senai/professor', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    //Validação para receber dados apenas no formato JSON
    if (String(contentType).toLowerCase() == 'application/json') {

        //recebe os dados do aluno encaminhado no corpo da requisição
        let dadosBody = request.body

        let resultadoDadosProfessor = await controllerProfessor.inserirProfessor(dadosBody)

        response.status(resultadoDadosProfessor.status)
        response.json(resultadoDadosProfessor)

    } else {

        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)

    }

})

//endpoint: Atualiza um professor no banco de dados
app.put('v1/projeto-mecanica-senai/professor:id', cors(), bodyParserJSON, async function (request, response) {

    //recebe o ID do professor pelo parametro
    let idProfessor = resquest.params.id

})

//endpoint: Deleta um professor no banco de dados
app.delete('v1/projeto-mecanica-senai/professor:id', cors(), async function (request, response) {

    //recebe o ID do professor pelo parametro
    let idProfessor = resquest.params.id

})

/********************************************************* ENDPOPINTS - USUARIOS **********************************************************/

app.get('v1/projeto-mecanica-senai/usuario', cors(), async function (resquest, response) {

})

app.get('v1/projeto-mecanica-senai/usuario:id', cors(), async function (resquest, response) {

    //recebe o ID do usuario pelo parametro
    let idUsuario = resquest.params.id

})

app.post('v1/projeto-mecanica-senai/usuario', cors, bodyParserJSON, async function (resquest, response) {
    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {

        let dadosBody = request.body

        let resultDadosUsuario = await controllerUsuario.inserirUsuario(dadosBody)

        response.status(resultDadosUsuario.status)
        response.json(resultDadosUsuario)
    } else {
        response.status(messages.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(messages.ERROR_INVALID_CONTENT_TYPE)
    }
})

app.put('v1/projeto-mecanica-senai/usuario:id', cors(), bodyParserJSON, async function (resquest, response) {

    //recebe o ID do usuario pelo parametro
    let idUsuario = resquest.params.id

})

app.delete('v1/projeto-mecanica-senai/usuario:id', cors(), async function (resquest, response) {

    //recebe o ID do usuario pelo parametro
    let idUsuario = resquest.params.id

})

/********************************************************* ENDPOPINTS **********************************************************/

app.listen(8080, function () {
    console.log('Servidor aguardando requisições na porta 8080')
})