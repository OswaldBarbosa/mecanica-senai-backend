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

var controllerCurso = require('./controller/controller_curso.js')

var controllerMateria = require('./controller/controller_materia.js')

var controllerHorario = require('./controller/controller_horario.js')

var controllerPeriodo = require('./controller/controler_periodo.js')

var controllerUsuarioTipo = require('./controller/controller_usuario_tipo')

var controllerCriterioTipo = require('./controller/controller_criterio_tipo')

var controllerAvaliacao = require('./controller/controller_avaliacao.js')

var controllerMatricula = require('./controller/controller_matricula.js')

var controllerPeriodo = require('./controller/controler_periodo.js')

var controllerTurma = require('./controller/controller_turma.js')

var controllerTarefa = require('./controller/controller_tarefa.js')

var message = require('./controller/modulo/config.js')

//Define que os dados que iram chegar na requisição será no padrão JSON
const bodyParserJSON = bodyParser.json()

/********************************************************* ENDPOINTS **********************************************************/

/********************************************************* ENDPOINTS - ALUNOS **********************************************************/

//endpoint: retorna todos os alunos registrados no banco
app.get('/v1/projeto-mecanica-senai/aluno/', cors(), async function (request, response) {

    let dadosAluno = await controllerAluno.getAlunos()

    response.status(dadosAluno.status)
    response.json(dadosAluno)

})

//endpoint: retorna um aluno específico pelo ID
app.get('/v1/projeto-mecanica-senai/aluno/id/:id', cors(), async function (request, response) {

    //recebe o ID  do aluno pelo parametro
    let idAluno = request.params.id

    let dadosAluno = await controllerAluno.getAlunoById(idAluno)

    response.status(dadosAluno.status)
    response.json(dadosAluno)

})

//endpoint: retorna um aluno específico pelo NOME
app.get('/v1/projeto-mecanica-senai/aluno/nome/:nome', cors(), async function (request, response) {

    //recebe o NOME do aluno pelo parametro
    let nomeAluno = request.params.nome

    let dadosAluno = await controllerAluno.getAlunoByName(nomeAluno)

    response.status(dadosAluno.status)
    response.json(dadosAluno)


})

//endpoint: insere um novo aluno no banco de dados
app.post('/v1/projeto-mecanica-senai/aluno', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    //Validação para receber dados apenas no formato JSON
    if (String(contentType).toLowerCase() == 'application/json') {

        //recebe os dados do aluno encaminhado no corpo da requisição
        let dadosBody = request.body

        let resultadoDadosAluno = await controllerAluno.inserirAluno(dadosBody)

        response.status(resultadoDadosAluno.status)
        response.json(resultadoDadosAluno)

    } else {

        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE.message)

    }

})

//endpoint: atualiza um aluno no banco de dados
app.put('/v1/projeto-mecanica-senai/aluno/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    //Validação para receber dados apenas no formato JSON
    if (String(contentType).toLowerCase() == 'application/json') {

        //recebe os dados do aluno encaminhado no corpo da requisição
        let dadosBody = request.body

        //recebe o ID  do aluno pelo parametro
        let idAluno = request.params.id

        let resultadoDadosAluno = await controllerAluno.atualizarAluno(dadosBody, idAluno)

        response.status(resultadoDadosAluno.status)
        response.json(resultadoDadosAluno)

    } else {

        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE.message)

    }

})

//endpoint: deleta um aluno no banco de dados
app.delete('/v1/projeto-mecanica-senai/aluno/id/:id', cors(), async function (request, response) {

    //recebe o ID  do aluno pelo parametro
    let idAluno = request.params.id

    let dadosAluno = await controllerAluno.deletarAluno(idAluno)

    response.status(dadosAluno.status)
    response.json(dadosAluno)

})

/********************************************************* ENDPOINTS - PROFESSORES **********************************************************/

//endpoint: retorna todos os professores registrados no banco
app.get('/v1/projeto-mecanica-senai/professor', cors(), async function (request, response) {

    let dadosProfessores = await controllerProfessor.getProfessores()

    response.status(dadosProfessores.status)
    response.json(dadosProfessores)

})

//endpoint: retorna um professor específico pelo id
app.get('/v1/projeto-mecanica-senai/professor/id/:id', cors(), async function (request, response) {

    //recebe o ID do aluno pelo parametro
    let idProfessor = request.params.id

    let dadosProfessores = await controllerProfessor.getProfessorById(idProfessor)

    response.status(dadosProfessores.status)
    response.json(dadosProfessores)

})

//endpoint: retorna um professor específico pelo nome
app.get('/v1/projeto-mecanica-senai/professor/nome/:nome', cors(), async function (request, response) {

    //recebe o NOME do professor pelo parametro
    let nomeProfessor = request.params.nome

    let dadosProfessores = await controllerProfessor.getProfessorByName(nomeProfessor)

    response.status(dadosProfessores.status)
    response.json(dadosProfessores)

})

//endpoint: insere um novo professor no banco de dados
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

//endpoint: atualiza um professor no banco de dados
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

//endpoint: deleta um professor no banco de dados
app.delete('/v1/projeto-mecanica-senai/professor/id/:id', cors(), async function (request, response) {

    //recebe o ID do professor pelo parametro
    let idProfessor = request.params.id

    let dadosProfessor = await controllerProfessor.deletarProfessor(idProfessor)

    response.status(dadosProfessor.status)
    response.json(dadosProfessor)

})

/********************************************************* ENDPOINTS - USUARIOS **********************************************************/

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

/********************************************************* ENDPOINTS - MATRICULA **********************************************************/

app.get('/v1/projeto-mecanica-senai/matricula/', cors(), async function (request, response) {

    let dadosMatricula = await controllerMatricula.getMatricula()

    response.status(dadosMatricula.status)
    response.json(dadosMatricula)

})

app.get('/v1/projeto-mecanica-senai/matricula/id/:id', cors(), async function (request, response) {

    let idMatricula = request.params.id

    let dadosMatricula = await controllerMatricula.getMatriculaById(idMatricula)

    response.status(dadosMatricula.status)
    response.json(dadosMatricula)

})

app.get('/v1/projeto-mecanica-senai/matricula/numero/:numero', cors(), async function (request, response) {

    let numeroMatricula = request.params.numero

    let dadosMatricula = await controllerMatricula.getMatriculaByNumero(numeroMatricula)

    response.status(dadosMatricula.status)
    response.json(dadosMatricula)

})

app.post('/v1/projeto-mecanica-senai/matricula/', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    //Validação para receber dados apenas no formato JSON
    if (String(contentType).toLowerCase() == 'application/json') {

        let dadosBody = request.body

        let dadosMatricula = await controllerMatricula.inserirMatricula(dadosBody)

        response.status(dadosMatricula.status)
        response.json(dadosMatricula)

    } else {

        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)

    }

})

app.put('/v1/projeto-mecanica-senai/matricula/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    //Validação para receber dados apenas no formato JSON
    if (String(contentType).toLowerCase() == 'application/json') {

        //recebe o ID do usuario pelo parametro
        let idMatricula = request.params.id

        let dadosBody = request.body

        let dadosMatricula = await controllerMatricula.atualizarMatricula(dadosBody, idMatricula)

        response.status(dadosMatricula.status)
        response.json(dadosMatricula)

    } else {

        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)

    }

})

app.delete('/v1/projeto-mecanica-senai/matricula/id/:id', cors(), async function (request, response) {

    let idMatricula = request.params.id

    let dadosMatricula = await controllerMatricula.deletarMatricula(idMatricula)

    response.status(dadosMatricula.status)
    response.json(dadosMatricula)

})

//******************************************************** ENDPOINTS - PERIODO ****************************************************************/

app.get('/v1/projeto-mecanica-senai/periodo/', cors(), async function (request, response) {

    let dadosPeriodo = await controllerPeriodo.getPeriodo()

    response.status(dadosPeriodo.status)
    response.json(dadosPeriodo)

})

app.get('/v1/projeto-mecanica-senai/periodo/id/:id', cors(), async function (request, response) {

    let idPeriodo = request.params.id

    let dadosPeriodo = await controllerPeriodo.getPeriodoById(idPeriodo)

    response.status(dadosPeriodo.status)
    response.json(dadosPeriodo)
})

app.get('/v1/projeto-mecanica-senai/periodo/nome/:nome', cors(), async function (request, response) {

    let nomePeriodo = request.params.nome

    let dadosPeriodo = await controllerPeriodo.getPeriodoByNome(nomePeriodo)

    response.status(dadosPeriodo.status)
    response.json(dadosPeriodo)
})

app.post('/v1/projeto-mecanica-senai/periodo/', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {

        let dadosBody = request.body

        let dadosPeriodo = await controllerPeriodo.inserirPeriodo(dadosBody)

        response.status(dadosPeriodo.status)
        response.json(dadosPeriodo)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }
})

app.put('/v1/projeto-mecanica-senai/periodo/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {

        let dadosBody = request.body

        let idPeriodo = request.params.id

        let dadosPeriodo = await controllerPeriodo.updatePeriodo(dadosBody, idPeriodo)

        response.status(dadosPeriodo.status)
        response.json(dadosPeriodo)

    } else {

        response.status(message.SUCCESS_UPDATE_ITEM.status)
        response.message(message.SUCCESS_UPDATE_ITEM.message)

    }

})

app.delete('/v1/projeto-mecanica-senai/periodo/id/:id', cors(), async function (request, response) {

    let idPeriodo = request.params.id

    let dadosPeriodo = await controllerPeriodo.deletePeriodo(idPeriodo)

    response.status(dadosPeriodo.status)
    response.message(dadosPeriodo)
})

//******************************************************** ENDPOINTS - MATERIA ****************************************************************/

app.get('/v1/projeto-mecanica-senai/materia', cors(), async function (request, response) {

    let dadosMateria = await controllerMateria.getMaterias()

    response.status(dadosMateria.status)
    response.json(dadosMateria)

})

app.get('/v1/projeto-mecanica-senai/materia/id/:id', cors(), async function (request, response) {

    let idMateria = request.params.id

    let dadosMateria = await controllerMateria.getMateriaById(idMateria)

    response.status(dadosMateria.status)
    response.json(dadosMateria)
})

app.get('/v1/projeto-mecanica-senai/materia/nome/:nome', cors(), async function (request, response) {

    let nomeMateria = request.params.nome

    let dadosMateria = await controllerMateria.getMateriaByName(nomeMateria)

    response.status(dadosMateria.status)
    response.json(dadosMateria)
})

app.get('/v1/projeto-mecanica-senai/materia/sigla/:sigla', cors(), async function (request, response) {

    let siglaMateria = request.params.sigla

    let dadosMateria = await controllerMateria.getMateriaBySigla(siglaMateria)

    response.status(dadosMateria.status)
    response.json(dadosMateria)
})

app.post('/v1/projeto-mecanica-senai/materia', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    //Validação para receber dados apenas no formato JSON

    if (String(contentType).toLowerCase() == 'application/json') {

        let dadosBody = request.body

        let dadosMateria = await controllerMateria.inserirMateria(dadosBody)

        response.status(dadosMateria.status)
        response.json(dadosMateria)

    } else {

        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)

    }

})


app.put('/v1/projeto-mecanica-senai/materia/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    //Validação para receber dados apenas no formato JSON
    if (String(contentType).toLowerCase() == 'application/json') {

        let dadosBody = request.body
        let idMateria = request.params.id

        let resultadoMateria = await controllerMateria.updateMateria(dadosBody, idMateria)

        response.status(resultadoMateria.status)
        response.json(resultadoMateria)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }


})

app.delete('/v1/projeto-mecanica-senai/materia/id/:id', cors(), async function (request, response) {

    let idMateria = request.params.id

    let dadosMateria = await controllerMateria.deleteMateria(idMateria)

    response.status(dadosMateria.status)
    response.json(dadosMateria)
})

/********************************************* ENDPOINTS - CURSOS *********************************************** */

app.get('/v1/projeto-mecanica-senai/curso', cors(), async function (request, response) {

    let dadosCurso = await controllerCurso.getCursos()

    response.status(dadosCurso.status)
    response.json(dadosCurso)
})

app.get('/v1/projeto-mecanica-senai/curso/id/:id', cors(), async function (request, response) {

    let idCurso = request.params.id

    let dadosCurso = await controllerCurso.getCursosById(idCurso)

    response.status(dadosCurso.status)
    response.json(dadosCurso)
})

app.get('/v1/projeto-mecanica-senai/curso/nome/:nome', cors(), async function (request, response) {

    let nomeCurso = request.params.nome

    let dadosCurso = await controllerCurso.getCursosByName(nomeCurso)

    response.status(dadosCurso.status)
    response.json(dadosCurso)
})

app.post('/v1/projeto-mecanica-senai/curso', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    //Validação para receber dados apenas no formato JSON
    if (String(contentType).toLowerCase() == 'application/json') {

        //recebe o Id do usuario pelo parametro
        let dadosBody = request.body

        let dadosCurso = await controllerCurso.inserirCurso(dadosBody)

        response.status(dadosCurso.status)
        response.json(dadosCurso)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }
})

app.put('/v1/projeto-mecanica-senai/curso/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    //Validação para receber dados apenas no formato JSON
    if (String(contentType).toLowerCase() == 'application/json') {

        //recebe o ID do usuario pelo parametro
        let idCurso = request.params.id

        let dadosBody = request.body

        let dadosCurso = await controllerCurso.updateCurso(dadosBody, idCurso)

        response.status(dadosCurso.status)
        response.json(dadosCurso)

    } else {

        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)

    }
})

app.delete('/v1/projeto-mecanica-senai/curso/id/:id', cors(), async function (request, response) {

    let idCurso = request.params.id

    let dadosCurso = await controllerCurso.deletarCurso(idCurso)

    response.status(dadosCurso.status)
    response.json(dadosCurso)
    
})

/********************************************************* ENDPOINTS - HORARIO **********************************************************/

app.get('/v1/projeto-mecanica-senai/horario', cors(), async function (request, response) {

    let dadosHorario = await controllerHorario.getAllHorarios()

    response.status(dadosHorario.status)
    response.json(dadosHorario)

})

app.get('/v1/projeto-mecanica-senai/horario/id/:id', cors(), async function (request, response) {

    let idHorario = request.params.id

    let dadosHorario = await controllerHorario.getHorariosById(idHorario)

    response.status(dadosHorario.status)
    response.json(dadosHorario)
})

app.post('/v1/projeto-mecanica-senai/horario', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    //Validação para receber dados apenas no formato JSON
    if (String(contentType).toLowerCase() == 'application/json') {
        let dadosBody = request.body

        let dadosHorario = await controllerHorario.insertHorario(dadosBody)

        response.status(dadosHorario.status)
        response.json(dadosHorario)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

})

app.put('/v1/projeto-mecanica-senai/horario/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    //Validação para receber dados apenas no formato JSON
    if (String(contentType).toLowerCase() == 'application/json') {
        let dadosBody = request.body

        let idHoraio = request.params.id

        let dadosHorario = await controllerHorario.updateHorario(dadosBody, idHoraio)

        response.status(dadosHorario.status)
        response.json(dadosHorario)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }
})

app.delete('/v1/projeto-mecanica-senai/horario/id/:id', cors(), async function (request, response) {

    let idHoraio = request.params.id

    let dadosHorario = await controllerHorario.deleteHorario(idHoraio)

    response.status(dadosHorario.status)
    response.json(dadosHorario)
})

//******************************************************* ENDPOINTS - USUARIO TIPO **********************************************/

app.get('/v1/projeto-mecanica-senai/usuario-tipo', cors(), async function (request, response) {

    let dadosUsuarioTipo = await controllerUsuarioTipo.getAllUsuarioTipo()

    response.status(dadosUsuarioTipo.status)
    response.json(dadosUsuarioTipo)
})

app.get('/v1/projeto-mecanica-senai/usuario-tipo/id/:id', cors(), async function (request, response) {

    let idUsuarioTipo = request.params.id

    let dadosUsuarioTipo = await controllerUsuarioTipo.getUsuarioTipoById(idUsuarioTipo)

    response.status(dadosUsuarioTipo.status)
    response.json(dadosUsuarioTipo)
})

app.get('/v1/projeto-mecanica-senai/usuario-tipo/nome/:nome', cors(), async function (request, response) {

    let nomeUsuarioTipo = request.params.nome

    let dadosUsuarioTipo = await controllerUsuarioTipo.getUsuarioTipoByName(nomeUsuarioTipo)

    response.status(dadosUsuarioTipo.status)
    response.json(dadosUsuarioTipo)
})

app.post('/v1/projeto-mecanica-senai/periodo', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {

        let dadosBody = request.body

        let dadosUsuarioTipo = await controllerUsuarioTipo.insertUsuarioTipo(dadosBody)

        response.status(dadosUsuarioTipo.status)
        response.json(dadosUsuarioTipo)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }
})

app.put('/v1/projeto-mecanica-senai/periodo/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {

        let idUsuarioTipo = request.params.id

        let dadosBody = request.body

        let dadosUsuarioTipo = await controllerUsuarioTipo.updateUsuarioTipo(dadosBody, idUsuarioTipo)

        response.status(dadosUsuarioTipo.status)
        response.json(dadosUsuarioTipo)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)

    }
})

app.delete('/v1/projeto-mecanica-senai/periodo/id/:id', cors(), async function (request, response){

    let idUsuarioTipo = request.params.id

    let dadosUsuarioTipo = await controllerUsuarioTipo.deleteUsuarioTipo(idUsuarioTipo)

    response.status(dadosUsuarioTipo.status)
    response.json(dadosUsuarioTipo)
    
})

/************************************************** ENDPOINTS - CRITERIO TIPO *************************************************/

app.get('/v1/projeto-mecanica-senai/criterio-tipo', cors(), async function (request, response){

    let dadosCriterioTipo = await controllerCriterioTipo.getAllCriterioTipo()

    response.status(dadosCriterioTipo.status)
    response.json(dadosCriterioTipo)

})

app.get('/v1/projeto-mecanica-senai/criterio-tipo/id/:id', cors(), async function (request, response){

    let idCriterioTipo = request.params.id

    let dadosCriterioTipo = await controllerCriterioTipo.getCriterioTipoById(idCriterioTipo)

    response.status(dadosCriterioTipo.status)
    reportError.json(dadosCriterioTipo)
})

app.get('/v1/projeto-mecanica-senai/criterio-tipo/nome/:nome', cors(), async function (request, response){

    let nomeCriterioTipo = request.params.nome

    let dadosCriterioTipo = await controllerCriterioTipo.getCriterioTipoByName(nomeCriterioTipo)

    response.status(dadosCriterioTipo.status)
    response.json(dadosCriterioTipo)
})

app.post('/v1/projeto-mecanica-senai/criterio-tipo', cors(), bodyParserJSON, async function (request, response){
    
    let contentType = request.headers['content-type']

    if(String(contentType).toLowerCase == 'application/json'){

        let dadosBody = request.body

        let dadosCriterioTipo = await controllerCriterioTipo.insertCriterioTipo(dadosBody)

        response.status(dadosCriterioTipo.status)
        response.json(dadosCriterioTipo)
    }else{
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

})

app.put('/v1/projeto-mecanica-senai/criterio-tipo/id/:id', cors(), bodyParserJSON, async function (request, response){

    let contentType = request.headers['content-type']

    if(String(contentType).toLowerCase == 'application/json'){

        let dadosBody = request.body
        let idCriterioTipo = request.params.id

        let dadosCriterioTipo = await controllerCriterioTipo.updateCriterioTipo(dadosBody, idCriterioTipo)

        response.status(dadosCriterioTipo.status)
        response.message(dadosCriterioTipo)
    }else{

        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
        
    }
})

app.delete('/v1/projeto-mecanica-senai/criterio-tipo/id/:id', cors(), async function (request, response){

    let idCriterioTipo = request.params.id

    let dadosCriterioTipo = await controllerCriterioTipo.deleteCriterioTipo(idCriterioTipo)

    response.status(dadosCriterioTipo.status)
    response.json(dadosCriterioTipo)
})

/******************************************** ENDPOINTS - AVALIAÇÃO **************************************************************/

app.get('/v1/projeto-mecanica-senai/avaliacao', cors(), async function(request, response){

    let dadosAvaliacao = await controllerAvaliacao.getAllAvaliacao()

    response.status(dadosAvaliacao.status)
    response.json(dadosAvaliacao)
})

app.get('/v1/projeto-mecanica-senai/criterio-tipo/id/:id', cors(), async function(request,response){

    let idAvaliacao = request.params.id

    let dadosAvaliacao = await controllerAvaliacao.getAvaliacaoById(idAvaliacao)

    response.status(dadosAvaliacao.status)
    response.json(dadosAvaliacao)
})

app.post('/v1/projeto-mecanica-senai/criterio-tipo', cors(), bodyParserJSON, async function(request, response){

    let contentType = request.headers['content-type']

    if(String(contentType).toLowerCase == 'application/json'){

        let dadosBody = request.body

        let dadosAvaliacao = await controllerAvaliacao.insertAvaliacao(dadosBody)

        response.status(dadosAvaliacao.status)
        response.json(dadosAvaliacao)
    }else{

        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }
})

app.put('/v1/projeto-mecanica-senai/criterio-tipo/id/:id', cors(), bodyParserJSON, async function(request, response){

    let contentType = request.headers['content-type']

    if(String(contentType).toLowerCase == 'application/json'){
        
        let dadosBody = request.body
        let idAvaliacao = request.params.id

        let dadosAvaliacao = await controllerAvaliacao.updateAvaliacao(dadosBody, idAvaliacao)

        response.status(dadosAvaliacao.status)
        response.json(dadosAvaliacao)
    }else{
        response.status(message.ERROR_INVALID_CONTENT_TYPE)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }
})

app.delete('/v1/projeto-mecanica-senai/criterio-tipo/id/:id', cors(), async function(request, response){

    let idAvaliacao = request.params.id

    let dadosAvaliacao = await controllerAvaliacao.deleteAvaliacao(idAvaliacao)

    response.status(dadosAvaliacao.status)
    response.json(dadosAvaliacao)
})
/********************************************************* ENDPOPINTS **********************************************************/

app.listen(8080, function () {
    console.log('Servidor aguardando requisições na porta 8080')
})  