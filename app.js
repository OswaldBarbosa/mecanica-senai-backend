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

//cria o objeto app conforme a classe do express
const app = express()

//defini as permições do cors
app.use((request, response, next) => {

    //defini quem poderá acessar a  API
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    //atribui as permissões as cors
    app.use(cors())

    next()

})

var controllerProfessor = require('./controller/controller_professor.js')
var controllerAluno = require('./controller/controller_aluno.js')

var controllerUsuario = require('./controller/controller_usuario.js')

var message = require('./controller/modulo/config.js')

//Define que os dados que iram chegar na requisição será no padrão JSON
const bodyParserJSON = bodyParser.json()

/********************************************************* ENDPOPINTS **********************************************************/

/********************************************************* ENDPOPINTS - ALUNOS **********************************************************/

//endpoint: Retorna todos os alunos registrados no banco
app.get('v1/projeto-mecanica-senai/aluno', cors(), async function (request, response) {

    let dadosAluno = await controllerAluno.getAlunos()

    response.status(dadosAluno.status)
    response.json(dadosAluno)
})

//endpoint: Retorna um aluno específico pelo ID
app.get('v1/projeto-mecanica-senai/aluno/:id', cors(), async function (request, response) {

    //recebe o ID  do aluno pelo parametro
    let idAluno = request.params.id

    let dadosAluno = await controllerAluno.getAlunoById(idAluno)

    response.status(dadosAluno.status)
    response.json(dadosAluno)

})

//endpoint: Retorna um aluno específico pelo MATRICULA
app.get('v1/projeto-mecanica-senai/aluno/:matricula', cors(), async function (request, response) {

    //recebe o ID  do aluno pelo parametro
    let matriculaAluno = request.params.matricula

    let dadosAluno = await controllerAluno.getAlunoByMatricula(matriculaAluno)

    response.status(dadosAluno.status)
    response.json(dadosAluno)

})

//endpoint: Retorna um aluno específico pelo NOME
app.get('v1/projeto-mecanica-senai/aluno/nome/:nome', cors(), async function (request, response) {

    //recebe o NOME do aluno pelo parametro
    let nomeAluno = request.params.nome

    let dadosAluno = await controllerAluno.getAlunoByName(nomeAluno)

    response.status(dadosAluno.status)
    response.json(dadosAluno)

})

//endpoint: Insere um novo aluno no banco de dados
app.post('v1/projeto-mecanica-senai/aluno', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.header['content-type']

    //Validação para receber dados apenas no formato JSON
    if (String(contentType).toLowerCase() == 'application/json') {
        //recebe os dados do aluno encaminhado no corpo da requisição
        let dadosBody = request.body

        let resultadoDadosAluno = controllerAluno.atualizarAluno(dadosBody)

        response.status(resultadoDadosAluno.status)
        response.json(resultadoDadosAluno)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE.message)
    }


})

//endpoint: Atualiza um aluno no banco de dados
app.put('v1/projeto-mecanica-senai/aluno/:id', cors(), bodyParserJSON, async function (request, response) {

    //recebe o ID  do aluno pelo parametro
    let idAluno = request.params.id

    let contentType = request.header['content-type']

    //Validação para receber dados apenas no formato JSON
    if (String(contentType).toLowerCase() == 'application/json') {
        //recebe os dados do aluno encaminhado no corpo da requisição
        let dadosBody = request.body

        let resultadoDadosAluno = controllerAluno.updateAluno(dadosBody, idAluno)

        response.status(resultadoDadosAluno.status)
        response.json(resultadoDadosAluno)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE.message)
    }

})

//endpoint: Deleta um aluno no banco de dados
app.delete('v1/projeto-mecanica-senai/aluno/:id', cors(), async function (request, response) {

    //recebe o ID  do aluno pelo parametro
    let idAluno = request.params.id

    let dadosAluno = await controllerAluno.deletarAluno(idAluno)

    response.status(dadosAluno.status)
    response.json(dadosAluno)

})

/********************************************************* ENDPOINTS - PROFESSORES **********************************************************/

//endpoint: Retorna todos os professores registrados no banco
app.get('/v1/projeto-mecanica-senai/professor', cors(), async function (request, response) {

    let dadosProfessores = await controllerProfessor.getProfessores()

    response.status(dadosProfessores.status)
    response.json(dadosProfessores)

})

//endpoint: Retorna um professor específico pelo id
app.get('/v1/projeto-mecanica-senai/professor/id/:id', cors(), async function (request, response) {

    //recebe o ID do aluno pelo parametro
    let idProfessor = request.params.id

    let dadosProfessores = await controllerProfessor.getProfessorById(idProfessor)

    response.status(dadosProfessores.status)
    response.json(dadosProfessores)

})

//endpoint: Retorna um professor específico pelo nome
app.get('/v1/projeto-mecanica-senai/professor/nome/:nome', cors(), async function (request, response) {

    //recebe o NOME do professor pelo parametro
    let nomeProfessor = request.params.nome

    let dadosProfessores = await controllerProfessor.getProfessorByName(nomeProfessor)

    response.status(dadosProfessores.status)
    response.json(dadosProfessores)

})

//endpoint: Insere um novo professor no banco de dados
app.post('/v1/projeto-mecanica-senai/professor/', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    //Validação para receber dados apenas no formato JSON
    if (String(contentType).toLowerCase() == 'application/json') {

        //recebe os dados do aluno encaminhado no corpo da requisição
        let dadosBody = request.body

        let dadosProfessor = await controllerProfessor.inserirProfessor(dadosBody)

        response.status(dadosProfessor.status)
        response.json(dadosProfessor)

    } else {

        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)

    }

})

//endpoint: Atualiza um professor no banco de dados
app.put('/v1/projeto-mecanica-senai/professor/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    //Validação para receber dados apenas no formato JSON
    if (String(contentType).toLowerCase() == 'application/json') {

        let idProfessor = request.params.id

        let dadosBody = request.body

        let dadosProfessor = await controllerProfessor.atualizarProfessor(dadosBody, idProfessor)

        response.status(dadosProfessor.status)
        response.json(dadosProfessor)

    } else {

        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)

    }

})

//endpoint: Deleta um professor no banco de dados
app.delete('/v1/projeto-mecanica-senai/professor/id/:id', cors(), async function (request, response) {

    //recebe o ID do professor pelo parametro
    let idProfessor = request.params.id

    let dadosProfessor = await controllerProfessor.deletarProfessor(idProfessor)

    response.status(dadosProfessor.status)
    response.json(dadosProfessor)

})

/********************************************************* ENDPOPINTS - USUARIOS **********************************************************/

app.get('/v1/projeto-mecanica-senai/usuario', cors(), async function (request, response) {

    let dadosUsuario = await controllerUsuario.getUsuario()

    response.status(dadosUsuario.status)
    response.json(dadosUsuario)

})

app.get('/v1/projeto-mecanica-senai/usuario/id/:id', cors(), async function (request, response) {

    //recebe o ID do usuario pelo parametro
    let idUsuario = request.params.id

    let dadosUsuario = await controllerUsuario.getUsuarioById(idUsuario)

    response.status(dadosUsuario.status)
    response.json(dadosUsuario)

})

app.post('/v1/projeto-mecanica-senai/usuario/', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    //Validação para receber dados apenas no formato JSON
    if (String(contentType).toLowerCase() == 'application/json') {

        //recebe os dados do aluno encaminhado no corpo da requisição
        let dadosBody = request.body

        let dadosUsuario = await controllerUsuario.inserirUsuario(dadosBody)

        response.status(dadosUsuario.status)
        response.json(dadosUsuario)

    } else {

        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)

    }

})

app.put('/v1/projeto-mecanica-senai/usuario/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    //Validação para receber dados apenas no formato JSON
    if (String(contentType).toLowerCase() == 'application/json') {

        //recebe o ID do usuario pelo parametro
        let idUsuario = request.params.id

        let dadosBody = request.body

        let dadosUsuario = await controllerUsuario.atualizarUsuario(dadosBody, idUsuario)

        response.status(dadosUsuario.status)
        response.json(dadosUsuario)

    } else {

        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)

    }

})

app.delete('/v1/projeto-mecanica-senai/usuario/id/:id', cors(), async function (request, response) {

    //recebe o ID do usuario pelo parametro
    let idUsuario = request.params.id

    let dadosUsuario = await controllerUsuario.deletarUsuario(idUsuario)

    response.status(dadosUsuario.status)
    response.json(dadosUsuario)

})

/********************************************************* ENDPOPINTS **********************************************************/

app.listen(8080, function () {
    console.log('Servidor aguardando requisições na porta 8080')
})