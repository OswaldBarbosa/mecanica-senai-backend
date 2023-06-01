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

/********************************************************* ENDPOPINTS **********************************************************/